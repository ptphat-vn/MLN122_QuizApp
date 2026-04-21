import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

import { Player } from '@/types';

interface WaitingRoomHostProps {
  roomCode: string;
  joinUrl: string;
  players: Player[];
  onStartGame: () => void;
}

export function WaitingRoomHost({
  roomCode,
  joinUrl,
  players,
  onStartGame,
}: WaitingRoomHostProps) {
  return (
    <main className="mx-auto grid min-h-screen w-[min(1100px,calc(100%-2rem))] gap-5 py-8 lg:grid-cols-2">
      <div className="lg:col-span-2 flex items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm font-bold text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
        >
          ← Dashboard
        </Link>
        <div className="mln-ink-badge">★ Phòng chờ thi</div>
      </div>

      {/* QR + PIN section */}
      <section className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 flex flex-col items-center justify-center gap-5 p-8">
        <div className="mln-top-bar" />
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mln-dim">
          Quét QR để tham gia
        </p>
        <div className="rounded-2xl border border-white/10 bg-mln-dark p-4 shadow-xl ring-1 ring-mln-red/15">
          <QRCodeSVG
            value={joinUrl}
            size={210}
            bgColor="#09090b"
            fgColor="#f4f4f5"
          />
        </div>
        {/* PIN */}
        <div className="w-full overflow-hidden rounded-2xl border border-mln-red/30 bg-linear-to-br from-mln-red/20 to-mln-red/5 p-5 text-center shadow-lg shadow-mln-red/15 ring-1 ring-mln-red/20">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            Mã PIN tham gia
          </p>
          <p className="mt-1.5 font-mono text-5xl font-extrabold tracking-[0.3em] text-white">
            {roomCode}
          </p>
        </div>
        <p className="text-center text-xs text-mln-dim">
          Truy cập{' '}
          <span className="font-semibold text-mln-cream">{joinUrl}</span>
        </p>
      </section>

      {/* Player list section */}
      <section className="overflow-hidden rounded-2xl border border-white/8 bg-black/35 flex flex-col p-6">
        <div className="mln-top-bar" />
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-mln-cream">
            Danh sách thí sinh
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-mln-red/30 bg-mln-red/15 px-3 py-1 text-sm font-extrabold text-mln-red">
            <span className="size-1.5 rounded-full bg-mln-red animate-ping" />
            {players.length}
          </span>
        </div>
        <p className="mt-1 text-xs text-mln-dim">
          Danh sách cập nhật realtime.
        </p>

        <div className="mt-4 flex-1 overflow-auto rounded-xl border border-white/6 bg-mln-dark/60 p-3">
          {players.length === 0 ? (
            <p className="p-4 text-center text-sm text-mln-dim">
              Chưa có thí sinh tham gia.
            </p>
          ) : (
            <div className="space-y-1.5">
              {players.map((player) => (
                <div
                  key={player.socketId}
                  className="flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/4 px-3 py-2.5 text-sm font-semibold text-mln-cream"
                >
                  <span className="text-mln-gold text-xs">★</span>
                  {player.nickname}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onStartGame}
          className="mt-5 w-full rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark py-3.5 font-extrabold uppercase tracking-widest text-white shadow-lg shadow-mln-red/30 transition hover:brightness-110 hover:shadow-mln-red/40"
        >
          ★ Bắt đầu kỳ thi
        </button>
      </section>
    </main>
  );
}
