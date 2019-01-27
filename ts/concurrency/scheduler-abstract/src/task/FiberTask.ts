export interface Fiber {
  reset: () => any;
  run: (param?: any) => any;
  throwInto: (ex: any) => any;
}
