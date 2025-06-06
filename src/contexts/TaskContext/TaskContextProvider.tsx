import { useReducer, useEffect, useRef } from 'react';
import { initialTaskState } from './initialTaskState';

import { TaskContext } from './taskContext';
import { taskReducer } from './taskReducer';

import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';

import { loadBeep } from '../../utils/loadBeep';
import { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) { 
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => { /* Lazy initializer */
    const storageState = localStorage.getItem('state'); /* Recuperação de estado do localStorage */

    if (storageState === null) return initialTaskState;
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00'
    };
  });

  const playBeepRef = useRef<() => void | null>(null);
  const worker = TimerWorkerManager.getInstance(); /* Instância do worker */

  worker.onmessage(event => {
    const countDownSeconds = event.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: {secondsRemaining: countDownSeconds} });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state)); /* Salvando o estado da aplicação no localStorage */

    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`; /* Título da página no navegador */
    worker.postMessage(state); /* Caso tenha uma tarefa ativa */
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
