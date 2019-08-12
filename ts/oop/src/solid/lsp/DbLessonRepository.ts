import ILessonRepository from './ILessonRepository';

class DbLessonRepository implements ILessonRepository<object> {
  getAll(): Array<object> {
    return [{ name: 'data 1' }, { name: 'file 2' }];
  }
}

export default DbLessonRepository;
