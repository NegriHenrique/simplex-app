type Tableau = number[][];

function createTableau(c: number[], A: number[][], b: number[], type: 'max' | 'min'): Tableau {
    const m = A.length;
    const n = A[0].length;
    const tableau: Tableau = [];

    // Adiciona variáveis de folga
    for (let i = 0; i < m; i++) {
        tableau.push([...A[i], b[i]]);
    }

    if (type === 'max') {
        // Adiciona a função objetivo para maximização
        tableau.push([...c, 0]);
    } else {
        // Adiciona a função objetivo para minimização com sinais invertidos
        const invertedC = c.map(value => -value);
        tableau.push([...invertedC, 0]);
    }

    return tableau;
}

function findPivotColumn(tableau: Tableau): number {
    const lastRow = tableau[tableau.length - 1];
    const max = Math.max(...lastRow);
    if (max <= 0) return -1; // Nenhuma coluna pivot encontrada

    return lastRow.indexOf(max);
}

function findPivotRow(tableau: Tableau, pivotColumn: number): number {
    const m = tableau.length - 1;
    const pivotColumnValues = tableau.map(row => row[pivotColumn]);
    const ratios: number[] = [];

    for (let i = 0; i < m; i++) {
        if (pivotColumnValues[i] <= 0) {
            ratios.push(Infinity);
        } else {
            ratios.push(tableau[i][tableau[i].length - 1] / pivotColumnValues[i]);
        }
    }

    return ratios.indexOf(Math.min(...ratios));
}

function pivot(tableau: Tableau, pivotRow: number, pivotColumn: number): Tableau {
    const pivotValue = tableau[pivotRow][pivotColumn];

    // Divide a linha do pivot pelo valor pivot
    tableau[pivotRow] = tableau[pivotRow].map(value => value / pivotValue);

    // Atualiza as outras linhas
    for (let i = 0; i < tableau.length; i++) {
        if (i !== pivotRow) {
            const factor = tableau[i][pivotColumn];
            for (let j = 0; j < tableau[i].length; j++) {
                tableau[i][j] -= factor * tableau[pivotRow][j];
            }
        }
    }

    return tableau;
}

function isOptimal(tableau: Tableau): boolean {
    const lastRow = tableau[tableau.length - 1];
    return lastRow.every(value => value <= 0);
}

function getSolution(tableau: number[][], variableCount: number, slackVariableCount: number): { [key: string]: number } {
    const m = tableau.length - 1;
    const n = tableau[0].length - 1;
  
    const basicVariables: number[] = [];
    const basicValues: number[] = [];
  
    for (let i = 0; i < n; i++) {
      const column = tableau.map(row => row[i]);
      if (column.filter(value => value === 0).length === m - 1 && column.includes(1)) {
        const rowIndex = column.indexOf(1);
        basicVariables.push(i);
        basicValues.push(tableau[rowIndex][n]);
      }
    }
  
    const variables: { [key: string]: number } = {};
  
    for (let i = 0; i < variableCount; i++) {
      const variableName = `x${i + 1}`;
      variables[variableName] = basicVariables.includes(i) ? basicValues[basicVariables.indexOf(i)] : 0;
    }
  
    const slackVariables: { [key: string]: number } = {};
  
    for (let i = 0; i < slackVariableCount; i++) {
      const slackVariableName = `x${variableCount + i + 1}`;
      slackVariables[slackVariableName] = tableau[m - 1 - i][n];
    }
  
    const Z = tableau[m][n];
  
    return { Z, ...variables, ...slackVariables };
  }
   
export function simplexMethod(c: number[], A: number[][], b: number[], type: 'max' | 'min'): { [key: string]: number } {
    let tableau = createTableau(c, A, b, type);

    while (!isOptimal(tableau)) {
        const pivotColumn = findPivotColumn(tableau);
        if (pivotColumn === -1) break;

        const pivotRow = findPivotRow(tableau, pivotColumn);
        if (pivotRow === -1) {
            throw new Error("O problema é ilimitado.");
        }

        tableau = pivot(tableau, pivotRow, pivotColumn);
    }

    return getSolution(tableau, c.length, 3);
}
