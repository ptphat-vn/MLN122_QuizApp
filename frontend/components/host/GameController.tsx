type HostGameState = 'question' | 'answer_reveal' | 'leaderboard';

interface GameControllerProps {
  gameState: HostGameState;
  onReveal: () => void;
  onShowLeaderboard: () => void;
  onNext: () => void;
}

export function GameController({
  gameState,
  onReveal,
  onShowLeaderboard,
  onNext,
}: GameControllerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {gameState === 'question' ? (
        <button
          type="button"
          onClick={onReveal}
          className="rounded-xl border border-white/10 bg-white/6 px-5 py-2.5 font-semibold text-mln-cream transition hover:bg-white/10"
        >
          Xem đáp án →
        </button>
      ) : null}

      {gameState === 'answer_reveal' ? (
        <button
          type="button"
          onClick={onShowLeaderboard}
          className="rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-5 py-2.5 font-semibold text-white shadow-md shadow-mln-red/20 transition hover:brightness-110"
        >
          Bảng xếp hạng →
        </button>
      ) : null}

      {gameState === 'leaderboard' ? (
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-linear-to-br from-green-600 to-green-700 px-5 py-2.5 font-semibold text-white shadow-md shadow-green-700/20 transition hover:brightness-110"
        >
          Câu tiếp theo →
        </button>
      ) : null}
    </div>
  );
}
