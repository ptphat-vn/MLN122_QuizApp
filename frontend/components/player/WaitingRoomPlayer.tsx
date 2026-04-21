import Link from 'next/link';

interface WaitingRoomPlayerProps {
  nickname: string;
}

export function WaitingRoomPlayer({ nickname }: WaitingRoomPlayerProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-mln-dark px-4 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mln-red/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-64 rounded-full bg-mln-gold/5 blur-3xl" />
      </div>

      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <Link
          href="/tham-gia"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs font-bold uppercase tracking-wide text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
        >
          ← Quay lại
        </Link>
      </div>

      <section className="mln-frame w-full max-w-md p-8 text-center animate-fade-in">
        {/* Pulsing star indicator */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="relative flex size-16 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full bg-mln-red/15 animate-ping"
              style={{ animationDuration: '2s' }}
            />
            <span className="relative text-3xl text-mln-gold animate-star-pulse">
              ★
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="size-1.5 animate-bounce rounded-full bg-mln-red"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="size-1.5 animate-bounce rounded-full bg-mln-gold"
              style={{ animationDelay: '160ms' }}
            />
            <span
              className="size-1.5 animate-bounce rounded-full bg-mln-red"
              style={{ animationDelay: '320ms' }}
            />
          </div>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mln-dim">
          Thí sinh
        </p>
        <div className="mx-auto mt-3 w-fit overflow-hidden rounded-2xl border border-mln-red/30 bg-linear-to-br from-mln-red/20 to-mln-red/5 px-8 py-4 text-center ring-1 ring-mln-red/15">
          <p className="text-2xl font-extrabold uppercase tracking-wide text-white">
            {nickname}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-white/8 bg-white/4 px-5 py-3">
          <p className="text-sm font-semibold text-mln-dim">
            Đang chờ giám thị khai mạc kỳ thi…
          </p>
        </div>

        <blockquote className="mt-5 rounded-xl border border-mln-gold/20 bg-mln-gold/5 p-4 text-left">
          <p className="text-xs italic text-mln-dim/80 leading-relaxed">
            &ldquo;Học, học nữa, học mãi.&rdquo;
          </p>
          <cite className="mt-1.5 block text-[10px] not-italic font-bold uppercase tracking-widest text-mln-gold/70">
            — V.I. Lê-nin
          </cite>
        </blockquote>
      </section>
    </main>
  );
}
