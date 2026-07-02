
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const providers = [
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
        {
            name: "EPT",
            logo: "/assets/ept.png",
        },
    ];
    return (
        <>
            <section className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
                {/* Provider Logos */}
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mb-15">
                    {providers.map((provider) => (
                        <img
                            key={provider.name}
                            src={provider.logo}
                            alt={provider.name}
                            className="h-12 md:h-16 object-contain opacity-95"
                        />
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-semibold">
                    PinoyMGame.ph
                </h1>

                {/* Subtitle */}
                <p className="mt-8 text-lg md:text-4xl italic text-gray-200 text-center font-light">
                    "The architect of New Life Entertainment"
                </p>

                {/* Button */}
                <button
                    className="
          mt-16
          px-10
          py-4
          rounded-full
          border
          border-gray-700
          bg-[#111]
          hover:bg-[#1a1a1a]
          transition
          text-lg
          font-light
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