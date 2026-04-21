'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LeaderboardTable } from '@/components/host/LeaderboardTable';
import { LiveDashboard } from '@/components/host/LiveDashboard';
import { AnswerButton } from '@/components/player/AnswerButton';
import { CountdownRing } from '@/components/player/CountdownRing';
import { QuestionDisplay } from '@/components/player/QuestionDisplay';
import { useHostGame } from '@/hooks/useHostGame';
import { usePlayerGame } from '@/hooks/usePlayerGame';

interface RoomGamePageProps {
  params: Promise<{ roomCode: string }>;
  searchParams: Promise<{
    mode?: string;
    sessionId?: string;
    nickname?: string;
  }>;
}

const OPTION_SYMBOLS = ['▲', '◆', '●', '■'] as const;

function HostGameRoom({
  roomCode,
  sessionId,
}: {
  roomCode: string;
  sessionId: string;
}) {
  const router = useRouter();
  const {
    players,
    gameStatus,
    currentQuestion,
    answerStats,
    leaderboard,
    totalAnswered,
    endGame,
  } = useHostGame(sessionId);

  useEffect(() => {
    if (gameStatus === 'ended') {
      router.replace(
        `/phong/${roomCode}/ket-thuc?mode=host&sessionId=${sessionId}`,
      );
    }
  }, [gameStatus, roomCode, sessionId, router]);

  const statusLabel: Record<string, string> = {
    starting: '⏳ Chuẩn bị câu hỏi đầu tiên...',
    question: '★ Đang hiển thị câu hỏi',
    answer_reveal: '✔ Đang hiển thị đáp án',
    leaderboard: '★ Bảng xếp hạng',
    ended: '★ Kỳ thi kết thúc',
  };

  return (
    <main className="mx-auto grid min-h-screen w-[min(1100px,calc(100%-2rem))] content-start gap-5 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
        >
          ← Dashboard
        </Link>
        <button
          type="button"
          onClick={endGame}
          className="inline-flex items-center gap-2 rounded-xl border border-mln-red/30 bg-mln-red/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-mln-red transition hover:bg-mln-red/20"
        >
          Kết thúc sớm
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-6">
        <div className="mln-top-bar" />
        <div className="flex items-center gap-2">
          <span className="mln-ink-badge">
            {statusLabel[gameStatus] ?? 'Đang chờ...'}
          </span>
          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-mln-dim">
            {players.length} người chơi
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-mln-cream">
          {currentQuestion?.content ?? 'Host đang điều khiển kỳ thi'}
        </h1>
      </section>

      {answerStats.length > 0 && (
        <LiveDashboard
          stats={answerStats}
          totalAnswered={totalAnswered}
          totalPlayers={players.length}
          revealed={gameStatus === 'answer_reveal'}
        />
      )}

      {leaderboard.length > 0 && gameStatus === 'leaderboard' && (
        <LeaderboardTable rankings={leaderboard} />
      )}
    </main>
  );
}

function PlayerGameRoom({ roomCode }: { roomCode: string }) {
  const router = useRouter();
  const {
    gameStatus,
    currentQuestion,
    timeLeft,
    hasAnswered,
    myScore,
    myRank,
    answeredCount,
    totalPlayers,
    submitAnswer,
  } = usePlayerGame();

  useEffect(() => {
    if (gameStatus === 'ended') {
      router.replace(`/phong/${roomCode}/ket-thuc`);
    }
  }, [gameStatus, roomCode, router]);

  if (gameStatus === 'leaderboard') {
    return (
      <main className="flex h-dvh items-center justify-center px-4">
        <section className="w-full max-w-md overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-8 text-center">
          <div className="mln-top-bar" />
          <span className="text-3xl text-mln-gold">★</span>
          <h2 className="mt-3 text-xl font-extrabold uppercase tracking-wide text-mln-cream">
            Bảng xếp hạng
          </h2>
          <p className="mt-5 font-mono text-6xl font-extrabold text-mln-gold">
            #{myRank > 0 ? myRank : '—'}
          </p>
          <p className="mt-2 text-lg font-bold text-mln-cream">
            {myScore.toLocaleString()} điểm
          </p>
          <p className="mt-1 text-sm text-mln-dim">
            Chờ host chuyển câu tiếp theo…
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col">
      {/* Top bar */}
      <header className="flex flex-none items-center justify-between border-b border-white/6 px-4 py-3 sm:px-6">
        <Link
          href="/tham-gia"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
        >
          ← Quay lại
        </Link>
        {myScore > 0 && (
          <div className="flex items-center gap-1.5 rounded-xl border border-mln-gold/20 bg-mln-gold/8 px-3 py-1.5">
            <span className="font-mono text-sm font-extrabold text-mln-gold">
              {myScore.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-mln-dim">
              điểm
            </span>
          </div>
        )}
      </header>

      {/* Content — stacked naturally, scrollable */}
      <div className="flex flex-1 flex-col gap-4 px-4 py-5 sm:px-6">
        {/* Question */}
        {currentQuestion ? (
          <QuestionDisplay question={currentQuestion.content} />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-6 text-center">
            <div className="mln-top-bar" />
            <p className="text-sm text-mln-dim">Chờ câu hỏi tiếp theo...</p>
          </div>
        )}

        {/* Countdown */}
        {currentQuestion && (
          <div className="flex justify-center">
            <CountdownRing value={timeLeft} max={currentQuestion.timeLimit} />
          </div>
        )}

        {/* Answers */}
        {currentQuestion &&
          (hasAnswered || gameStatus === 'answer_reveal' ? (
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-5 text-center">
              <div className="mln-top-bar" />
              <p className="text-lg font-extrabold uppercase tracking-wide text-mln-cream">
                {hasAnswered ? '★ Đã trả lời!' : 'Hết giờ!'}
              </p>
              {hasAnswered && totalPlayers > 0 ? (
                <p className="mt-1.5 text-sm text-mln-dim">
                  {answeredCount}/{totalPlayers} người đã trả lời
                </p>
              ) : hasAnswered ? (
                <p className="mt-1.5 text-sm text-mln-dim">
                  Chờ kết quả từ host...
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-mln-dim">
                  Chờ câu hỏi tiếp theo...
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {currentQuestion.options.map((option, index) => (
                <AnswerButton
                  key={option.id}
                  symbol={OPTION_SYMBOLS[index] ?? '•'}
                  text={option.text}
                  color={option.color}
                  onClick={() => submitAnswer(currentQuestion._id, option.id)}
                />
              ))}
            </div>
          ))}
      </div>
    </main>
  );
}

export default function RoomGamePage({
  params,
  searchParams,
}: RoomGamePageProps) {
  const { roomCode } = use(params);
  const { mode, sessionId = '' } = use(searchParams);
  const isHost = mode === 'host';

  if (isHost) {
    return <HostGameRoom roomCode={roomCode} sessionId={sessionId} />;
  }

  return <PlayerGameRoom roomCode={roomCode} />;
}
