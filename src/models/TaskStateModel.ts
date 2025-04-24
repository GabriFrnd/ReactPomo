import { TaskModel } from './TaskModel';

export type TaskStateModel = { /* Estados globais da aplicação */
  tasks: TaskModel[]; /* Array de 'TaskModel' */
  secondsRemaining: number;

  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;

  currentCycle: number; /* 1 a 8 */
  config: {
    work: number;
    short: number;
    long: number;
  }
};
