import { matrix, index, subset, divide, subtract, zeros, multiply, Matrix, min, MathArray, range } from 'mathjs';

interface Problem {
    numVariables: number;
    constraints: Constraint[];
    objectiveCoefficients: Coefficients;
}

type Constraint = number[];
type Coefficients = number[];

const simplexSolver = (problem: Problem): Coefficients => {
    const { numVariables, constraints, objectiveCoefficients } = problem;
    const numRows = constraints.length + 1;
    const numCols = numVariables + 1;

    const tableau = matrix(zeros([numRows, numCols]));

    constraints.forEach((constraint, i) => {
        for (let j = 0; j < numVariables; j++) {
            tableau.subset(index(i, j), constraint[j]);
        }
        tableau.subset(index(i, numVariables), constraint[numVariables]);
    });

    for (let j = 0; j < numVariables; j++) {
        const rowIndex = numRows - 1;
        const columnIndex = j;
        const value = -objectiveCoefficients[j];
    
        tableau.subset(index(rowIndex, columnIndex), value);
    }

    let iteration = 0;
    while (true) {
        console.log(`Iteration ${iteration + 1}`);
        console.log(`Tableau:\n${tableau}`);

        const pivotColumn = findPivotColumn(tableau);
        if (pivotColumn === -1) {
            console.log("No pivot column found. Terminating.");
            break;
        }
        console.log(`Pivot Column: ${pivotColumn}`);

        const pivotRow = findPivotRow(tableau, pivotColumn);
        if (pivotRow === -1) {
            console.log("No pivot row found. Terminating.");
            break;
        }
        console.log(`Pivot Row: ${pivotRow}`);

        performPivot(tableau, pivotRow, pivotColumn);

        iteration++;
    }

    const solution: Coefficients = [];
    for (let j = 0; j < numVariables; j++) {
        solution[j] = tableau.get([numRows - 1, j]);
    }

    console.log(`Solution: ${solution}`);

    return solution;
};

const findPivotColumn = (tableau: Matrix): number => {
    const lastRow = tableau.subset(index(tableau.size()[0] - 1, range(0, tableau.size()[1] - 1)));

    // Converter a MathArray para um array de números
    const rowArray: number[] = lastRow.toArray() as any;

    // Encontrar o valor mínimo
    const minCoefficient = min(rowArray);

    if (minCoefficient >= 0) {
        return -1;
    }

    // Encontrar o índice do valor mínimo no array original
    const minIndex = rowArray.indexOf(minCoefficient);

    return minIndex;
};

const findPivotRow = (tableau: any, pivotColumn: number): number => {
    const ratios: number[] = [];
    for (let i = 0; i < tableau.size()[0] - 1; i++) {
        const ratio = tableau.subset(index(i, tableau.size()[1]-1)) / tableau.subset(index(i, pivotColumn));
        ratios.push(ratio);
    }

    const positiveRatios = ratios.filter(ratio => ratio > 0);
    if (positiveRatios.length === 0) {
        return -1;
    }

    const minRatio = Math.min(...positiveRatios);
    const minRatioIndex = ratios.indexOf(minRatio);

    return minRatioIndex;
};

const performPivot = (tableau: any, pivotRow: number, pivotColumn: number): void => {
    const pivotValue = tableau.subset(index(pivotRow, pivotColumn));

    for (let j = 0; j < tableau.size()[1]; j++) {
        tableau.subset(index(pivotRow, j), divide(tableau.subset(index(pivotRow, j)), pivotValue));
    }

    for (let i = 0; i < tableau.size()[0]; i++) {
        if (i !== pivotRow) {
            const factor = tableau.subset(index(i, pivotColumn));
            for (let j = 0; j < tableau.size()[1]; j++) {
                tableau.subset(index(i, j), subtract(tableau.subset(index(i, j)), multiply(factor, tableau.subset(index(pivotRow, j)))));
            }
        }
    }
};

export default simplexSolver;
