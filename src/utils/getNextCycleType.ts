import { TaskModel } from '../models/TaskModel';

export function getNextCycleType(currentCycle: number): TaskModel['type'] { /* Lógica: tipo de ciclo (work, short ou long) */
  if (currentCycle % 8 === 0) return 'long';
  if (currentCycle % 2 === 0 ) return 'short';

  return 'work'; /* Retorna 'work' caso nenhuma opção acima seja verdadeira */
}
