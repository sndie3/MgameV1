import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Support() {
    const route = useNavigate()
    return (
        <div className="min-h-screen text-white flex flex-col">
            <div className="rounded-t-[32px] px-3 pt-6 pb-2 relative z-10" style={{ backgroundColor: 'var(--background-color)' }}>
                <div className="flex items-center mb-5 justify-between">
                    <button
                        onClick={() => { route('/dashboard') }}
                        className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--button-color)' }}
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-[24px] font-semibold ">Support</h1>
                    <div>
                        <img src="/assets/icons/invite.png" alt="icon" className="w-7 h-7" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-red-800 py-3 flex justify-center">
                <p className="font-bold text-lg">GAME</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-2 ">
                <button className="py-4 text-sm font-semibold hover:opacity-80" style={{ backgroundColor: 'var(--button-color)' }}>
                    SUPPORT
                </button>
                <button className="py-4 text-sm font-semibold hover:opacity-80" style={{ backgroundColor: 'var(--button-color)' }}>
                    CONTACTS
                </button>
                <button className="py-4 text-sm font-semibold hover:opacity-80" style={{ backgroundColor: 'var(--button-color)' }}>
                    CHAT
                </button>
            </div>
            <div className="w-full bg-red-800 py-3 my-2 flex justify-center">
                <p className="font-bold text-lg">GAME</p>
            </div>
        </div>




    )
}

export default Support  