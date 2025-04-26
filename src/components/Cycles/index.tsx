import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = { /* Objeto: seletor de mensagens (aria-label + title) */
    work: 'foco',
    short: 'descanso curto',
    long: 'descanso longo'
  }

  return (
    <div className={styles.cycles}>
      <span>Ciclos</span>

      <div className={styles.dots}>
        {/* .map(): iterar sobre um array e criar um novo array, aplicando uma transformação em cada elemento */}

        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);

          return (
            <span 
              key={nextCycle} /* Identificador único */
              className={`${styles.dot} ${styles[nextCycleType]}`}
              aria-label={`Indicador: ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador: ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
