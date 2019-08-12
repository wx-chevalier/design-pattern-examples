interface ISalesOutput<T> {
  output(sales: Array<string>): T;
}

export default ISalesOutput;
