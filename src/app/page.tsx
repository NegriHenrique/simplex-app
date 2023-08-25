"use client"
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import simplexSolver from '../utils/simplexSolver';

const Home: React.FC = () => {
    const [numVariables, setNumVariables] = useState(3);
    const [constraints, setConstraints] = useState<Constraint[]>([
        [1, 2, 3, 9],
        [3, 2, 2, 15]
    ]);
    const [objectiveCoefficients, setObjectiveCoefficients] = useState<Coefficients>([-1, -9, -3]);

    const handleConstraintChange = (index: number, values: number[]) => {
        const updatedConstraints = [...constraints];
        updatedConstraints[index] = values;
        setConstraints(updatedConstraints);
    };

    const solveProblem = () => {
        const problem: Problem = {
            numVariables,
            constraints,
            objectiveCoefficients
        };
        console.log("🚀 ~ file: page.tsx:26 ~ solveProblem ~ problem:", problem)
        const solution = simplexSolver(problem);
        console.log("Solução:", solution);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Simplex Solver
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <TextField
                            label="Número de Variáveis"
                            type="number"
                            value={numVariables}
                            onChange={(e) => setNumVariables(parseInt(e.target.value))}
                            fullWidth
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Restrições
                        </Typography>
                        {constraints.map((constraint, index) => (
                            <div key={index}>
                                <Typography>Restrição {index + 1}:</Typography>
                                {constraint.map((value, i) => (
                                    <TextField
                                        key={i}
                                        type="number"
                                        value={value}
                                        onChange={(e) => {
                                            const values = [...constraint];
                                            values[i] = parseInt(e.target.value);
                                            handleConstraintChange(index, values);
                                        }}
                                        style={{ marginRight: '10px' }}
                                    />
                                ))}
                                <TextField
                                    type="number"
                                    value={constraint[numVariables]}
                                    onChange={(e) => {
                                        const values = [...constraint];
                                        values[numVariables] = parseInt(e.target.value);
                                        handleConstraintChange(index, values);
                                    }}
                                />
                            </div>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Coeficientes da Função Objetivo
                        </Typography>
                        {objectiveCoefficients.map((value, index) => (
                            <TextField
                                key={index}
                                type="number"
                                value={value}
                                onChange={(e) => {
                                    const values = [...objectiveCoefficients];
                                    values[index] = parseInt(e.target.value);
                                    setObjectiveCoefficients(values);
                                }}
                                style={{ marginRight: '10px' }}
                            />
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={solveProblem}>
                        Solve
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;

interface Problem {
    numVariables: number;
    constraints: Constraint[];
    objectiveCoefficients: Coefficients;
}

type Constraint = number[];
type Coefficients = number[];
