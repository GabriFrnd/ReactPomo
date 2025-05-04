import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';

import { Heading } from '../../components/Heading';
import { Button } from '../../components/Button';

import { TrashIcon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';

import { sortTasks, SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';

import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import styles from './styles.module.css';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({ tasks: state.tasks }),
      direction: 'desc',
      field: 'startDate'
    };
  });

  useEffect(() => {
    setSortTasksOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field
      })
    }));
  }, [state.tasks]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        tasks: sortTasksOptions.tasks,
        direction: newDirection,
        field
      }),
      direction: newDirection,
      field
    });
  }

  function handleResetHistory() {
    if (!confirm('Tem certeza que deseja apagar o histórico?')) return;
    dispatch({ type: TaskActionTypes.RESET_STATE });
  }

  return (
    <MainTemplate>
      <Container>
        {hasTasks && (
          <Heading>
            <span>History</span>
              <span className={styles.button}>
                <Button
                  icon={<TrashIcon />}
                  onClick={handleResetHistory}
                  color='red'
                  aria-label='Apagar histórico'
                  title='Apagar histórico'
              />
            </span>
          </Heading>
        )}
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className={styles.tableThSort} onClick={() => handleSortTasks({ field: 'name' })}>Tarefa ↕</th>
                  <th className={styles.tableThSort} onClick={() => handleSortTasks({ field: 'duration' })}>Duração ↕</th>
                  <th className={styles.tableThSort} onClick={() => handleSortTasks({ field: 'startDate' })}>Data ↕</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    work: 'Foco',
                    short: 'Descanso curto',
                    long: 'Descanso longo'
                  };

                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min.</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Ainda não há histórico de tarefas.</p>}
      </Container>
    </MainTemplate>
  );
}
