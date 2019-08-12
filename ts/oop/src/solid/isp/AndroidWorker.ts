import { IWorkable, IManageable } from './Interface';

export default class AndroidWorker implements IWorkable, IManageable {
  work(): string {
    return 'android working';
  }
  beManaged(): string {
    return this.work();
  }
}
