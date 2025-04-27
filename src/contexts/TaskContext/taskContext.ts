import { createContext } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';

import { initialTaskState } from './initialTaskState';
import { TaskActionModel } from './taskActions';

export type TaskContextProps = { 
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>; 
};

export const initialContextValue = { /* Valor padrão (pouco relevante porque tem Provider + value), mas boa prática */
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue); /* Criação do contexto */
