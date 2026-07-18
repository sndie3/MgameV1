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
                    <p className='text-xl'>Hello Roger,</p>
                    <span className='text-gray-500 text-lg'>Fully Verified</span>
                </div>
                <p className='text-justify'>Welcome to MGame.ph, your trusted online gaming and entertainment platform.
                </p>
                <br />
                <p>This quick guide will show you how to use the app and make the most of its features. We are committed to providing a safe, secure, and enjoyable gaming experience while promoting Responsible Gaming.</p>
                <br />
                <br />
                <p>Let's Get Started!</p>
                <br />
                <br />
                <div className="relative">
                    <p>Sincerely, </p>
                    <p>The MGame.ph Team</p>
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