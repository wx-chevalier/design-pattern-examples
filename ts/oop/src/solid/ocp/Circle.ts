import ShapeI from './IShape';

class Circle implements ShapeI {
  private radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  area(): number {
    return this.radius * this.radius * Math.PI;
  }
}

export default Circle;
