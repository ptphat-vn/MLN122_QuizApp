'use client';

import { use, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';

import { WaitingRoomHost } from '@/components/host/WaitingRoomHost';
import { WaitingRoomPlayer } from '@/components/player/WaitingRoomPlayer';
import { useHostGame } from '@/hooks/useHostGame';
import { useSocket } from '@/hooks/useSocket';
import { usePlayerStore } from '@/stores/playerStore';

interface RoomWaitingPageProps {
  params: Promise<{ roomCode: string }>;
  searchParams: Promise<{
    mode?: string;
    nickname?: string;
    sessionId?: string;
  }>;
}

function HostWaitingRoom({
  roomCode,
  sessionId,
}: {
  roomCode: string;
  sessionId: string;
}) {
  const router = useRouter();
  const { players, gameStatus, startGame } = useHostGame(sessionId);
  const joinUrl = useSyncExternalStore(
    () => () => {},
    () => `${window.location.origin}/tham-gia`,
    () => '/tham-gia',
  );

  useEffect(() => {
    if (gameStatus === 'starting' || gameStatus === 'question') {
      router.replace(
        `/phong/${roomCode}/game?mode=host&sessionId=${sessionId}`,
      );
    }
  }, [gameStatus, roomCode, sessionId, router]);

  return (
    <WaitingRoomHost
      roomCode={roomCode}
      joinUrl={joinUrl}
      players={players}
      onStartGame={startGame}
    />
  );
}

function PlayerWaitingRoom({
  roomCode,
  nickname,
}: {
  roomCode: string;
  nickname: string;
}) {
  const router = useRouter();
  const { socket } = useSocket();
  const { setPin, setNickname } = usePlayerStore();

  useEffect(() => {
    setPin(roomCode);
    setNickname(nickname);
  }, [roomCode, nickname, setPin, setNickname]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('player:join_room', { pin: roomCode, nickname });

    const handleStarted = () => {
      router.replace(
        `/phong/${roomCode}/game?nickname=${encodeURIComponent(nickname)}`,
      );
    };

    socket.on('game:started', handleStarted);
    return () => {
      socket.off('game:started', handleStarted);
    };
  }, [socket, roomCode, nickname, router]);

  return <WaitingRoomPlayer nickname={nickname} />;
}

export default function RoomWaitingPage({
  params,
  searchParams,
}: RoomWaitingPageProps) {
  const { roomCode } = use(params);
  const query = use(searchParams);
  const mode = query.mode || 'player';
  const nickname = query.nickname || 'Người chơi';
  const sessionId = query.sessionId || '';

  if (mode === 'host') {
    return <HostWaitingRoom roomCode={roomCode} sessionId={sessionId} />;
  }

  return <PlayerWaitingRoom roomCode={roomCode} nickname={nickname} />;
}
