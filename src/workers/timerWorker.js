self.onmessage = function (event) {
  console.log('Worker recebeu', event.data);

  switch (event.data) {
    case 'Favor': {
      self.postMessage('Sim, posso fazer um favor');
      break;
    }

    case 'Cumprimentar': {
      self.postMessage('Oi, bom dia!');
      break;
    }

    default: {
      self.postMessage('Não entendi.');
      break;
    }
  }
};
