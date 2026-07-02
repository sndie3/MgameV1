
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

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
    return (
        <>
            <section className="flex-1  bg-black flex flex-col items-center justify-center text-white px-6">
                {/* Provider Logos */}
                <div className=" flex flex-col items-center">
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
                        {providers.map((provider) => (
                            <img
                                key={provider.name}
                                src={provider.logo}
                                alt={provider.name}
                                className={`object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:opacity-100 ${
                                    provider.name === "Pragmatic Play" ||
                                    provider.name === "Victory Ark"
                                    ? "h-16 md:h-20"
                                    : "h-8 md:h-10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-[clamp(0.5rem,4vw,1.5rem)] font-semibold mt-10">
                    PinoyMGame.ph
                </h1>

                {/* Subtitle */}
                <p className="mt-1 text-[clamp(1rem,3vw,2rem)] italic text-gray-200 text-center font-light">
                    "The architect of New Life Entertainment"
                </p>

                {/* Button */}
                <button
                    className="
          mt-14
            rounded-full
            border
            border-gray-700
            bg-[#111]
            px-10
            py-2.5
            text-base
            font-medium
            tracking-wide
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:scale-105
            hover:border-white
            hover:bg-white
            hover:text-black
            cursor-pointer
        "
                    onClick={() => navigate("/disclaimer")}
                >
                    Start your journey
                </button>
            </section>
        </>
    )
}

export default Home