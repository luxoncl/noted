import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { Home, About, Projects, Contact } from "./Pages";
import Home from "./Pages/Home";
import About from "./Pages/About";
// import Projects from "./Pages/";
// import About from "./Pages/About";
const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Router>
    </main>
  );
};

export default App;
