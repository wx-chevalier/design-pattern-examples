import { Singleton } from './index';

const singleton1 = Singleton.Instance();
const singleton2 = Singleton.Instance();

if (singleton1 === singleton2) {
  console.log('two singletons are equivalent');
} else {
  console.log('two singletons are not equivalent');
}
