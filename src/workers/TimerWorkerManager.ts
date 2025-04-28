import { TaskStateModel } from '../models/TaskStateModel';

/* Variável que armazenará a instância única da classe (Singleton) */
let instance: TimerWorkerManager | null = null;

/* Classe que gerencia um Web Worker para tarefas relacionadas ao temporizador */
export class TimerWorkerManager {
  private worker: Worker; /* Referência ao Web Worker */

  /* Construtor privado para impedir a criação de instâncias fora da classe */
  private constructor() {
    /* Cria uma nova instância de um Web Worker, carregando o script 'timerWorker.js' */
    this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  /* Método estático que retorna a instância única da classe */
  static getInstance() {
    /* Verifica se a instância já foi criada. Se não, cria uma nova */
    if (!instance) {
      instance = new TimerWorkerManager();
    }

    /* Retorna a instância única */
    return instance;
  }

  /* Método para enviar mensagens para o Web Worker */
  postMessage(message: TaskStateModel) {
    this.worker.postMessage(message); /* Envia a mensagem para o Worker */
  }

  /* Método para configurar o callback que será executado ao receber mensagens do Web Worker */
  onmessage(cb: (event: MessageEvent) => void) {
    this.worker.onmessage = cb; /* Define o callback para tratar mensagens recebidas */
  }

  /* Método para encerrar o Web Worker e liberar recursos */
  terminate() {
    this.worker.terminate(); /* Encerra o Worker */
    instance = null; /* Reseta a instância Singleton, permitindo criar outra no futuro */
  }
}
