import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AddQuestion from "./pages/AddQuestion";
import Subject from "./pages/Subject";
import { ThemeProvider } from "./theme/Themeprovides";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/:mode" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-question" element={<AddQuestion />} />
              <Route path="/subject/:id" element={<Subject />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
