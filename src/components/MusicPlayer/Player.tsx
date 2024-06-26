import React, { useRef, useEffect } from 'react';

interface PlayerProps {
  activeSong: any | null;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  currentIndex?: number;
  onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement, Event>) => void;
  onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement, Event>) => void;
  repeat: boolean;
}

const Player:React.FC<PlayerProps> = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const audioSrcRef = useRef<HTMLAudioElement>(null);
  // eslint-disable-next-line no-unused-expressions
  if (audioSrcRef.current) {
    if (isPlaying) {
      audioSrcRef.current.play();
    } else {
      audioSrcRef.current.pause();
    }
  }

  useEffect(() => {
    if(audioSrcRef.current)
    audioSrcRef.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if(audioSrcRef.current)
    audioSrcRef.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri || activeSong?.hub?.options[0]?.actions[0].uri || activeSong?.hub?.options[0]?.actions[1].uri}
      ref={audioSrcRef}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
