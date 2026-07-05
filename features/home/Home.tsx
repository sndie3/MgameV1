import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
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
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            if (index === currentVideo) {
                video.currentTime = 0;
                video.play().catch(() => { });
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [currentVideo]);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (!video) return;

            video.muted = !isOpen;
        });
    }, []);

    // Open the Carousel and set Video Index to 0
    const openCarousel = () => {
        setIsOpen(true);
    };
    //Close the Carousel and set Video Index to 0
    const closeCarousel = () => {
        setIsOpen(false);
    };

    const nextVideo = () => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentVideo((prev) =>
            prev === 0 ? videos.length - 1 : prev - 1
        );
    };


    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isOpen) return;

        const x = e.targetTouches[0].clientX;
        setTouchStartX(x);
        setTouchEndX(x);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isOpen) return;

        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!isOpen) return;

        const distance = touchStartX - touchEndX;

        // Ignore taps
        if (Math.abs(distance) < 50) return;
        // swipe left
        if (distance > 0) {
            nextVideo();
        } else {
            // swipe right
            prevVideo();
        }
    };

    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">

                {/* Background Video */}
                <section
                    className="flex h-full w-full items-center justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {videos.map((src, index) => (
                        <video
                            key={src}
                            ref={(el) => {
                                videoRefs.current[index] = el;
                            }}
                            src={src}
                            preload="auto"
                            playsInline
                            muted={!isOpen}
                            onEnded={() => {
                                if (index === currentVideo) {
                                    nextVideo();
                                }
                            }}
                            className={`
                absolute
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
                ${index === currentVideo
                                    ? "opacity-100 z-10"
                                    : "opacity-0 pointer-events-none z-0"
                                }
            `}
                        />
                    ))}

                    <div className="absolute bottom-0 h-20 z-10 w-full bg-black/50 px-4 py-2 text-white backdrop-blur-md">
                        <div className="flex justify-center">
                            <button
                                onClick={closeCarousel}
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700"
                            >
                                <div className="h-6 w-6 rounded-full bg-blue-400 hover:bg-gray-300" />
                            </button>
                        </div>
                    </div>
                    {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
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

                {/* HOME */}
                <section
                    className={`
                absolute inset-0 z-10
                origin-top flex-1 min-h-screen bg-black flex flex-col items-center justify-center text-white px-6
                transition-transform duration-700 ease-in-out 
                ${isOpen ? "scale-y-0" : "scale-y-100"}
            `}

                >
                    {/* Home Content */}

                    {/* Provider Logos */}
                    <div className="flex flex-col items-center ">
                        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 ">
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
                                className={`h-6 w-6 rounded-full bg-gray-300 hover:bg-blue-400
                                }`}
                            />
                        </button>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Home;