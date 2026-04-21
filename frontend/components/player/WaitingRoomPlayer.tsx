interface WaitingRoomPlayerProps {
  nickname: string;
}

export function WaitingRoomPlayer({ nickname }: WaitingRoomPlayerProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="mln-frame w-full max-w-md p-8 text-center animate-fade-in">
        <div className="mb-6 flex justify-center gap-1.5">
          <span className="size-2 animate-bounce rounded-full bg-mln-red" style={{ animationDelay: '0ms' }} />
          <span className="size-2 animate-bounce rounded-full bg-mln-gold" style={{ animationDelay: '150ms' }} />
          <span className="size-2 animate-bounce rounded-full bg-mln-red" style={{ animationDelay: '300ms' }} />
        </div>
        <div className="mx-auto mt-5 w-fit rounded-2xl bg-linear-to-br from-mln-red to-mln-red-dark px-8 py-3.5 text-center shadow-lg shadow-mln-red/25">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">Thí sinh</p>
          <p className="mt-0.5 text-2xl font-bold text-white">{nickname}</p>
        </div>
        <p className="mt-5 text-sm text-mln-dim">Đang chờ giám thị khai mạc kỳ thi...</p>
        <blockquote className="mt-6 rounded-xl border border-mln-gold/20 bg-mln-gold/5 p-4 text-left text-xs italic text-mln-dim">
          &ldquo;Học, học nữa, học mãi.&rdquo; &mdash; V.I. Lê-nin
        </blockquote>
      </section>
    </main>
  );
}
