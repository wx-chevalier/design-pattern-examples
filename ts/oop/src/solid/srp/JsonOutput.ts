import ISalesOutput from './ISalesOutput';

class JsonOutput implements ISalesOutput<object> {
  output(sales: Array<string>): object {
    return { key: sales };
  }
}

export default JsonOutput;
