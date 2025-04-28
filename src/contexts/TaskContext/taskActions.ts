import { TaskModel } from '../../models/TaskModel';

export enum TaskActionTypes /* Tipo da ação */ {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK'
}

export type TaskActionsWithPayload = { /* Actions (com payload) */
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
} | {
  type: TaskActionTypes.COUNT_DOWN;
  payload: {secondsRemaining: number};
};

export type TaskActionsWithoutPayload = { /* Actions (sem payload) */
  type: TaskActionTypes.RESET_STATE;
} | {
  type: TaskActionTypes.INTERRUPT_TASK;
} | {
  type: TaskActionTypes.COMPLETE_TASK;
};

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload;
