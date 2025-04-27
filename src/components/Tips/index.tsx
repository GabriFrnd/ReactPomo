import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  
  const nextCycle = getNextCycle(state.currentCycle); /* Estado: ciclos de tempo */
  const nextCycleType = getNextCycleType(nextCycle); /* Tipo de ciclo (work, short ou long) */

  const tipsForWhenActiveTask = {
    work: <span>Foque por <b>{state.config.work} minutos</b>.</span>,
    short: <span>Descanso curto durante <b>{state.config.short} minutos</b>.</span>,
    long: <span>Descanso longo durante <b>{state.config.long} minutos</b>.</span>
  };

  const tipsForNoActiveTask = {
    work: <span>No próximo ciclo, foque por <b>{state.config.work} minutos</b>.</span>,
    short: <span>No próximo ciclo, descanse por <b>{state.config.short} minutos</b>.</span>,
    long: <span>No próximo ciclo, descanse por <b>{state.config.long} minutos</b>.</span>
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
