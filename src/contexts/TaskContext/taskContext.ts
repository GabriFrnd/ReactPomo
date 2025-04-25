import { createContext } from 'react';
import { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';

export type TaskContextProps = { /* Validação de tipos do 'useState' */
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

export const initialContextValue = { /* Valor padrão (pouco relevante porque tem Provider + value), mas boa prática */
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue); /* Criação do contexto */
