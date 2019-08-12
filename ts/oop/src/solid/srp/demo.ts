import SalesReporter from './SalesReporter';
import SalesRepository from './SalesRepository';
import HtmlOutput from './HtmlOutput';
import JsonOutput from './JsonOutput';

const testData = [
  { start: 1, end: 2, desc: 'first' },
  { start: 3, end: 5, desc: 'second' },
];

const report = new SalesReporter(new SalesRepository(testData));
const htmlReport = report.between<string>(1, 2, new HtmlOutput());
const jsonReport = report.between<object>(3, 5, new JsonOutput());

console.group('reports');
console.log(htmlReport);
console.log(jsonReport);
console.groupEnd();
