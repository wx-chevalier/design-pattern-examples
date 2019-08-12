import ShapeI from './IShape';

class Square implements ShapeI {
  private height: number;
  private width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }

  area(): number {
    return this.width * this.height;
  }
}

export default Square;
