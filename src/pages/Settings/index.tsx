import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';

import { Button } from '../../components/Button';
import { SaveIcon } from 'lucide-react';

import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();

  const workInput = useRef<HTMLInputElement>(null);
  const shortInput = useRef<HTMLInputElement>(null);
  const longInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const work = Number(workInput.current?.value);
    const short = Number(shortInput.current?.value);
    const long = Number(longInput.current?.value);

    if (isNaN(work) || isNaN(short) || isNaN(long)) {
      formErrors.push('Por favor, utilize apenas números.');
    }

    if (work < 1 || work > 99) {
      formErrors.push('Por favor, digite apenas valores entre 1 e 99 para o tempo de foco.');
    }

    if (short < 1 || short > 30) {
      formErrors.push('Por favor, digite valores entre 1 e 30 para o tempo de descanso curto.');
    }

    if (long < 1 || long > 60) {
      formErrors.push('Por favor, digite valores entre 1 e 60 para o tempo de descanso longo.');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: {work, short, long} });
    showMessage.success('Configurações salvas com sucesso!');
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
