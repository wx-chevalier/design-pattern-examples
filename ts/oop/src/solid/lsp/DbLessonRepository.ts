import LessonRepositoryI from './LessonRepositoryI';

class DbLessonRepository implements LessonRepositoryI<object> {
  getAll() : Array<object> {
    return [{name: 'data 1'},{name: 'file 2'}];
  }
}

export default DbLessonRepository;