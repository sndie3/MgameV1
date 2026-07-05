import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [showCarousel, setShowCarousel] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [mouseDownX, setMouseDownX] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const providers = [
        {
            name: "EPT",
            logo: "/assets/ept.png",
        },
        {
            name: "Pragmatic Play",
            logo: "/assets/pragmatic.png",
        },
        {
            name: "Victory Ark",
            logo: "/assets/va_gaming.png",
        },
        {
            name: "Realtime Gaming",
            logo: "/assets/realtime_gaming.png",
        },
        {
            name: "JILI",
            logo: "/assets/jili.png",
        },
    ];

    const videos = [
        "/assets/video1.mp4",
        "/assets/video2.mp4",
    ];

    useEffect(() => {
        if (!showCarousel) return;

        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === currentVideo) {
                video.currentTime = 0;

                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [currentVideo, showCarousel]);

    // Open the Carousel and set Video Index to 0
    const openCarousel = () => {
        setCurrentVideo(0);
        setShowCarousel(true);

        requestAnimationFrame(() => {
            setIsOpen(true);
        });
    };

    //Close the Carousel and set Video Index to 0
    const closeCarousel = () => {
        videoRefs.current.forEach((video) => {
            if (!video) return;

            video.pause();
            video.currentTime = 0;
        });
        setIsOpen(false);

        setTimeout(() => {
            setShowCarousel(false);
            setCurrentVideo(0);
        }, 500);
    };

    const nextVideo = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentVideo((prev) =>
            prev === 0 ? videos.length - 1 : prev - 1
        );
    };

    const handleSwipe = () => {
        const distance = touchStartX - touchEndX;
        // Left Swipe
        if (distance > 50) {
            nextVideo();
        }
        // Right Swaipe
        if (distance < -50) {
            prevVideo();
        }
    };
    return (
        <>
            {/* HOME */}
            <section className="flex-1 min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">

                {/* Provider Logos */}
                <div className="flex flex-col items-center">
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
                        {providers.map((provider) => (
                            <img
                                key={provider.name}
                                src={provider.logo}
                                alt={provider.name}
                                className={`object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 ${provider.name === "Pragmatic Play" ||
                                    provider.name === "Victory Ark"
                                    ? "h-16 md:h-20"
                                    : "h-8 md:h-10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <h1 className="text-[clamp(0.5rem,4vw,1.5rem)] font-semibold mt-10">
                    MGame.ph
                </h1>

                <p className="mt-1 text-[clamp(1rem,3vw,2rem)] italic text-gray-200 text-center font-light">
                    "The architect of New Life Entertainment"
                </p>

                <button
                    className="mt-14 rounded-full border border-gray-700 bg-[#111] px-10 py-2.5 text-white shadow-lg transition hover:scale-105 hover:border-white hover:bg-white hover:text-black"
                    onClick={() => navigate("/disclaimer")}
                >
                    Start your journey
                </button>

                <div className="flex justify-center pt-10 ">
                    <button
                        onClick={openCarousel}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700"
                    >
                        <div
                            className={`h-6 w-6 rounded-full bg-gray-300
                                }`}
                        />
                    </button>
                </div>
            </section>

            {/* VIDEO SCREEN  */}
            {showCarousel && (
                <section
                    onTouchStart={(e) => setTouchStartX(e.targetTouches[0].clientX)}
                    onTouchMove={(e) => setTouchEndX(e.targetTouches[0].clientX)}
                    onTouchEnd={handleSwipe}
                    onMouseDown={(e) => setMouseDownX(e.clientX)}
                    onMouseUp={(e) => {
                        const distance = mouseDownX - e.clientX;

                        if (distance > 50) nextVideo();
                        if (distance < -50) prevVideo();
                    }}
                    className={`fixed inset-0 z-50 bg-black transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"
                        }`}
                >
                    <div className="flex h-full w-full items-center justify-center">
                        {videos.map((video, index) => (
                            <video
                                key={video}
                                ref={(el) => {
                                    videoRefs.current[index] = el;
                                }}
                                src={video}
                                preload="auto"
                                playsInline
                                onEnded={() => {
                                    if (currentVideo === index) {
                                        nextVideo();
                                    }
                                }}
                                className={`absolute
                                h-full
                                w-full
                                object-cover
                                transition-opacity
                                duration-500
                                md:h-auto
                                md:max-h-[90vh]
                                md:w-auto
                                md:max-w-7xl
                                md:rounded-xl
                                ${currentVideo === index
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                    <div className="absolute bottom-0 h-20 md:bottom w-full z-20 bg-black/50 px-4 py-2 text-white backdrop-blur-md  hover:text-black transition" >
                        <div className="flex justify-center">
                            <button onClick={closeCarousel} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700" >
                                <div
                                    className={`h-6 w-6 rounded-full bg-blue-400
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* <div
                            className={`h-6 w-6 rounded-full ${collapsed ? "bg-blue-400" : "bg-gray-300"
                                }`}
                        /> */}

                    {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {videos.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${currentVideo === index
                                        ? "w-8 bg-white"
                                        : "w-2 bg-white/50"
                                    }`}
                            />
                        ))}
                    </div> */}
                </section>
            )}
        </>
    );
}

export default Home;