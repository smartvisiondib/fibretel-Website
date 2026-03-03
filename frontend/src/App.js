import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import TariffPlans from "@/pages/TariffPlans";
import NewConnection from "@/pages/NewConnection";
import ContactUs from "@/pages/ContactUs";
import MyServices from "@/pages/MyServices";

function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<TariffPlans />} />
            <Route path="/new-connection" element={<NewConnection />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/services" element={<MyServices />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
