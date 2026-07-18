import AppRoutes from "../routes/AppRoute"
import './App.css'
import { ModalProvider } from "../context/ModalContext"
import '../styles/animation.css'
// MAIN
function App() {
  return (
    <main className="h-dvh ">
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </main>
  )
}

export default App
