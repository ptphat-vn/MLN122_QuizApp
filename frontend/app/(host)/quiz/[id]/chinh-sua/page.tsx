import { QuizEditor } from '@/components/host/QuizEditor';

interface EditQuizPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditQuizPage({ params }: EditQuizPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto mt-6 w-[min(1200px,calc(100%-2rem))]">
      <QuizEditor quizId={id} />
    </main>
  );
}
