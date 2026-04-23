"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { getChatId, formatChatTime, getDateLabel, formatTimer } from "@/utils/chatHelpers";
import { useSelector, useDispatch } from "react-redux";
import { clearActiveChat, setConnectionStatus } from "@/redux/slices/chatSlice";
import { fetchPendingChatRequests } from "@/redux/slices/dashboardSlice";
import { emitEndConnection, emitChatMessage, onPartnerDisconnected, onUserDecidingContinuation, onUserContinuedChat } from "@/lib/socketService";
import { Send, Timer, ArrowLeft } from "lucide-react";
import EndChatModal from "@/components/common/EndChatModal";
import UserDecidingModal from "@/components/common/UserDecidingModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { getBackendImageUrl } from "@/lib/getBackendImageUrl";

const AstrologerChatScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeChat = useSelector((state) => state.chat.activeChat);
  const profile = useSelector((state) => state.dashboard.profile.data);

  const astrologerId = activeChat.astrologerId || profile?._id || profile?.id;
  const userId = activeChat.userId;
  const userName = activeChat.userName || "User";
  const userImage = activeChat.userImage;
  const chatId = activeChat.chatId || (astrologerId && userId ? getChatId(astrologerId, userId) : null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isEndChatModalOpen, setIsEndChatModalOpen] = useState(false);
  const [isUserDecidingModalOpen, setIsUserDecidingModalOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [chatReady, setChatReady] = useState(false);
  const bottomRef = useRef(null);
  const timerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Redirect if no active chat
  useEffect(() => {
    if (!activeChat.isActive || !userId) {
      router.replace("/");
    }
  }, [activeChat.isActive, userId, router]);

  // Count-up timer
  useEffect(() => {
    if (activeChat.connectionStatus === "connected" && activeChat.startedAt) {
      // Only run interval if not paused by the deciding modal
      if (!isUserDecidingModalOpen) {
        timerRef.current = setInterval(() => {
          setElapsedSeconds((prev) => prev + 1);
        }, 1000);
      }

      return () => clearInterval(timerRef.current);
    }
  }, [activeChat.connectionStatus, activeChat.startedAt, isUserDecidingModalOpen]);

  // Initialize Firebase chat document
  useEffect(() => {
    if (!chatId || !astrologerId || !userId) return;

    const initChat = async () => {
      try {
        const chatRef = doc(db, "chats", chatId);
        const snap = await getDoc(chatRef);

        if (!snap.exists()) {
          await setDoc(chatRef, {
            participants: [astrologerId, userId],
            lastMessage: "",
            lastMessageTime: serverTimestamp(),
            lastSenderId: "",
          });
        }

        setChatReady(true);
      } catch (err) {
        console.error("Error initializing chat:", err);
        toast.error("Failed to initialize chat");
      }
    };

    initChat();
  }, [chatId, astrologerId, userId]);

  // Listen to socket events for partner disconnect and chat events
  useEffect(() => {
    if (!userId || !astrologerId) return;

    const unsubPartnerDisconnected = onPartnerDisconnected((data) => {
      console.log("[Chat] Partner disconnected:", data);
      if (data.userId === userId) {
        toast.error("User disconnected");
        dispatch(clearActiveChat());
        router.replace("/");
      }
    });

    const unsubUserDeciding = onUserDecidingContinuation((data) => {
      console.log("[Chat] User is deciding continuation:", data);
      if (data.userId === userId) {
        setIsUserDecidingModalOpen(true);
      }
    });

    const unsubUserContinued = onUserContinuedChat((data) => {
      console.log("[Chat] User continued chat:", data);
      if (data.userId === userId) {
        setIsUserDecidingModalOpen(false);
        // User said "start hoga 5 min se dobara"
        setElapsedSeconds(300);
        toast.success("User continued the chat!");
      }
    });

    return () => {
      unsubPartnerDisconnected();
      unsubUserDeciding();
      unsubUserContinued();
    };
  }, [userId, astrologerId, dispatch, router]);

  // Listen to messages in real-time
  useEffect(() => {
    if (!chatId || !chatReady) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setMessages(msgs);

      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        50
      );
    });

    return () => unsub();
  }, [chatId, chatReady]);

  // Mark messages as read (messages sent by the user, received by astrologer)
  useEffect(() => {
    if (!chatId || !astrologerId || !chatReady) return;

    const markAsRead = async () => {
      try {
        const q = query(
          collection(db, "chats", chatId, "messages"),
          where("receiverId", "==", astrologerId),
          where("isRead", "==", false)
        );

        const snapshot = await getDocs(q);
        snapshot.forEach(async (msg) => {
          await updateDoc(
            doc(db, "chats", chatId, "messages", msg.id),
            { isRead: true }
          );
        });
      } catch (err) {
        console.error("Error marking messages as read:", err);
      }
    };

    markAsRead();
  }, [chatId, astrologerId, messages, chatReady]);

  // Handle typing indicator
  const handleTyping = (e) => {
    setText(e.target.value);

    if (!chatId || !chatReady) return;

    // Set typing to true
    updateDoc(doc(db, "chats", chatId), { astroTyping: true }).catch((err) =>
      console.error("Error setting typing status:", err)
    );

    // Clear existing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set timeout to false after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      updateDoc(doc(db, "chats", chatId), { astroTyping: false }).catch((err) =>
        console.error("Error clearing typing status:", err)
      );
    }, 3000);
  };

  // Send message
  const sendMessage = async () => {
    if (!text.trim() || !chatId || !astrologerId) return;

    const messageText = text;
    setText("");
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    try {
      const messageData = {
        text: messageText,
        senderId: astrologerId,
        receiverId: userId,
        isRead: false,
        timestamp: serverTimestamp(),
      };

      // Save to Firebase
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);

      await updateDoc(doc(db, "chats", chatId), {
        lastMessage: messageText,
        lastMessageTime: serverTimestamp(),
        lastSenderId: astrologerId,
        astroTyping: false,
      });

      // Emit via socket for real-time sync
      emitChatMessage(userId, astrologerId, {
        text: messageText,
        senderId: astrologerId,
        receiverId: userId,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message");
      setText(messageText); // Restore text on failure
    }
  };

  // End chat
  const handleEndChat = () => {
    setIsEndChatModalOpen(false);
    
    // Emit socket event to notify user
    emitEndConnection(userId, astrologerId);
    
    // Clear active chat from Redux
    dispatch(clearActiveChat());
    
    // Refresh pending chat requests (new users may have sent requests)
    dispatch(fetchPendingChatRequests());
    
    toast.success("Chat ended");
    router.replace("/");
  };

  const sortedMessages = [...messages].sort((a, b) => {
    return (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0);
  });

  const resolvedUserImage = getBackendImageUrl(userImage);

  if (!activeChat.isActive || !userId) {
    return null;
  }

  return (
    <div className="flex h-dvh flex-col bg-[#fafafa] overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => setIsEndChatModalOpen(true)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#666] hover:bg-gray-100 cursor-pointer md:hidden"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>

        <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-[#E8E0ED] bg-[#F7F4FA]">
          {resolvedUserImage ? (
            <Image src={resolvedUserImage} alt={userName} width={36} height={36} unoptimized className="h-full w-full object-cover" />
          ) : (
            <span className="m-auto text-xs font-semibold text-[#7A6A86]">
              {userName.slice(0, 1).toUpperCase()}
            </span>
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-800">{userName}</p>
          <p className="text-xs text-[#888]">
            {activeChat.connectionStatus === "connected" ? "Online" : "Connecting..."}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-[#444]">
            <Timer className="size-5 text-primary" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
          {/* <button
            onClick={() => setIsEndChatModalOpen(true)}
            className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600 cursor-pointer"
          >
            End Chat
          </button> */}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {sortedMessages.map((msg, index) => {
          const isMe = msg.senderId === astrologerId;

          const currentDateLabel = getDateLabel(msg.timestamp);
          const prevDateLabel =
            index > 0
              ? getDateLabel(sortedMessages[index - 1].timestamp)
              : null;

          const showDateSeparator = currentDateLabel !== prevDateLabel;

          return (
            <React.Fragment key={msg.id}>
              {/* DATE SEPARATOR */}
              {showDateSeparator && (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {currentDateLabel}
                  </span>
                </div>
              )}

              {/* MESSAGE BUBBLE */}
              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                    isMe
                      ? "bg-primary/10 text-[#424242]"
                      : "bg-[#FFE2C6] text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className="mt-1 flex items-center justify-end gap-2 text-xs text-gray-500">
                    {isMe && (
                      <span>{msg.isRead ? "Seen" : "Sent"}</span>
                    )}
                    <span>{formatChatTime(msg.timestamp)}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-t-gray-200 bg-white px-4 md:px-6 lg:px-8 py-3">
        <form
          className="flex items-center gap-3 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <textarea
            value={text}
            onChange={handleTyping}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none overflow-hidden h-12 leading-normal bg-gray-50"
            rows="1"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="rounded-lg bg-primary p-3 text-sm font-medium text-white hover:opacity-90 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>

      {/* END CHAT MODAL */}
      <EndChatModal
        isOpen={isEndChatModalOpen}
        onClose={() => setIsEndChatModalOpen(false)}
        onConfirm={handleEndChat}
      />

      {/* USER DECIDING MODAL */}
      <UserDecidingModal isOpen={isUserDecidingModalOpen} />
    </div>
  );
};

export default AstrologerChatScreen;
