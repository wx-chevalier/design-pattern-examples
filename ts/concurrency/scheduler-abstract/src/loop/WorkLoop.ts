import { TaskQueue as Queue } from '../task/TaskQueue';

/** 对于任务队列的二次封装，借鉴了 PostgreSQL 中的概念 */
export abstract class Vacuum<T> {
  private _tasks: Queue<T> = new Queue<T>();

  /** 获取全部任务 */
  get tasks(): Queue<T> {
    return this._tasks;
  }

  /** 任务出队 */
  dequeue(): T | undefined {
    return this._tasks.dequeue();
  }

  /** 任务入队 */
  enqueue(task: T): void {
    this._tasks.enqueue(task);
  }

  /** 清空任务 */
  clear(): void {
    this._tasks.clear();
  }

  /** 执行全部任务 */
  abstract flush(): Promise<T[]>;
}
