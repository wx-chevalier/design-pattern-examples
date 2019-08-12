interface ILessonRepository<T> {
  getAll(): Array<T>;
}

export default ILessonRepository;
