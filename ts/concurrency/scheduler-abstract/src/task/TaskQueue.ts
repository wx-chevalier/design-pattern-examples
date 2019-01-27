/** 简单的队列实现，完整用例参考 algods-snippets/ts */
export class TaskQueue<T> {
  private _queue: T[] = [];

  /** 获取长度 */
  get length(): number {
    return this._queue.length;
  }

  /** 清空队列 */
  clear() {
    this._queue.length = 0;
  }

  /** 弹出首位元素 */
  dequeue(): T | undefined {
    return this._queue.shift();
  }

  /** 清空全部元素 */
  dump(): T[] {
    const dump = this.toArray();
    this._queue.splice(0, dump.length);
    return dump;
  }

  /** 弹出首个元素，返回新的队列长度 */
  enqueue(...items: T[]): number {
    return this._queue.push(...items);
  }

  /** 执行遍历 */
  forEach(
    callback: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ) {
    this._queue.forEach(callback, thisArg || this);
  }

  /** map 转化操作 */
  map<U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[] {
    return this._queue.map(callback, thisArg || this);
  }

  /** 获取首个元素 */
  peek(): T | undefined {
    return this._queue[0];
  }

  /** 转化为数组 */
  toArray(): T[] {
    return [...this._queue];
  }
}
