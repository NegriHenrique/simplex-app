import * as math from 'mathjs';

export const invertMatrix = (matrix: number[][]): number[][] | null => {
    try {
        console.log('Calculando matriz inversa')
        const invMatrix = math.inv(matrix);
        console.log("🚀 ~ file: invertMatrix.ts:7 ~ invertMatrix ~ invMatrix:", invMatrix)
        return invMatrix;
    } catch (error) {
        return null; // A matriz não é inversível
    }
}
