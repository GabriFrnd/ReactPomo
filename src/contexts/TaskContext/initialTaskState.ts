import { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,

  formattedSecondsRemaining: '00:00',
  activeTask: null,

  currentCycle: 0,
  config: {
    work: 25,
    short: 5,
    long: 15,
  },
};
