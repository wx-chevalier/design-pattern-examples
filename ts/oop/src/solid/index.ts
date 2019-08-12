import AreaCalculator from './ocp/AreaCalculator';
import Square from './ocp/Square';
import Circle from './ocp/Circle';

import { getAll } from './lsp/Lesson';
import DbLessonRepository from './lsp/DbLessonRepository';
import FilesLessonRepository from './lsp/FilesLessonRepository';

import Captain from './isp/Captain';
import AndroidWorker from './isp/AndroidWorker';
import HumanWorker from './isp/HumanWorker';
import PasswordReminder from './dip/PasswordReminder';
import MySqlConnection from './dip/MySqlConnection';

const calculateArea = new AreaCalculator();
const areas = calculateArea.calculate([
  new Square(20, 20),
  new Circle(10),
  new Square(10, 10),
]);
console.group('areas', areas);
console.groupEnd();

const dbLessons = getAll(new DbLessonRepository());
const fileLessons = getAll(new FilesLessonRepository());
console.group('lessons', dbLessons, fileLessons);
console.groupEnd();

const captain = new Captain();
const manageAndroid = captain.manage(new AndroidWorker());
const manageHuman = captain.manage(new HumanWorker());
console.group('manage', manageAndroid, manageHuman);
console.groupEnd();

const passwordRemainder = new PasswordReminder(new MySqlConnection());
console.group('passwordRemainder', passwordRemainder.reminder());
console.groupEnd();
