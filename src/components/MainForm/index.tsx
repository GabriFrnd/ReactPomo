import { useRef } from 'react';

import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';

import { Cycles } from '../Cycles';
import { Input } from '../Input';

import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null); /* Referência (evita re-renderizações) */

  const nextCycle = getNextCycle(state.currentCycle); /* Estado: ciclos de tempo */
  const nextCycleType = getNextCycleType(nextCycle); /* Tipo de ciclo (work, short ou long) */

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); /* Prevenção: envio de formulário */
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim(); /* Valor da input (tarefa do usuário) + remoção de espaços */

    if (!taskName) {
      alert('Digite a sua tarefa.');
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

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, 
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), 
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  function handleInterruptTask() {
    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0, 
        formattedSecondsRemaining: '00:00', 
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() }
          }

          return task;
        })
      }
    })
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
          disabled={!!state.activeTask} /* Lógica: desativação da input + conversão para boolean */
        />
      </div>

      <div className='row'>
        <p>Lorem ipsum dolor sit amet.</p>
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
