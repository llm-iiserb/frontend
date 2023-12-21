import { nanoid } from "nanoid";
import { create } from "zustand";

export enum MessageType {
  USER = "USER",
  AGENT = "AGENT",
}

export interface Message {
  id: string;
  msgType: MessageType;
  content: string;
}

export type ResponseSource = {
  id?: string;
  source: string;
  page?: number;
};

export interface AgentMessage extends Message {
  sources: ResponseSource[];
}

type MessageStore = {
  currentPrompt: string;
  messages: Message[];
  updatePrompt: (prompt: string) => void;
  addQuestion: () => void;
  addResponse: (
    chatId: string,
    content: string,
    sources: ResponseSource[]
  ) => void;
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
        id: nanoid(7),
        msgType: MessageType.USER,
        content: state.currentPrompt,
      };
      return { currentPrompt: "", messages: [...state.messages, newQuestion] };
    });
  },
  addResponse: (chatId, content, sources) => {
    const newResponse: AgentMessage = {
      id: chatId,
      msgType: MessageType.AGENT,
      content,
      sources,
    };
    set((state) => ({ messages: [...state.messages, newResponse] }));
  },
  reset: () => {
    set({ messages: [], currentPrompt: "" });
  },
}));

export default useMessageStore;
