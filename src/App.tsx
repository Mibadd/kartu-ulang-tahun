import React, { useState, useRef, useEffect } from 'react';

// --- Komponen untuk Confetti ---
const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 100 }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 4}s`,
      backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };
    return (
      <div
        key={i}
        className="absolute w-2 h-4 opacity-0 animate-fall"
        style={style}
      ></div>
    );
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
};

// --- Komponen untuk Balon ---
const Balloons: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute w-[35px] h-[45px] rounded-full bg-red-500 opacity-70 animate-floatUp" style={{ left: '10%', animationDelay: '0s' }}></div>
    <div className="absolute w-[35px] h-[45px] rounded-full bg-blue-500 opacity-70 animate-floatUp" style={{ left: '30%', animationDelay: '2s' }}></div>
    <div className="absolute w-[35px] h-[45px] rounded-full bg-green-500 opacity-70 animate-floatUp" style={{ left: '50%', animationDelay: '4s' }}></div>
    <div className="absolute w-[35px] h-[45px] rounded-full bg-yellow-400 opacity-70 animate-floatUp" style={{ left: '70%', animationDelay: '6s' }}></div>
    <div className="absolute w-[35px] h-[45px] rounded-full bg-purple-500 opacity-70 animate-floatUp" style={{ left: '85%', animationDelay: '8s' }}></div>
  </div>
);

// --- Komponen Utama Aplikasi ---
const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const urlParams = new URLSearchParams(window.location.search);
  const to = urlParams.get('to') || 'Sahabatku';
  const message =
    urlParams.get('message') ||
    'Semoga di hari spesial ini, semua impianmu terwujud. Selalu bahagia dan terus bersinar! 🎉';

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/birthday-song.mp3');
      audioRef.current.loop = true; // Membuat lagu berulang
    }
  }, []);

  const handleCardClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setShowConfetti(true);
      // Mainkan musik otomatis saat kartu dibuka
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Audio autoplay gagal:", error);
        });
        setIsPlaying(true);
      }
      setTimeout(() => setShowConfetti(false), 10000); // Durasi confetti lebih lama
    }
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Gagal memutar audio:", error);
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Menambahkan class ke body untuk background dan layout
  useEffect(() => {
    document.body.className = 'bg-gray-100 flex justify-center items-center h-screen font-sans overflow-hidden';
  }, []);

  return (
    <>
      <div className="flex justify-center items-center w-full h-full p-4 relative">
        {showConfetti && <Confetti />}

        <div
          className={`
            w-[380px] h-[550px]
            bg-white rounded-2xl shadow-lg 
            flex flex-col justify-center items-center 
            transition-all duration-700 ease-in-out
            text-center p-8 box-border relative overflow-hidden z-10
            ${isClicked
              ? 'bg-gradient-to-br from-yellow-100 to-pink-200 text-gray-800 scale-100 cursor-default shadow-2xl animate-bounceIn'
              : 'cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-2xl'
            }
          `}
          onClick={handleCardClick}
        >
          {isClicked ? (
            <div className="flex flex-col justify-center items-center h-full w-full">
              <img
                src="/images/birthday.gif"
                alt="Birthday Gif"
                className="w-48 h-48 rounded-full mb-6 shadow-lg object-cover"
              />
              <h1 className="text-4xl mb-4 text-pink-500 font-pacifico" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                Selamat Ulang Tahun, {to}!
              </h1>
              <p className="text-lg leading-relaxed text-gray-600 mb-6 px-4">
                {message}
              </p>

              <Balloons />

              <button
                className="bg-pink-500 text-white border-none rounded-full py-3 px-8 text-lg font-bold cursor-pointer
                           transition-all duration-300 ease-in-out shadow-md outline-none
                           hover:bg-pink-600 hover:-translate-y-1 hover:shadow-lg
                           active:translate-y-0 active:shadow-md"
                onClick={handlePlayAudio}
              >
                {isPlaying ? 'Jeda ⏸️' : 'Putar Musik ▶️'}
              </button>
            </div>
          ) : (
            <div className="animate-pulse">
              <h2 className="text-2xl text-gray-600 font-pacifico">💌 Klik untuk membuka</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;