import React, { useState, useRef, useEffect } from 'react';

const Confetti: React.FC = () => {
  const confettiCount = 100;
  const confetti = Array.from({ length: confettiCount }).map((_, i) => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };
    return <div key={i} className="confetti-piece" style={style}></div>;
  });

  return <div className="confetti-container">{confetti}</div>;
};

const App: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const urlParams = new URLSearchParams(window.location.search);
  const to = urlParams.get('to') || 'M Ibad';
  const message =
    urlParams.get('message') ||
    'Semoga di hari spesial ini, semua impianmu terwujud. 🎉';

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/birthday-song.mp3');
    }
  }, []);

  const handleCardClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000);
    }
  };

  const handlePlayAudio = () => {
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

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          overflow: hidden;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .card {
          width: 350px;
          height: 500px;
          background-color: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: transform 0.5s ease, box-shadow 0.3s ease;
          text-align: center;
          padding: 30px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .card.clicked {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
          color: #333;
          transform: translateY(0) scale(1);
          cursor: default;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .card-message h2 {
          font-size: 1.8em;
          color: #555;
          animation: pulse 1.5s infinite;
        }

        .card-content {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          padding-bottom: 20px;
        }

        .card-content.active {
          opacity: 1;
          transform: scale(1);
        }

        .birthday-image {
          max-width: 80%;
          max-height: 150px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        h1 {
          font-size: 2.2em;
          margin-bottom: 15px;
          color: #d63031;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
        }

        p {
          font-size: 1.1em;
          line-height: 1.6;
          color: #444;
          margin-bottom: 15px;
        }

        .balloons {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .balloon {
          position: absolute;
          width: 30px;
          height: 40px;
          border-radius: 50%;
          opacity: 0.8;
          animation: floatUp 10s infinite ease-in-out;
          transform: translateY(100vh);
        }

        .balloon.red { background-color: #e74c3c; left: 10%; animation-delay: 0s; }
        .balloon.blue { background-color: #3498db; left: 30%; animation-delay: 2s; }
        .balloon.green { background-color: #2ecc71; left: 50%; animation-delay: 4s; }
        .balloon.yellow { background-color: #f1c40f; left: 70%; animation-delay: 6s; }

        .audio-button {
          background-color: #ff6b6b;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 24px;
          margin-top: 20px;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        .audio-button:hover {
          background-color: #d63031;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .audio-button:active {
          transform: translateY(0);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 100;
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 16px;
          opacity: 0;
          animation: fall linear forwards;
        }

        @keyframes fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotateZ(0deg);
          }
          100% {
            opacity: 1;
            transform: translateY(100vh) rotateZ(720deg);
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateY(-100%) rotate(360deg); opacity: 0; }
        }

        @media (max-width: 768px) {
          .card {
            width: 90%;
            height: auto;
            min-height: 400px;
            padding: 20px;
            padding-bottom: 30px;
          }
          .card-content { justify-content: flex-start; padding-top: 10%; }
          .card-message h2 { font-size: 1.5em; }
          .audio-button { padding: 10px 20px; font-size: 0.9em; }
          h1 { font-size: 1.8em; }
          p { font-size: 1em; margin-bottom: 10px; }
          .birthday-image { max-width: 90%; max-height: 120px; }
        }
      `}</style>
      <div className="container">
        {showConfetti && <Confetti />}

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
              <h1>Selamat Ulang Tahun, {to}!</h1>
              <p>{message}</p>

              <div className="balloons">
                <div className="balloon red"></div>
                <div className="balloon blue"></div>
                <div className="balloon green"></div>
                <div className="balloon yellow"></div>
              </div>

              <button
                className="audio-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAudio();
                }}
              >
                {isPlaying ? 'Jeda ⏸️' : 'Putar Musik ▶️'}
              </button>
            </div>
          ) : (
            <div className="card-message">
              <h2>🎉 Klik untuk membuka pesan spesial 🎉</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
