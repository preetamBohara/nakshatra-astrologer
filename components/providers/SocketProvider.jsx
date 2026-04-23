"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  authenticate,
  onConnectionRequest,
  onConnectionConfirmed,
  onPartnerDisconnected,
  onWaitingRequestCancelled,
  onUserDecidingContinuation,
  onUserContinuedChat,
  onAuthenticationSuccess,
  onSocketError,
  getSocket,
  emitCheckAstro,
} from "@/lib/socketService";
import { getCookie } from "@/lib/clientHelpers";
import { AUTH_TOKEN_KEY } from "@/constants/others";
import {
  addIncomingRequest,
  removeIncomingRequest,
  setConnectionStatus,
  clearActiveChat,
} from "@/redux/slices/chatSlice";
import { fetchPendingChatRequests } from "@/redux/slices/dashboardSlice";
import { useRouter } from "next/navigation";

const SocketContext = React.createContext(null);

export function useSocketContext() {
  return React.useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeChat = useSelector((state) => state.chat.activeChat);
  const profileData = useSelector((state) => state.dashboard.profileData);
  const authenticatedRef = useRef(false);
  const activeChatRef = useRef(activeChat);

  // Keep ref in sync so callbacks always see latest state
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // checkAstro interval heartbeat
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !profileData?._id) return;

    const interval = setInterval(() => {
      if (socket.connected && authenticatedRef.current) {
        emitCheckAstro(profileData._id);
      }
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, [profileData?._id]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const token = getCookie(AUTH_TOKEN_KEY);
    if (!token) return;

    // Authenticate on connect / reconnect
    const handleConnect = () => {
      authenticatedRef.current = false;
      authenticate(token);
    };

    if (socket.connected && !authenticatedRef.current) {
      authenticate(token);
    }

    socket.on("connect", handleConnect);

    // --- Listeners ---

    const unsubAuth = onAuthenticationSuccess((data) => {
      authenticatedRef.current = true;
      console.log("[Socket] Authenticated:", data);
    });

    const unsubRequest = onConnectionRequest((data) => {
      console.log("[Socket] connection_request:", data);
      dispatch(
        addIncomingRequest({
          userId: data.userId,
          userName: data.userName,
          userImage: data.userImage,
          astrologerId: data.astrologerId,
          requestType: data.requestType,
          timestamp: data.timestamp,
        })
      );
      // Also refresh API-based list
      dispatch(fetchPendingChatRequests());
    });

    const unsubConfirmed = onConnectionConfirmed((data) => {
      console.log("[Socket] connection_confirmed:", data);
      dispatch(setConnectionStatus("connected"));
    });

    const unsubDisconnected = onPartnerDisconnected((data) => {
      console.log("[Socket] partner_disconnected:", data);
      toast("Chat ended by user", { icon: "👋" });
      dispatch(clearActiveChat());
      // Refresh pending requests to show new requests that might have come
      dispatch(fetchPendingChatRequests());
      router.replace("/");
    });

    const unsubCancelled = onWaitingRequestCancelled((data) => {
      console.log("[Socket] waiting_request_cancelled:", data);
      dispatch(removeIncomingRequest(data.userId));
      dispatch(fetchPendingChatRequests());
      // If the cancelled request is the one we're connecting to, abort
      if (activeChatRef.current.userId === data.userId) {
        toast.error("User cancelled the request");
        dispatch(clearActiveChat());
        router.replace("/");
      }
    });

    const unsubDeciding = onUserDecidingContinuation((data) => {
      console.log("[Socket] user_deciding_continuation:", data);
      toast("User is deciding to continue...", { icon: "⏳" });
    });

    const unsubContinued = onUserContinuedChat((data) => {
      console.log("[Socket] user_continued_chat:", data);
      toast.success("User continued the chat!");
    });

    const unsubError = onSocketError((data) => {
      console.error("[Socket] error:", data);
      toast.error(data?.message || "Socket error occurred");
    });

    return () => {
      socket.off("connect", handleConnect);
      unsubAuth();
      unsubRequest();
      unsubConfirmed();
      unsubDisconnected();
      unsubCancelled();
      unsubDeciding();
      unsubContinued();
      unsubError();
      authenticatedRef.current = false;
    };
  }, [dispatch, router]);

  return (
    <SocketContext.Provider value={getSocket()}>
      {children}
    </SocketContext.Provider>
  );
}
