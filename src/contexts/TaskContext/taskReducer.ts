import { TaskStateModel } from '../../models/TaskStateModel';
import { TaskActionModel, TaskActionTypes } from './taskActions';

/* Reducer: função que define como o estado muda baseado em uma ação */

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return state;
    }

    case TaskActionTypes.INTERRUPT_TASK: {
      return state;
    }

    case TaskActionTypes.RESET_STATE: {
      return state;
    }
  }

  return state; /* Obrigatório */
}
