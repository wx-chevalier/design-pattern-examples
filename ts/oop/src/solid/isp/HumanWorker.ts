import { WorkableI, ManageableI, SleepableI } from "./Interface";

export default class AndroidWorker implements WorkableI, SleepableI, ManageableI {
  work(): string {
    return 'human working';
  }
  sleep(): string {
    return 'human sleeping';
  }
  beManaged() : string {
    return this.work() + this.sleep();
  }
}