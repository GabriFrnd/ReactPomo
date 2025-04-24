import { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;

  duration: number;
  startDate: number;

  completeDate: number | null /* 'null' caso o usuário interrompa a tarefa */;
  interruptDate: number | null /* Data que a tarefa foi interrompida */;

  type: keyof TaskStateModel['config'];
};
