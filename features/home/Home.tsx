import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProviderLogoCarousel from "./components/ProviderLogosCarousel"
import { PROVIDERS } from "../../constants/providers"
function Home() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);


    const videos = [
        "/assets/ads/manoy-1.flv",
        "/assets/ads/manoy-2.flv",
        "/assets/ads/manoy-3.flv",
        "/assets/ads/PLAYER-Lucky-Wallet.flv",
        "/assets/ads/PLAYER-Race-to-100.flv",
    ];

useEffect(() => {
    const video = videoRefs.current[currentVideo];

    if (!video) return;

    let player: any;

    const loadPlayer = async () => {
        const FlvJs = await import("flv.js");

        if (!FlvJs.default.isSupported()) return;

        player = FlvJs.default.createPlayer({
            type: "flv",
            url: videos[currentVideo],
        });

        player.attachMediaElement(video);
        player.load();
        player.play();
    };

    loadPlayer();

    return () => {
        player?.destroy();
    };

}, [currentVideo]);

    // useEffect(() => {
    //     videoRefs.current.forEach((video) => {
    //         if (!video) return;

    //         video.muted = !isOpen;
    //     });
    // }, [isOpen]);

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
            <div className="relative w-full min-h-screen overflow-hidden">

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

                    <div className="absolute bottom-0 h-40 z-10 w-full bg-black/50 px-4 py-2 text-white">
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={closeCarousel}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700"
                            >
                                <div className="h-10 w-10 rounded-full bg-blue-400 hover:bg-gray-300" />
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
                transition-transform duration-700 ease-in-out overflow-auto 
                ${isOpen ? "translate-y-full" : "translate-y-0"}            `}

                >
                    {/* Home Content */}
                    {/* Provider Logos */}
                    <ProviderLogoCarousel providers={PROVIDERS} />
                    {/* <div className="flex flex-col items-center ">
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 ">
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
                    </div> */}

                    <h1 className="text-[clamp(0.5rem,4vw,1.5rem)] font-semibold mt-10 ">
                        MGame.ph
                    </h1>

                    <p className="mt-2 text-[clamp(1rem,3vw,2rem)] italic text-gray-200 text-center font-light">
                        "The architect of New Life Entertainment"
                    </p>

                    <button
                        className="mt-14 rounded-full border border-gray-700 bg-[#111] px-10 py-2.5 text-white shadow-lg transition hover:scale-105 hover:border-white hover:bg-white hover:text-black"
                        onClick={() => navigate("/disclaimer")}
                    >
                        Start your journey
                    </button>

                    <div className="flex justify-center pt-5 ">
                        <button
                            onClick={openCarousel}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700"
                        >
                            <div
                                className={`h-10 w-10 rounded-full bg-gray-300 hover:bg-blue-400
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