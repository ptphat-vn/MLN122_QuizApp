'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, FileQuestion } from 'lucide-react';
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
    <article className="glass-card flex h-full flex-col overflow-hidden transition hover:border-mln-red/20 hover:bg-white/6">
      {/* Coloured top accent */}
      <div className="h-1 w-full bg-linear-to-r from-mln-red to-mln-gold" />

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 inline-block self-start rounded-full bg-mln-red/15 px-2.5 py-0.5 text-xs font-semibold text-mln-red">
          Kinh tế chính trị
        </span>
        <h3 className="line-clamp-2 text-base font-semibold text-mln-cream">
          {quiz.title}
        </h3>
        <div className="mt-2 space-y-1 text-sm text-mln-dim">
          <p className="inline-flex items-center gap-2">
            <FileQuestion className="size-4" />
            {quiz.questions?.length ?? 0} câu hỏi
          </p>
          <p className="inline-flex items-center gap-2">
            <CalendarDays className="size-4" />
            {new Date(quiz.createdAt).toLocaleDateString('vi-VN')}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/quiz/${quiz._id}/chinh-sua`}
            className="flex-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-center text-sm font-medium text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
          >
            Chỉnh sửa
          </Link>
          <button
            type="button"
            onClick={handleCreateRoom}
            disabled={creating}
            className="flex-1 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-mln-red/20 transition hover:brightness-110 disabled:opacity-60"
          >
            {creating ? '...' : 'Mở phòng'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(quiz._id)}
            className="rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-mln-dim transition hover:border-mln-red/40 hover:text-mln-red-light"
          >
            Xóa
          </button>
        </div>
      </div>
    </article>
  );
}
