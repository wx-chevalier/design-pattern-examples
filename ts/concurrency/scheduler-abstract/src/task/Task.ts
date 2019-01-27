/** 抽象的任务定义 */

/** 异步任务 */
export interface AsyncTask {
  status: AsyncTaskStatus;
}

/** 异步任务的状态 */
export enum AsyncTaskStatus {
  INITIAL,
  RUNNING,
  FULFILLED,
  REJECTED
}
