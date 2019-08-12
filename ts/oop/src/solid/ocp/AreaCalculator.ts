import Shape from './IShape';

class AreaCalculator {
  calculate(shapes: Shape[]) {
    return shapes.reduce((previous, current) => previous + current.area(), 0);
  }
}

export default AreaCalculator;
