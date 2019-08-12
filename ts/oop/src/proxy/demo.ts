import { Proxy } from './index';

const proxy1: Proxy = new Proxy('proxy1'),
  proxy2: Proxy = new Proxy('proxy2');

proxy1.doAction();
proxy1.doAction();
proxy2.doAction();
proxy2.doAction();
proxy1.doAction();
