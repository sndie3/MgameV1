import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Footer from '../../components/common/Footer'

function HowToUse() {
    const route = useNavigate()

    return (
        <div className="min-h-screen text-white flex flex-col font-bahnschrift px-3">
            <div
                className="rounded-t-[32px] pt-6 pb-2"
                style={{ backgroundColor: "var(--background-color)" }}
            >
                <div className="flex items-center">
                    <div className="w-12">
                        <button
                            onClick={() => route("/dashboard")}
                            className="h-12 w-12 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ backgroundColor: "var(--button-color)" }}
                        >
                            <ArrowLeft size={20} className="text-white" />
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-[24px] font-semibold">How to Use</h1>
                    </div>
                    <div className="w-12" />
                </div>
            </div>
            <div className='flex flex-col text-xl flex-1'>
                <div className='flex flex-col py-5'>
                    <p className='text-xl'>Name nako</p>
                    <span className='text-gray-500 text-lg'>Verified gamay</span>
                </div>
                <p className='text-justify'>Welcome to MGame.ph , you are now about to experience on how to use this site of entertainment designed to our beloved Players, you will experience the luxury of Gaming Responsibly.</p>
                <br />
                <p>Enjoy Watching!</p>
                <br />
                <br />
                <p>Yours truly,</p>
                <br />
                <br />
                <div className="relative">
                    <p>MGame</p>
                    <img
                        src="/assets/icons/manoy1.png"
                        alt="manoy-gamay"
                        className="block mx-auto mt-2 w-15 h-auto"
                    />
                </div>
                <div className='py-5'>
                    <Button variant='secondary'>
                        Explore Now
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default HowToUse