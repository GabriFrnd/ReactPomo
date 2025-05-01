import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Home } from './pages/Home';

import { MessagesContainer } from './components/MessagesContainer';
import { BrowserRouter, Route, Routes } from 'react-router';

import { NotFound } from './pages/NotFound';
import { AboutPomodoro } from './pages/AboutPomodoro';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>

        <BrowserRouter> {/* Permite utilizar o React Router aqui */}
          <Routes> {/* Grupo de rotas */}
            <Route path='/' element={<Home />} /> {/* path (href): rota; element: o que carregar */}
            <Route path='/about-pomodoro/' element={<AboutPomodoro />} />

            <Route path='*' element={<NotFound />} /> {/* path='*' (todas as rotas) */}
          </Routes>
        </BrowserRouter>

      </MessagesContainer>
    </TaskContextProvider>
  );
}
