export class Singleton {
  // A constiable which stores the singleton object. Intially,
  // the constiable acts like a placeholder
  private static singleton: Singleton | null = null;
  // private constructor so that no instance is created
  private constructor() {}
  // This is how we create a singleton object
  public static Instance(): Singleton {
    // check if an instance of the class is already created
    if (this.singleton == null) {
      // If not created create an instance of the class
      // store the instance in the constiable
      this.singleton = new Singleton();
    }
    // return the singleton object
    return this.singleton;
  }
}
