import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
