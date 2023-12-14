import { create } from "zustand";

export enum MessageType {
  USER = "USER",
  AGENT = "AGENT",
}

export type Message = {
  msgType: MessageType;
  content: string;
};

type MessageStore = {
  currentPrompt: string;
  messages: Message[];
  updatePrompt: (prompt: string) => void;
  addQuestion: () => void;
  addResponse: (response: string) => void;
  reset: () => void;
};

const useMessageStore = create<MessageStore>((set) => ({
  currentPrompt: "",
  messages: [],
  updatePrompt: (prompt) => {
    set(() => ({ currentPrompt: prompt }));
  },
  addQuestion: () => {
    set((state) => {
      const newQuestion: Message = {
        msgType: MessageType.USER,
        content: state.currentPrompt,
      };
      return { currentPrompt: "", messages: [...state.messages, newQuestion] };
    });
  },
  addResponse: (response) => {
    const newResponse: Message = {
      msgType: MessageType.AGENT,
      content: response,
    };
    set((state) => ({ messages: [...state.messages, newResponse] }));
  },
  reset: () => {
    set({ messages: [], currentPrompt: "" });
  },
}));

export default useMessageStore;
