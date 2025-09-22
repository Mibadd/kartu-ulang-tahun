import React, { useState, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Gunakan useRef untuk membuat objek Audio hanya sekali
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi audio object di luar render loop, di dalam fungsi
  // yang hanya berjalan sekali saat komponen di-mount
  if (audioRef.current === null) {
    audioRef.current = new Audio('/audio/birthday-song.mp3');
  }

  const handleCardClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const handlePlayAudio = () => {
    // Pastikan audioRef.current ada sebelum memanggil metode
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="container">
      <div
        className={`card ${isClicked ? 'clicked' : ''}`}
        onClick={handleCardClick}
      >
        {isClicked ? (
          <div className="card-content active">
            <img
              src="/images/birthday.gif"
              alt="Birthday Gif"
              className="birthday-image"
            />
            <h1>Selamat Ulang Tahun, M Ibad!</h1>
            <p>Semoga di hari spesial ini, semua impianmu terwujud. 🎉</p>
            <div className="balloons">
              <div className="balloon red"></div>
              <div className="balloon blue"></div>
              <div className="balloon green"></div>
              <div className="balloon yellow"></div>
            </div>
            {/* Tambahkan tombol Play/Pause */}
            <button
              className="audio-button"
              onClick={(e) => {
                e.stopPropagation(); // Mencegah klik kartu
                handlePlayAudio();
              }}
            >
              {isPlaying ? 'Pause ⏸️' : 'Play ▶️'}
            </button>
          </div>
        ) : (
          <div className="card-message">
            <h2>🎉 Klik untuk membuka pesan spesial 🎉</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
