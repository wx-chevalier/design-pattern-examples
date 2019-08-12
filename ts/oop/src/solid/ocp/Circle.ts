import ShapeI from './ShapeI';

class Circle implements ShapeI {
  private radius; 
  constructor(radius: number) {
    this.radius = radius;
  }
  area() : number {
    return this.radius * this.radius * Math.PI;
  }
}

export default Circle;