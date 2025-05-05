import { MainTemplate } from '../../templates/MainTemplate';
import { Container } from '../../components/Container';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';

import { Button } from '../../components/Button';
import { SaveIcon } from 'lucide-react';

export function Settings() {
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
        <form className='form'>
          <div className='row'>
            <Input id='work' label='Foco' />
          </div>

          <div className='row'>
            <Input id='short' label='Descanso curto' />
          </div>

          <div className='row'>
            <Input id='long' label='Descanso longo' />
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
