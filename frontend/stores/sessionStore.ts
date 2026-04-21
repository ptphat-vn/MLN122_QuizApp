'use client';

import { create } from 'zustand';

import { api } from '@/lib/api';
import { Ranking, Session } from '@/types';

interface SessionData {
  sessionId: string;
  pin: string;
  qrCode: string;
}

interface PlayerAnswerResult {
  nickname: string;
  questionId: string;
  optionId: string;
  isCorrect: boolean;
  pointsEarned: number;
  answeredAt: string;
}

interface SessionResults {
  session: Session;
  rankings: Ranking[];
  answers: PlayerAnswerResult[];
}

interface SessionStore {
  activeSession: SessionData | null;
  results: SessionResults | null;
  loading: boolean;

  createSession: (quizId: string) => Promise<SessionData>;
  getSessionByPin: (pin: string) => Promise<Session>;
  getSessionResults: (sessionId: string) => Promise<SessionResults>;
  setActiveSession: (session: SessionData | null) => void;
  reset: () => void;
}

const initialState = {
  activeSession: null,
  results: null,
  loading: false,
};

export const useSessionStore = create<SessionStore>((set) => ({
  ...initialState,

  createSession: async (quizId) => {
    set({ loading: true });
    try {
      const response = await api.post<SessionData>('/sessions', { quizId });
      const session = response.data;
      set({ activeSession: session });
      return session;
    } finally {
      set({ loading: false });
    }
  },

  getSessionByPin: async (pin) => {
    set({ loading: true });
    try {
      const response = await api.get<Session>(`/sessions/${pin}`);
      return response.data;
    } finally {
      set({ loading: false });
    }
  },

  getSessionResults: async (sessionId) => {
    set({ loading: true });
    try {
      const response = await api.get<SessionResults>(
        `/sessions/${sessionId}/results`,
      );
      set({ results: response.data });
      return response.data;
    } finally {
      set({ loading: false });
    }
  },

  setActiveSession: (session) => set({ activeSession: session }),

  reset: () => set(initialState),
}));
