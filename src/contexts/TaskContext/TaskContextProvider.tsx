import { useReducer, useEffect } from 'react';
import { initialTaskState } from './initialTaskState';

import { TaskContext } from './taskContext';
import { taskReducer } from './taskReducer';

import { TimerWorkerManager } from '../../workers/timerWorkerManager';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) { 
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerManager.getInstance(); /* Instância do worker */

  worker.onmessage(event => {
    const countDownSeconds = event.data;
    console.log(event.data);

    if (countDownSeconds <= 0) worker.terminate();
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log('Worker terminado por falta de activeTask.');
      worker.terminate();
    }

    worker.postMessage(state); /* Caso tenha uma tarefa ativa */
  }, [state, worker]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
