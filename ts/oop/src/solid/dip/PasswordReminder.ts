import ConnectionInterface from './ConnectionInterface';

export default class PasswordReminder {
  private db;
  constructor(db: ConnectionInterface) {
    this.db = db;
  }
  reminder(): string {
    return this.db.connect() + ' ...reminding password';
  }
}