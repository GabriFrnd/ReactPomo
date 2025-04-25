import { useRef } from 'react';

import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';

import { Cycles } from '../Cycles';
import { Input } from '../Input';

import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function MainForm() {
  const { setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null); /* Referência (evita re-renderizações) */

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
      type: 'work',
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: 1
    };

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: 1, /* Conferir depois */
        secondsRemaining: newTask.duration * 60, /* Conferir depois */
        formattedSecondsRemaining: '00:00', /* Conferir depois */
        tasks: [...prevState.tasks, newTask]
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
        />
      </div>

      <div className='row'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='row'>
        <Cycles />
      </div>

      <div className='row'>
        <Button icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
