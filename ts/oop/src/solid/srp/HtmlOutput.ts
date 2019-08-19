import ISalesOutput from './ISalesOutput';

class HtmlOutput implements ISalesOutput<string> {
  output(sales: Array<string>): string {
    return `<h1>html output ${sales.join()}<s/h1>`;
  }
}

export default HtmlOutput;
