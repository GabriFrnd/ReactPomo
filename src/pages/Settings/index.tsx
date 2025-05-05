import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';

import { Button } from '../../components/Button';
import { SaveIcon } from 'lucide-react';

import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

export function Settings() {
  const { state } = useTaskContext();

  const workInput = useRef<HTMLInputElement>(null);
  const shortInput = useRef<HTMLInputElement>(null);
  const longInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const work = workInput.current?.value;
    const short = shortInput.current?.value;
    const long = longInput.current?.value;

    console.log(work, short, long);
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo <br /> de foco e descanso (curto
          e longo)
        </p>
      </Container>

      <Container>
        <form className='form' onSubmit={handleSaveSettings}>
          <div className='row'>
            <Input 
              id='work' 
              label='Foco'
              ref={workInput} 
              defaultValue={state.config.work}
            />
          </div>

          <div className='row'>
            <Input
              id='short' 
              label='Descanso curto' 
              ref={shortInput} 
              defaultValue={state.config.short}
            />
          </div>

          <div className='row'>
            <Input 
              id='long' 
              label='Descanso longo' 
              ref={longInput} 
              defaultValue={state.config.long}
            />
          </div>

          <div className='row'>
            <Button 
              icon={<SaveIcon />} 
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
