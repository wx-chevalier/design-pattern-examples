import SalesOutputI from './ISalesOutput';

class JsonOutput implements SalesOutputI<object> {
  output(sales: Array<string>): object {
    return { key: sales };
  }
}

export default JsonOutput;
