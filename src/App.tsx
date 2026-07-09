import AppRoutes from "../routes/AppRoute"
import './App.css'
import { ModalProvider } from "../context/ModalContext"
import { useLastRoute } from "../hooks/useLastRoute"

// MAIN
function App() {
  useLastRoute()
  return (
    <main className="h-dvh ">
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </main>
  )
}

export default App
