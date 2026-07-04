import AppRoutes from "../routes/AppRoute"
import './App.css'
import { ModalProvider } from "../context/ModalContext"
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
