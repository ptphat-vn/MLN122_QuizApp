'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useQuizStore } from '@/stores/quizStore';

export default function CreateQuizPage() {
  const router = useRouter();
  const { createQuiz, saving } = useQuizStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (title.trim().length < 3) {
      toast.error('Tiêu đề quiz cần ít nhất 3 ký tự.');
      return;
    }

    try {
      const quiz = await createQuiz(
        title.trim(),
        description.trim() || undefined,
      );
      toast.success('Đã tạo quiz mới');
      router.push(`/quiz/${quiz._id}/chinh-sua`);
    } catch {
      toast.error('Không thể tạo quiz, vui lòng thử lại.');
    }
  };

  return (
    <main className="mx-auto mt-8 w-[min(720px,calc(100%-2rem))]">
      {/* Back */}
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mln-dim transition hover:text-mln-cream"
      >
        ← Quay lại Dashboard
      </Link>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 shadow-xl">
        <div className="mln-top-bar" />
        <div className="border-b border-white/8 bg-linear-to-r from-mln-red/15 to-transparent px-7 py-5">
          <div className="mln-ink-badge mb-2">★ Biên soạn</div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-mln-cream">
            Tạo bộ đề mới
          </h1>
          <p className="mt-1 text-sm text-mln-dim">
            Nhập tiêu đề và mô tả, sau đó biên soạn câu hỏi.
          </p>
        </div>

        <div className="px-7 py-7">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
              >
                Tiêu đề bộ đề
              </label>
              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
                placeholder="Ví dụ: Ôn Tập Kinh Tế Chính Trị Chương 2"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
              >
                Mô tả{' '}
                <span className="text-mln-surface normal-case tracking-normal">
                  (tùy chọn)
                </span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
                placeholder="Mục tiêu kiểm tra, phạm vi kiến thức..."
              />
            </div>

            <button
              type="button"
              onClick={handleCreate}
              disabled={saving}
              className="rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark px-7 py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? 'Đang lưu...' : '★ Tạo bộ đề'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
