import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';

import { Cycles } from '../Cycles';
import { Input } from '../Input';

export function MainForm() {
  return (
    <form className='form'>
      <div className='row'>
        <Input
          id='input'
          type='text'
          label='Tarefa'
          placeholder='Digite algo'
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
