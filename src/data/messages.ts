import { create } from "zustand";

export enum MessageType {
  USER = "USER",
  AGENT = "AGENT",
}

export interface Message {
  msgType: MessageType;
  content: string;
}

export type ResponseSource = {
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
  addResponse: (content: string, sources: ResponseSource[]) => void;
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
  addResponse: (content, sources) => {
    const newResponse: AgentMessage = {
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
