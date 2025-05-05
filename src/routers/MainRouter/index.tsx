import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Home } from '../../pages/Home';

import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';

import { useEffect } from 'react';
import { History } from '../../pages/History';

import { Settings } from '../../pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
      <BrowserRouter> {/* Permite utilizar o React Router aqui */}
        <Routes> {/* Grupo de rotas */}
          <Route path='/' element={<Home />} /> {/* path (href): rota; element: o que carregar */}
          <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
          <Route path='/settings/' element={<Settings />} />
          <Route path='/history/' element={<History />} />
          <Route path='*' element={<NotFound />} /> {/* path='*' (todas as rotas) */}
        </Routes>
        <ScrollToTop />
    </BrowserRouter>
  );
}
