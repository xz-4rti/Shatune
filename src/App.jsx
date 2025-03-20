import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="top-header">
          <div className="user-circle">
            <div className="circle"></div>
          </div>
        </header>

        <main className="main-content">
          <Sidebar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

