'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileQuestion } from 'lucide-react';
import { toast } from 'sonner';

import { useSessionStore } from '@/stores/sessionStore';
import { Quiz } from '@/types';

interface QuizCardProps {
  quiz: Quiz;
  onDelete: (id: string) => void;
}

export function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const router = useRouter();
  const { createSession } = useSessionStore();
  const [creating, setCreating] = useState(false);

  const handleCreateRoom = async () => {
    try {
      setCreating(true);
      const session = await createSession(quiz._id);
      router.push(
        `/phong/${session.pin}/cho?mode=host&sessionId=${session.sessionId}`,
      );
    } catch {
      toast.error('Không thể tạo phòng, vui lòng thử lại.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/35 transition hover:border-mln-red/30 hover:bg-black/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] flex h-full flex-col">
      {/* Top gradient accent */}
      <div className="h-1 w-full bg-linear-to-r from-mln-red via-mln-gold to-mln-red" />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="mln-ink-badge">Kinh tế chính trị</span>
          <span className="text-xs text-mln-surface font-mono">
            {new Date(quiz.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        <h3 className="line-clamp-2 text-base font-bold uppercase tracking-wide text-mln-cream">
          {quiz.title}
        </h3>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-mln-dim">
          <FileQuestion className="size-3.5 text-mln-gold/70" />
          <span className="font-semibold text-mln-cream/80">
            {quiz.questions?.length ?? 0}
          </span>
          <span>câu hỏi</span>
        </div>

        <div className="mt-auto pt-4 flex gap-2">
          <Link
            href={`/quiz/${quiz._id}/chinh-sua`}
            className="flex-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
          >
            Chỉnh sửa
          </Link>
          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={creating}
            className="flex-1 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-3 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md shadow-mln-red/25 transition hover:brightness-110 disabled:opacity-60"
          >
            {creating ? '...' : 'Mở phòng'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(quiz._id)}
            className="rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs text-mln-dim transition hover:border-mln-red/40 hover:text-mln-red-light"
          >
            Xóa
          </button>
        </div>
      </div>
    </article>
  );
}
