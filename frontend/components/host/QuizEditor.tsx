'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { QuestionList } from '@/components/host/QuestionList';
import { QuestionEditor } from '@/components/host/QuestionEditor';
import { useQuizStore } from '@/stores/quizStore';
import { Question } from '@/types';

interface QuizEditorProps {
  quizId: string;
}

export function QuizEditor({ quizId }: QuizEditorProps) {
  const {
    currentQuiz,
    loading,
    saving,
    fetchQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  } = useQuizStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    void fetchQuiz(quizId);
  }, [quizId, fetchQuiz]);

  const questions = currentQuiz?.questions ?? [];
  const activeQuestion = isNew ? null : (questions[activeIndex] ?? null);

  const handleAdd = () => {
    setIsNew(true);
    setActiveIndex(questions.length);
  };

  const handleSelect = (index: number) => {
    setIsNew(false);
    setActiveIndex(index);
  };

  const handleSave = async (data: Omit<Question, '_id' | 'order'>) => {
    try {
      if (isNew) {
        await addQuestion(quizId, data);
        setIsNew(false);
        setActiveIndex(questions.length);
        toast.success('Đã thêm câu hỏi');
      } else if (activeQuestion) {
        await updateQuestion(quizId, activeQuestion._id, data);
        toast.success('Đã cập nhật câu hỏi');
      }
    } catch {
      toast.error('Lưu câu hỏi thất bại, vui lòng thử lại.');
    }
  };

  const handleDelete = async () => {
    if (!activeQuestion) return;
    const ok = window.confirm('Bạn có chắc muốn xóa câu hỏi này?');
    if (!ok) return;
    try {
      await deleteQuestion(quizId, activeQuestion._id);
      setActiveIndex(Math.max(0, activeIndex - 1));
      toast.success('Đã xóa câu hỏi');
    } catch {
      toast.error('Xóa câu hỏi thất bại, vui lòng thử lại.');
    }
  };

  if (loading && !currentQuiz) {
    return (
      <div className="glass-card flex h-64 items-center justify-center">
        <p className="text-mln-dim">Đang tải quiz...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-mln-dim transition hover:text-mln-cream"
      >
        ← Quay lại Dashboard
      </Link>

      {currentQuiz && (
        <div className="mb-1">
          <h1 className="text-xl font-semibold text-mln-cream">
            {currentQuiz.title}
          </h1>
          {currentQuiz.description && (
            <p className="text-sm text-mln-dim">{currentQuiz.description}</p>
          )}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <QuestionList
          title="Danh sách câu hỏi"
          quizId={quizId}
          questions={questions}
          activeIndex={isNew ? questions.length : activeIndex}
          onSelect={handleSelect}
          onAdd={handleAdd}
        />
        <QuestionEditor
          question={activeQuestion}
          isNew={isNew}
          saving={saving}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
