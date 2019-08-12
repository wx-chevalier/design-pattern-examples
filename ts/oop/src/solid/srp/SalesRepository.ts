class SalesRepository {

  between(start : number, end: number) : Array<string> {
    const testData = [
      { start: 1, end: 2, desc: 'first' },
      { start: 3, end: 5, desc: 'second' },
    ];
    return testData
      .filter((data) => start === data.start && end === data.end)
      .map((d) => d.desc);
  }
}

export default SalesRepository;