import { useContext } from 'react';
import { TaskContext } from './taskContext';

export function useTaskContext() { /* Hook próprio */
  return useContext(TaskContext);
}
