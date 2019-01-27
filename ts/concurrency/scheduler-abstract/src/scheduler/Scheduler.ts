/** 调度选项 */
export type ScheduleOptions = {
  timeout: number;
};

/**
 *
 * @abstract 调度器抽象类
 * @template T The type of task.
 * @template K The type of tasks.
 */
export abstract class Scheduler<T, K> {
  protected _tasks: K;
  protected _scheduleOptions: ScheduleOptions;

  private _isStopped = false;
  private _isScheduled = false;
  private _isPerforming = false;
  private _taskHandler: (task: T) => any;

  /**
   * 默认构造函数
   *
   * @param {K} tasks The tasks to be scheduled.
   * @param {(task: T) => any} taskHandler The task handler.
   * @param {ScheduleOptions} [options] The schedule options.
   */
  constructor(
    tasks: K,
    taskHandler: (task: T) => any,
    options?: ScheduleOptions
  ) {
    this._tasks = tasks;
    this._taskHandler = taskHandler;
    if (options) {
      this._scheduleOptions = options;
    }
  }

  /** 判断是否为空 */
  abstract hasMoreWork(): boolean;

  /** 获取下一个任务 */
  abstract requestNextWork(): T | undefined;

  /** 启动调度器 */
  start() {
    this._isStopped = false;
    if (!this._isScheduled && !this._isPerforming) {
      this._isScheduled = true;
      window.requestIdleCallback(this._processWorkLoop, this._scheduleOptions);
    }
  }

  /** 关闭调度器 */
  stop() {
    this._isStopped = true;
    this._isScheduled = false;
  }

  /** 执行任务 */
  private _processWorkLoop = async (deadline: RequestIdleCallbackDeadline) => {
    // One work per loop to ensure the performance.
    if (
      !this._isStopped &&
      this.hasMoreWork() &&
      (deadline.timeRemaining() > 0 || deadline.didTimeout)
    ) {
      const nextWork = this.requestNextWork();
      if (nextWork) {
        await this._performWork(nextWork);
      }
    }

    this._isScheduled = false;
    if (!this._isStopped && this.hasMoreWork()) {
      this.start();
    }
  };

  /** 执行某个具体的操作 */
  private async _performWork(work: T) {
    if (this._taskHandler) {
      this._isPerforming = true;
      await this._taskHandler(work);
      this._isPerforming = false;
    }
  }
}
