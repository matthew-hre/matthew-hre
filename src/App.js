import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Socials from "./pages/Socials";
import Games from "./pages/Games";
import Projects from "./pages/Projects";
import Learning from "./pages/Learning";
import NoPage from "./pages/NoPage";
import Orwell from "./pages/Orwell.js";
import BandPosters from "./pages/BandPosters.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="socials" element={<Socials />} />
          <Route path="games" element={<Games />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="learning" element={<Learning />} />
          <Route path="1984" element={<Orwell />} />
          <Route path="band-posters" element={<BandPosters />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
