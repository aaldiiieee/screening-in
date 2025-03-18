import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import ProtectedRoute from "@/components/modules/ProtectedRoutes";

function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/authenticate" element={<AuthPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/analyze-resume" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
