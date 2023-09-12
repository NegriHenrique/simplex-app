import '@testing-library/jest-dom';
import { simplexMethod } from './simplexSolver';

describe('Testes do Algoritmo Simplex', () => {
  it('Deve resolver um problema de maximização', () => {
    const c = [2, 1, -3, 5];
    const A = [
      [1, 2, 4, -1],
      [2, 3, -1, 1],
      [1, 0, 1, 1],
    ];
    const b = [6, 12, 4];
    const type = 'max';

    const solution = simplexMethod(c, A, b, type);
    expect(solution.Z).toEqual(-68 / 3);
    expect(solution.x1).toEqual(0);
    expect(solution.x2).toEqual(0);
    expect(solution.x3).toEqual(0);
    expect(solution.x4).toEqual(0);
    expect(solution.x5).toEqual(4);
    expect(solution.x6).toEqual(8 / 3);
    expect(solution.x7).toEqual(4.666666666666667);
  });

  it('Deve resolver um problema de minimização', () => {
    const c = [1, -2, 1];
    const A = [
      [1, 2, -2],
      [2, 0, -2],
      [2, -1, 2],
    ];
    const b = [4, 6, 2];
    const type = 'min';

    const solution = simplexMethod(c, A, b, type);

    expect(solution.Z).toEqual(-8);
    expect(solution.x1).toEqual(0);
    expect(solution.x2).toEqual(0);
    expect(solution.x3).toEqual(0);
    expect(solution.x4).toEqual(4);
    expect(solution.x6).toEqual(6);
    expect(solution.x5).toEqual(14);
  });

  it('P1', () => {
    const c = [10, 7];
    const A = [
      [2, 1],
      [4, 5],
    ];
    const b = [5000, 15000];
    const type = 'max';

    const solution = simplexMethod(c, A, b, type);

    console.log("P1:", solution)
    expect(solution);
  });

  it('P2', () => {
    const c = [4, 5, 9, 11];
    const A = [
      [1, 1, 1, 1],
      [7, 5, 3, 2],
      [3, 5, 10, 15],
    ];
    const b = [15, 120, 100];
    const type = 'max';

    const solution = simplexMethod(c, A, b, type);
    console.log("P2:", solution)
    expect(solution);
  });

  it('P3', () => {
    const c = [90, 120];
    const A = [
      [50, 100],
      [1, 0],
      [0, 1],
    ];
    const b = [80000, 5000, 7000];
    const type = 'max';

    const solution = simplexMethod(c, A, b, type);
    console.log("🚀P3:", solution)

    expect(solution)
  });

});