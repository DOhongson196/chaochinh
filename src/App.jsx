import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaArrowUp, FaHeart } from "react-icons/fa";
import "./index.css";
import bgImage from "./assets/background.jpg";
import Image1 from "./assets/anh1.jpg";
import Image2 from "./assets/anh2.jpg";
import Image3 from "./assets/anh3.jpg";
import met1 from "./assets/anhbia1.jpg";
import met2 from "./assets/anhbia2.jpg";
import met3 from "./assets/anhbia3.jpg";
import videoSrc from "./assets/video.mp4";
import musicSrc from "./assets/music.mp3";

function App() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hearts, setHearts] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();
    audio.loop = true;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      const newHearts = Array.from({
        length: Math.floor(Math.random() * 6) + 10,
      }).map(() => ({
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 3, // 0–3s delay
      }));

      setHearts((prev) => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts((prev) =>
          prev.filter((h) => !newHearts.find((nh) => nh.id === h.id))
        );
      }, 7000);
    }, 4000);

    // Auto play video when visible
    const video = videoRef.current;
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.5 }
    );
    if (video) {
      videoObserver.observe(video);
    }

    // Replay video after 3s
    let timeoutId;
    const handleVideoEnded = () => {
      timeoutId = setTimeout(() => {
        video.play().catch(() => {});
      }, 3000);
    };
    if (video) {
      video.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      if (video) {
        videoObserver.disconnect();
        video.removeEventListener("ended", handleVideoEnded);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative min-h-screen text-center text-gray-700 bg-gradient-to-b from-white via-pink-50 to-primary font-cursive overflow-hidden">
      <audio ref={audioRef} src={musicSrc} preload="auto" />

      <button
        onClick={toggleMusic}
        className="fixed top-1/3 left-4 z-50 p-3 rounded-full 
             bg-white bg-opacity-80 border border-pink-200 
             shadow-md hover:scale-110 transition 
             backdrop-blur-sm"
      >
        {playing ? (
          <FaPause className="text-pink-400" />
        ) : (
          <FaPlay className="text-pink-400" />
        )}
      </button>
      {/* Header - Hồng Sơn & Thu Thảo */}
      <div className="py-10 px-4 flex flex-col items-center text-black relative">
        {/* Heart particles - tuỳ chọn */}

        <h1 className="text-4xl sm:text-5xl font-cursive font-semibold animate-fade-in z-10">
          Hồng Sơn <span className="mx-2 text-2xl sm:text-4xl">&</span> Thu Thảo
        </h1>

        <p
          className="mt-2 text-2xl sm:text-4xl text-pink-500 italic font-cursive animate-fade-in z-10"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          Love Story!!
        </p>

        <hr className="mt-4 border-t-2 border-pink-100 w-1/2 max-w-xs opacity-70 z-10" />
      </div>

      {/* Gặp lần đầu */}
      <div className="py-8 px-4 flex flex-col items-center text-black to-white rounded-xl shadow-inner">
        <h2
          className="text-3xl sm:text-4xl font-cursive font-semibold mb-8 text-center animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          The Day We First Met
        </h2>

        {/* Dải ảnh - Cuộn ngang mobile */}
        <div className="w-full max-w-6xl overflow-x-auto">
          <div className="flex flex-nowrap gap-4 sm:gap-6 justify-start sm:justify-center items-stretch px-1 sm:px-0">
            {[
              { img: met1, day: "24" },
              { img: met2, day: "01" },
              { img: met3, day: "25" },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl border-4 border-pink-200 shadow-xl w-[200px] h-[320px] sm:w-64 sm:h-[440px] group shrink-0 bg-white"
              >
                <img
                  src={item.img}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-in-out"
                />

                {/* Nền trắng + ngày */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[28%] bg-white/90 backdrop-blur-sm flex justify-center items-center animate-slide-up-fade"
                  style={{
                    animationDelay: `${0.4 + index * 0.3}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <span className="text-4xl sm:text-5xl font-handwriting text-pink-500 drop-shadow-sm">
                    {item.day}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* image */}
      <div className="py-5 px-4 flex justify-center">
        <div className="bg-pink-50 rounded-2xl shadow-xl px-6 py-8 w-full max-w-6xl flex flex-col items-center gap-6">
          {/* TIÊU ĐỀ */}
          <h2
            className="text-3xl md:text-4xl font-semibold text-center text-gray-800 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Our First Trip Together
          </h2>

          {/* DẢI ẢNH */}
          <div className="w-full flex flex-col md:flex-row gap-4 items-center md:items-stretch animate-fade-in-delay-long">
            {/* ẢNH LỚN BÊN TRÁI */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-[66vh] overflow-hidden rounded-xl shadow-md group">
              <img
                src={Image1}
                alt="Main"
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-105"
              />
            </div>

            {/* 2 ẢNH NHỎ BÊN PHẢI */}
            <div className="w-full md:w-1/3 h-[50vh] md:h-[66vh] flex flex-col gap-4 justify-between">
              <div className="h-1/2 overflow-hidden rounded-xl shadow-md group">
                <img
                  src={Image2}
                  alt="Small 1"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="h-1/2 overflow-hidden rounded-xl shadow-md group">
                <img
                  src={Image3}
                  alt="Small 2"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] ease-in-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* love */}
      <div className="px-3 my-12 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-6xl flex flex-col md:flex-row gap-6 items-center md:items-stretch">
          {/* LỊCH BÊN TRÁI */}
          <div className="w-full max-w-[220px] md:w-[220px] flex justify-center items-center">
            <div className="bg-white rounded-xl p-3 shadow w-full text-xs">
              <h2 className="text-sm font-medium text-center text-gray-600 mb-1">
                Our First Day of Love
              </h2>
              <h2 className="text-lg font-semibold text-center mb-4 text-pink-600">
                March 2025
              </h2>

              {/* Header các ngày */}
              <div className="grid grid-cols-7 text-[10px] sm:text-xs text-gray-600 mb-2 text-center">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div className="text-pink-600">Sun</div>
              </div>

              {/* Ngày trong tháng */}
              <div className="grid grid-cols-7 text-center text-gray-800 gap-y-1 text-xs">
                <div></div>
                <div></div>
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const isSunday = (i + 2) % 7 === 0;
                  const isSpecial = day === 16;

                  return (
                    <div
                      key={day}
                      className={`relative ${isSunday ? "text-pink-500" : ""}`}
                    >
                      {isSpecial ? (
                        <div className="relative inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                          <svg
                            className="absolute w-full h-full text-pink-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 21.35l-1.45-1.32C5.4 15.36 2 
                          12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 
                          3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 
                          16.5 3 19.58 3 22 5.42 22 
                          8.5c0 3.78-3.4 6.86-8.55 
                          11.54L12 21.35z"
                            />
                          </svg>
                          <span className="absolute text-white text-xs font-semibold">
                            {day}
                          </span>
                        </div>
                      ) : (
                        <span>{day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* VIDEO BÊN PHẢI */}
          <div className="w-full flex-1">
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              controls={false}
              autoPlay
              loop
              className="w-full max-h-[60vh] rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>

      {/* continue */}
      <div className="mt-10 px-4 pb-12">
        <div className="max-w-2xl mx-auto text-center bg-white bg-opacity-80 p-6 rounded-xl shadow-lg animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-4">
            Our love story is still being written...
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Will you continue this journey with me?
          </p>

          <div className="mt-6 flex justify-center items-center gap-3">
            <FaHeart className="text-pink-400 animate-bounce text-3xl" />
            <FaHeart className="text-pink-400 animate-bounce text-4xl delay-200" />
            <FaHeart className="text-pink-400 animate-bounce text-3xl delay-400" />
          </div>

          {/* Hình ảnh kết thúc */}
          <div className="mt-4">
            <img
              src={bgImage}
              alt="Love story"
              className="w-3/4 max-h-[300px] object-contain rounded-xl mx-auto"
            />
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 z-50 bg-pink-300 hover:bg-pink-400 text-white p-2 rounded-full shadow-lg"
        >
          <FaArrowUp />
        </button>
      )}

      {hearts.map((heart) => (
        <FaHeart
          key={heart.id}
          className="absolute heart-fall text-pink-400"
          style={{
            top: 0,
            left: `${heart.left}%`,
            fontSize: `${heart.size}rem`,
            animationDelay: `${heart.delay}s`,
            zIndex: 40,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

export default App;
