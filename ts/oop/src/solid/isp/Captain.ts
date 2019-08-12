import { IManageable } from './Interface';

export default class Captain {
  manage(worker: IManageable): string {
    return worker.beManaged();
  }
}
