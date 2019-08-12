import { ManageableI } from "./Interface";

export default class Captain {
  manage(worker: ManageableI) : string {
    return worker.beManaged();
  }
}