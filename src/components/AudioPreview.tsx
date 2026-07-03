"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface AudioPreviewProps {
  src: string;
  title: string;
  duration?: string;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPreview({ src, title, duration }: AudioPreviewProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [seeking, setSeeking] = useState(false);

  // Sync volume to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setTotalDuration(audio.duration);
      setLoaded(true);
      setError(false);
    };

    const onTimeUpdate = () => {
      if (!seeking) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => {
      setError(true);
      setPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [seeking]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || error) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setError(true);
      });
    }
  }, [playing, error]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressRef.current;
      if (!audio || !bar || !loaded) return;

      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = ratio * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [loaded]
  );

  const handleProgressKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio || !loaded) return;

      const step = 5; // seconds
      if (e.key === "ArrowRight") {
        e.preventDefault();
        audio.currentTime = Math.min(audio.duration, audio.currentTime + step);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - step);
      }
    },
    [loaded]
  );

  // Mouse drag on progress bar
  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setSeeking(true);
      handleProgressClick(e);

      const onMouseMove = (ev: MouseEvent) => {
        const bar = progressRef.current;
        const audio = audioRef.current;
        if (!bar || !audio) return;
        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
        const newTime = ratio * audio.duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      };

      const onMouseUp = () => {
        setSeeking(false);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [handleProgressClick]
  );

  const progressPercent =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const displayDuration =
    totalDuration > 0 ? formatTime(totalDuration) : duration || "--:--";

  return (
    <div
      className="w-full rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] overflow-hidden"
      role="region"
      aria-label={`Audio player: ${title}`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-3">
        {/* Top row: play button + title + equalizer */}
        <div className="flex items-center gap-3">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            disabled={error}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-[#c8a930]/40 bg-[#c8a930]/10 flex items-center justify-center text-[#c8a930] hover:bg-[#c8a930]/20 hover:border-[#c8a930] focus:outline-none focus:ring-2 focus:ring-[#c8a930]/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              /* Pause icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="3" y="2" width="4" height="12" rx="1" />
                <rect x="9" y="2" width="4" height="12" rx="1" />
              </svg>
            ) : (
              /* Play icon */
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4 2.5a.5.5 0 0 1 .77-.42l9 5.5a.5.5 0 0 1 0 .84l-9 5.5A.5.5 0 0 1 4 13.5v-11z" />
              </svg>
            )}
          </button>

          {/* Title + subtitle */}
          <div className="flex-grow min-w-0">
            <p className="text-sm text-zinc-100 font-medium truncate">
              {title}
            </p>
            {error ? (
              <p className="text-[10px] font-mono text-[#71717a] tracking-wider">
                AUDIO UNAVAILABLE
              </p>
            ) : (
              <p className="text-[10px] font-mono text-[#71717a] tracking-wider">
                {playing ? "NOW PLAYING" : loaded ? "READY" : "LOADING"}
              </p>
            )}
          </div>

          {/* Equalizer bars — only visible when playing */}
          <div
            className="flex-shrink-0 flex items-end gap-[3px] h-5"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  backgroundColor: playing ? "#c8a930" : "#2a2a3a",
                  height: playing ? undefined : "4px",
                  animation: playing
                    ? `eq-bar 0.${6 + i * 1}s ease-in-out infinite alternate`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#71717a] w-10 text-right flex-shrink-0 tabular-nums">
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressRef}
            className="flex-grow relative h-2 bg-[#1a1a24] rounded-full cursor-pointer group"
            role="slider"
            aria-label="Audio progress"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(totalDuration)}
            aria-valuetext={`${formatTime(currentTime)} of ${displayDuration}`}
            tabIndex={0}
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
            onKeyDown={handleProgressKeyDown}
          >
            {/* Track fill */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c8a930] to-[#d4a020] rounded-full transition-[width] duration-75"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#c8a930] rounded-full shadow-[0_0_6px_rgba(200,169,48,0.4)] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progressPercent}% - 6px)` }}
            />
          </div>

          <span className="text-[10px] font-mono text-[#71717a] w-10 flex-shrink-0 tabular-nums">
            {displayDuration}
          </span>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setMuted((m) => !m)}
            className="text-[#71717a] hover:text-[#c8a930] transition-colors focus:outline-none focus:text-[#c8a930]"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (v > 0 && muted) setMuted(false);
            }}
            className="audio-volume-slider w-16 sm:w-20 h-1 appearance-none bg-[#1a1a24] rounded-full cursor-pointer accent-[#c8a930]"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Equalizer keyframes injected as scoped style */}
      <style jsx>{`
        @keyframes eq-bar {
          0% {
            height: 4px;
          }
          100% {
            height: 18px;
          }
        }

        .audio-volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #c8a930;
          cursor: pointer;
          border: none;
        }

        .audio-volume-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #c8a930;
          cursor: pointer;
          border: none;
        }

        .audio-volume-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 2px;
          background: #1a1a24;
        }

        .audio-volume-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background: #1a1a24;
        }
      `}</style>
    </div>
  );
}
