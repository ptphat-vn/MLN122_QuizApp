'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { QuizCard } from '@/components/host/QuizCard';
import { useQuizStore } from '@/stores/quizStore';

export default function DashboardPage() {
  const { quizzes, loading, fetchQuizzes, deleteQuiz } = useQuizStore();

  useEffect(() => {
    void fetchQuizzes();
  }, [fetchQuizzes]);

  const handleDeleteQuiz = async (id: string) => {
    const accepted = window.confirm('Bạn có chắc muốn xóa quiz này không?');
    if (!accepted) return;

    try {
      await deleteQuiz(id);
      toast.success('Đã xóa quiz thành công');
    } catch {
      toast.error('Xóa quiz thất bại, vui lòng thử lại.');
    }
  };

  return (
    <main className="mx-auto mt-8 w-[min(1100px,calc(100%-2rem))]">
      {/* Header */}
      <header className="mb-8 overflow-hidden rounded-2xl border border-white/8 bg-black/30">
        <div className="mln-top-bar" />
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <div className="mln-ink-badge mb-2">★ Giảng Viên</div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-mln-cream">
              Bộ Đề Của Tôi
            </h1>
            <p className="mt-1 text-sm text-mln-dim">
              Quản lý bộ đề và mở phòng thi realtime.
            </p>
          </div>
          <Link
            href="/quiz/create"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-5 py-2.5 font-bold uppercase tracking-wide text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110"
          >
            <span className="text-mln-gold">★</span> Tạo bộ đề mới
          </Link>
        </div>
      </header>

      {loading ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-52 animate-pulse rounded-2xl bg-mln-mid/60"
            />
          ))}
        </section>
      ) : null}

      {!loading && quizzes.length === 0 ? (
        <section className="overflow-hidden rounded-2xl border border-white/8 bg-black/30 p-12 text-center">
          <div className="mln-top-bar" />
          <p className="mb-3 text-5xl text-mln-gold animate-star-pulse">★</p>
          <p className="text-xl font-extrabold uppercase tracking-wide text-mln-cream">
            Chưa có bộ đề nào.
          </p>
          <p className="mt-2 text-sm text-mln-dim">
            Tạo bộ đề đầu tiên để bắt đầu tổ chức kỳ thi.
          </p>
          <Link
            href="/quiz/create"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-6 py-3 font-bold uppercase tracking-wide text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110"
          >
            <span className="text-mln-gold">★</span> Tạo bộ đề đầu tiên
          </Link>
        </section>
      ) : null}

      {!loading && quizzes.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} onDelete={handleDeleteQuiz} />
          ))}
        </section>
      ) : null}
    </main>
  );
}
