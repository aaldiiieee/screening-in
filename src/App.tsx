import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import AnalyzeResumePage from "@/pages/AnalyzeResumePage";
import ProtectedRoute from "@/components/modules/ProtectedRoutes";
import { useSession } from "./context/AuthContext";
import { IAuthContext } from "./types/context";

function App() {
  const { token } = useSession() as IAuthContext;

  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="authenticate" element={<AuthPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="analyze-resume" element={<AnalyzeResumePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
