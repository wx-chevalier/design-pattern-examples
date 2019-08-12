class SalesRepository {
  data: Array<any>;

  constructor(data: Array<any>) {
    this.data = data;
  }

  between(start: number, end: number): Array<string> {
    return this.data
      .filter(data => start === data.start && end === data.end)
      .map(d => d.desc);
  }
}

export default SalesRepository;
