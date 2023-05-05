import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Layout from "./pages/Layout.js";
import NoPage from "./pages/NoPage.js";

// General
import Home from "./pages/general/Home.js";
import About from "./pages/general/About.js";
import Socials from "./pages/general/Socials.js";
import Contact from "./pages/general/Contact.js";

// Resume
import Resume from "./pages/resume/Resume.js";

// Games
import Games from "./pages/games/Games.js";

// Projects
import Projects from "./pages/projects/Projects.js";
import CalgaryHacks from "./pages/projects/CalgaryHacks";

// Learning
import Learning from "./pages/learning/Learning.js";
import CoinProblem from "./pages/learning/CoinProblem.js";

// Design
import Orwell from "./pages/design/Orwell.js";
import BandPosters from "./pages/design/BandPosters.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="socials" element={<Socials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resume" element={<Resume />} />
          <Route path="games" element={<Games />} />
          <Route path="projects" element={<Projects />} />
          <Route path="calgary-hacks" element={<CalgaryHacks />} />
          <Route path="learning" element={<Learning />} />
          <Route path="1984" element={<Orwell />} />
          <Route path="band-posters" element={<BandPosters />} />
          <Route path="coin-problem" element={<CoinProblem />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
