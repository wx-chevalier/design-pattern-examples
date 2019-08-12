import ILessonRepository from './ILessonRepository';

export function getAll<T>(lesson: ILessonRepository<T>): Array<T> {
  return lesson.getAll();
}
