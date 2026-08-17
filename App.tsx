import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

import Home from './src/pages/Home';
import NotFound from './src/pages/NotFound';

const Projects = lazy(() => import('./src/pages/Projects'));
const Contact = lazy(() => import('./src/pages/Contact'));

const App: React.FC = () => {
  return (
    <Theme appearance="dark" radius="large" scaling="100%">
      <Router>
        <Suspense
          fallback={
            <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#f0883e]/30 border-t-[#f0883e] rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}
        />
      </Router>
    </Theme>
  );
};

export default App;