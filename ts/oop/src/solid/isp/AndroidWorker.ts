import { WorkableI, ManageableI } from "./Interface";

export default class AndroidWorker implements WorkableI, ManageableI {
  work(): string {
    return 'android working';
  }
  beManaged() : string {
    return this.work();
  }
}