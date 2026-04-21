'use client';

import { useEffect, useRef, useState } from 'react';

import { useSocket } from '@/hooks/useSocket';
import { usePlayerStore } from '@/stores/playerStore';
import { GameStatus, Question, Ranking } from '@/types';

interface UsePlayerGameResult {
  gameStatus: GameStatus;
  currentQuestion: Question | null;
  timeLeft: number;
  hasAnswered: boolean;
  myScore: number;
  myRank: number;
  leaderboard: Ranking[];
  answeredCount: number;
  totalPlayers: number;
  joinRoom: (pin: string, nickname: string) => void;
  submitAnswer: (questionId: string, optionId: string) => void;
}

export function usePlayerGame(): UsePlayerGameResult {
  const { socket } = useSocket();
  const {
    score,
    rank,
    hasAnswered,
    setHasAnswered,
    setLastResult,
    updateScore,
  } = usePlayerStore();

  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Ranking[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const questionStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('game:started', () => setGameStatus('question'));
    socket.on('question:show', (question: Question) => {
      setCurrentQuestion(question);
      setHasAnswered(false);
      setGameStatus('question');
      setTimeLeft(question.timeLimit);
      setAnsweredCount(0);
      questionStartTimeRef.current = Date.now();
    });
    socket.on('question:time_tick', (payload: { timeLeft: number }) => {
      setTimeLeft(payload.timeLeft);
    });
    socket.on('question:time_up', () => setGameStatus('answer_reveal'));
    socket.on(
      'room:answered_update',
      (payload: { totalAnswered: number; totalPlayers: number }) => {
        setAnsweredCount(payload.totalAnswered);
        setTotalPlayers(payload.totalPlayers);
      },
    );
    // answer:received — kết quả cá nhân sau khi nộp
    socket.on(
      'answer:received',
      (payload: {
        isCorrect: boolean;
        pointsEarned: number;
        streak: number;
        totalScore: number;
      }) => {
        setLastResult(payload);
      },
    );
    // answer:reveal — host công bố đáp án đúng cho cả phòng
    socket.on('answer:reveal', () => {
      setGameStatus('answer_reveal');
    });
    socket.on('leaderboard:show', ({ rankings }: { rankings: Ranking[] }) => {
      setLeaderboard(rankings);
      setGameStatus('leaderboard');
      // Find this player's rank from the leaderboard
      const myNickname = usePlayerStore.getState().nickname;
      const myEntry = rankings.find(
        (r) => r.nickname.toLowerCase() === myNickname.toLowerCase(),
      );
      if (myEntry) {
        updateScore(myEntry.score, myEntry.rank);
      }
    });
    socket.on('game:ended', () => setGameStatus('ended'));

    return () => {
      socket.off('game:started');
      socket.off('question:show');
      socket.off('question:time_tick');
      socket.off('question:time_up');
      socket.off('room:answered_update');
      socket.off('answer:received');
      socket.off('answer:reveal');
      socket.off('leaderboard:show');
      socket.off('game:ended');
    };
  }, [socket, setHasAnswered, setLastResult, updateScore]);

  return {
    gameStatus,
    currentQuestion,
    timeLeft,
    hasAnswered,
    myScore: score,
    myRank: rank,
    leaderboard,
    answeredCount,
    totalPlayers,
    joinRoom: (pin, nickname) =>
      socket?.emit('player:join_room', { pin, nickname }),
    submitAnswer: (questionId, optionId) => {
      setHasAnswered(true);
      const responseTime = Date.now() - questionStartTimeRef.current;
      socket?.emit('player:submit_answer', {
        questionId,
        selectedOptions: [optionId],
        responseTime,
      });
    },
  };
}
