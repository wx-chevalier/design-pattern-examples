import ShapeI from './ShapeI';

class Square implements ShapeI {
  private height;
  private width;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  area(): number {
    return this.width * this.height;
  }
}

export default Square;