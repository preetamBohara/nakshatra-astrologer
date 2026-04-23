import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: {
    isActive: false,
    userId: null,
    userName: null,
    userImage: null,
    chatId: null,
    astrologerId: null,
    connectionStatus: "idle", // "idle" | "connecting" | "connected" | "disconnected"
    startedAt: null, // ISO string — when the chat was connected (for count-up timer)
  },
  incomingRequests: [], // Live socket-based incoming requests
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat(state, action) {
      const { userId, userName, userImage, chatId, astrologerId } = action.payload;
      state.activeChat.isActive = true;
      state.activeChat.userId = userId;
      state.activeChat.userName = userName || "User";
      state.activeChat.userImage = userImage || null;
      state.activeChat.chatId = chatId || null;
      state.activeChat.astrologerId = astrologerId || null;
      state.activeChat.connectionStatus = "connecting";
      state.activeChat.startedAt = null;
    },
    setConnectionStatus(state, action) {
      state.activeChat.connectionStatus = action.payload;
      if (action.payload === "connected") {
        state.activeChat.startedAt = new Date().toISOString();
      }
    },
    clearActiveChat(state) {
      state.activeChat.isActive = false;
      state.activeChat.userId = null;
      state.activeChat.userName = null;
      state.activeChat.userImage = null;
      state.activeChat.chatId = null;
      state.activeChat.astrologerId = null;
      state.activeChat.connectionStatus = "idle";
      state.activeChat.startedAt = null;
    },
    addIncomingRequest(state, action) {
      const request = action.payload;
      // Avoid duplicates by userId
      const exists = state.incomingRequests.some((r) => r.userId === request.userId);
      if (!exists) {
        state.incomingRequests.unshift(request);
      }
    },
    removeIncomingRequest(state, action) {
      const userId = action.payload;
      state.incomingRequests = state.incomingRequests.filter((r) => r.userId !== userId);
    },
    clearIncomingRequests(state) {
      state.incomingRequests = [];
    },
  },
});

export const {
  setActiveChat,
  setConnectionStatus,
  clearActiveChat,
  addIncomingRequest,
  removeIncomingRequest,
  clearIncomingRequests,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
