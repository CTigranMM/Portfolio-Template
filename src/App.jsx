import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import ExperienceDetails from './pages/ExperienceDetails';
import Marketing from './pages/Marketing';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/marketing" element={<Marketing />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
