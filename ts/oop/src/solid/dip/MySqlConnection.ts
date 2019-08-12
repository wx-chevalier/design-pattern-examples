import ConnectionInterface from './ConnectionInterface';

export default class MySqlConnection implements ConnectionInterface {
  connect(): string {
    return 'mysql connected...';
  }
}
