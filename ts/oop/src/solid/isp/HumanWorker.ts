import { IWorkable, IManageable, ISleepable } from './Interface';

export default class AndroidWorker
  implements IWorkable, ISleepable, IManageable {
  work(): string {
    return 'human working';
  }
  sleep(): string {
    return 'human sleeping';
  }
  beManaged(): string {
    return this.work() + this.sleep();
  }
}
