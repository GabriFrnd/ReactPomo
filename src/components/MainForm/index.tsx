import { useRef } from 'react';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';

import { Cycles } from '../Cycles';
import { Input } from '../Input';

import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';

import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null); /* Referência (evita re-renderizações) */

  const nextCycle = getNextCycle(state.currentCycle); /* Estado: ciclos de tempo */
  const nextCycleType = getNextCycleType(nextCycle); /* Tipo de ciclo (work, short ou long) */

  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); /* Prevenção: envio de formulário */
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim(); /* Valor da input (tarefa do usuário) + remoção de espaços */

    if (!taskName) {
      showMessage.warn('Digite a sua tarefa.');
      return;
    }

    const newTask: TaskModel = { /* Nova tarefa + propriedades */
      id: Date.now().toString(),
      name: taskName,
      type: nextCycleType,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType]
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success('Tarefa iniciada com sucesso!');
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida.');

    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form className='form' onSubmit={handleCreateNewTask}>
      <div className='row'>
        <Input
          id='input'
          type='text'
          label='Tarefa'
          ref={taskNameInput}
          placeholder='Digite uma tarefa'
          defaultValue={lastTaskName}
          disabled={!!state.activeTask} /* Lógica: desativação da input + conversão para boolean */
        />
      </div>

      <div className='row'>
        <Tips />
      </div>

      {state.currentCycle > 0 && ( /* Lógica: exibição de ciclos do formulário */
        <div className='row'>
          <Cycles />
        </div>
      )} 

      <div className='row'>
        {!state.activeTask && ( /* Não tem tarefa ativa */
          <Button 
            key='submit'
            type='submit' 
            icon={<PlayCircleIcon />} 
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
          />
        )} 
        
        {!!state.activeTask && ( /* Tarefa ativa */
          <Button 
            key='interrupt'
            type='button'
            color='red'
            icon={<StopCircleIcon />} 
            onClick={handleInterruptTask}
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
          />
        )}
      </div>
    </form>
  );
}
