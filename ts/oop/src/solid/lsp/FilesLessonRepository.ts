import ILessonRepository from './ILessonRepository';

class FilesLessonRepository implements ILessonRepository<string> {
  getAll(): Array<string> {
    return ['file 1', 'file 2'];
  }
}

export default FilesLessonRepository;
