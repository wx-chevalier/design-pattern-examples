import LessonRepositoryI from './LessonRepositoryI';

export function getAll<T>(lesson: LessonRepositoryI<T>) : Array<T> {
  return lesson.getAll();
}