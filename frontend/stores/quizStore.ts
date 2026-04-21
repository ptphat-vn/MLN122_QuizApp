'use client';

import { create } from 'zustand';

import { api } from '@/lib/api';
import { Quiz, Question } from '@/types';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface QuizStore {
  quizzes: Quiz[];
  pagination: Pagination | null;
  currentQuiz: Quiz | null;
  loading: boolean;
  saving: boolean;

  fetchQuizzes: (page?: number, limit?: number) => Promise<void>;
  fetchQuiz: (id: string) => Promise<void>;
  createQuiz: (title: string, description?: string) => Promise<Quiz>;
  updateQuiz: (
    id: string,
    data: Partial<Pick<Quiz, 'title' | 'description' | 'thumbnail'>>,
  ) => Promise<void>;
  deleteQuiz: (id: string) => Promise<void>;

  addQuestion: (
    quizId: string,
    data: Omit<Question, '_id' | 'order'>,
  ) => Promise<Question>;
  updateQuestion: (
    quizId: string,
    qId: string,
    data: Partial<Omit<Question, '_id'>>,
  ) => Promise<Question>;
  deleteQuestion: (quizId: string, qId: string) => Promise<void>;
  reorderQuestions: (quizId: string, orderedIds: string[]) => Promise<void>;

  setCurrentQuiz: (quiz: Quiz | null) => void;
  reset: () => void;
}

const initialState = {
  quizzes: [],
  pagination: null,
  currentQuiz: null,
  loading: false,
  saving: false,
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  ...initialState,

  fetchQuizzes: async (page = 1, limit = 10) => {
    set({ loading: true });
    try {
      const response = await api.get<{
        quizzes: Quiz[];
        pagination: Pagination;
      }>('/quizzes', { params: { page, limit } });
      set({
        quizzes: response.data.quizzes,
        pagination: response.data.pagination,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchQuiz: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get<Quiz>(`/quizzes/${id}`);
      set({ currentQuiz: response.data });
    } finally {
      set({ loading: false });
    }
  },

  createQuiz: async (title, description) => {
    set({ saving: true });
    try {
      const response = await api.post<Quiz>('/quizzes', { title, description });
      const quiz = response.data;
      set((state) => ({ quizzes: [quiz, ...state.quizzes] }));
      return quiz;
    } finally {
      set({ saving: false });
    }
  },

  updateQuiz: async (id, data) => {
    set({ saving: true });
    try {
      const response = await api.put<Quiz>(`/quizzes/${id}`, data);
      const updated = response.data;
      set((state) => ({
        quizzes: state.quizzes.map((q) =>
          q._id === id ? { ...q, ...updated } : q,
        ),
        currentQuiz:
          state.currentQuiz?._id === id
            ? { ...state.currentQuiz, ...updated }
            : state.currentQuiz,
      }));
    } finally {
      set({ saving: false });
    }
  },

  deleteQuiz: async (id) => {
    await api.delete(`/quizzes/${id}`);
    set((state) => ({ quizzes: state.quizzes.filter((q) => q._id !== id) }));
  },

  addQuestion: async (quizId, data) => {
    set({ saving: true });
    try {
      const response = await api.post<Question>(
        `/quizzes/${quizId}/questions`,
        data,
      );
      const question = response.data;
      set((state) => {
        const newQuestions = state.currentQuiz?.questions
          ? [...state.currentQuiz.questions, question]
          : [question];
        return {
          currentQuiz:
            state.currentQuiz?._id === quizId
              ? { ...state.currentQuiz, questions: newQuestions }
              : state.currentQuiz,
          quizzes: state.quizzes.map((q) =>
            q._id === quizId ? { ...q, questions: newQuestions } : q,
          ),
        };
      });
      return question;
    } finally {
      set({ saving: false });
    }
  },

  updateQuestion: async (quizId, qId, data) => {
    set({ saving: true });
    try {
      const response = await api.put<Question>(
        `/quizzes/${quizId}/questions/${qId}`,
        data,
      );
      const updated = response.data;
      set((state) => {
        const updatedQuestions = (state.currentQuiz?.questions ?? []).map(
          (q) => (q._id === qId ? updated : q),
        );
        return {
          currentQuiz:
            state.currentQuiz?._id === quizId
              ? { ...state.currentQuiz, questions: updatedQuestions }
              : state.currentQuiz,
          quizzes: state.quizzes.map((q) =>
            q._id === quizId ? { ...q, questions: updatedQuestions } : q,
          ),
        };
      });
      return updated;
    } finally {
      set({ saving: false });
    }
  },

  deleteQuestion: async (quizId, qId) => {
    await api.delete(`/quizzes/${quizId}/questions/${qId}`);
    set((state) => {
      const updatedQuestions = (state.currentQuiz?.questions ?? []).filter(
        (q) => q._id !== qId,
      );
      return {
        currentQuiz:
          state.currentQuiz?._id === quizId
            ? { ...state.currentQuiz, questions: updatedQuestions }
            : state.currentQuiz,
        quizzes: state.quizzes.map((q) =>
          q._id === quizId ? { ...q, questions: updatedQuestions } : q,
        ),
      };
    });
  },

  reorderQuestions: async (quizId, orderedIds) => {
    await api.put(`/quizzes/${quizId}/questions/reorder`, { orderedIds });
    const { currentQuiz } = get();
    if (!currentQuiz || currentQuiz._id !== quizId) return;
    const reordered = orderedIds
      .map((id) => (currentQuiz.questions ?? []).find((q) => q._id === id))
      .filter(Boolean) as Question[];
    set({ currentQuiz: { ...currentQuiz, questions: reordered } });
  },

  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),

  reset: () => set(initialState),
}));
