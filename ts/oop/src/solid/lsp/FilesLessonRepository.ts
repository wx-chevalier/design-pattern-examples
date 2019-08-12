import LessonRepositoryI from './LessonRepositoryI';

class FilesLessonRepository implements LessonRepositoryI<string> {
  getAll() : Array<string> {
    return ['file 1', 'file 2'];
  }
}

export default FilesLessonRepository;