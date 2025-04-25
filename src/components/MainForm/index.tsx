import { useState } from 'react';

import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';

import { Cycles } from '../Cycles';
import { Input } from '../Input';

export function MainForm() {
  const [taskName, setTaskName] = useState(''); /* Valor da input (value + onChange) */

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); /* Prevenção: envio de formulário */
  }

  return (
    <form className='form' onSubmit={handleCreateNewTask}>
      <div className='row'>
        <Input
          id='input'
          type='text'
          label='Tarefa'
          value={taskName} // Atualizações mediante digitação na input (valor inicial: '') 
          onChange={(event) => setTaskName(event.target.value)} // Mudança no state a cada item digitado
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
