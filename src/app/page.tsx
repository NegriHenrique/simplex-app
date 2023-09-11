"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import {simplexMethod}from "../utils/simplexSolver";

const Home: React.FC = () => {
  const [numVariables, setNumVariables] = useState(7);
  const [constraints, setConstraints] = useState<Constraint[]>([
    [1, 2, 4, -1],
    [2, 3, -1, 1],
    [1, 0, 1, 1],
  ]);
  const [constraintsCompartion, setConstraintsCompartion] = useState([
    6, 12, 4,
  ]);
  const [objectiveCoefficients, setObjectiveCoefficients] =
    useState<Coefficients>([2, 1, -3, 5]);

  const handleConstraintChange = (index: number, values: number[]) => {
    const updatedConstraints = [...constraints];
    updatedConstraints[index] = values;
    setConstraints(updatedConstraints);
  };

  const solveProblem = () => {
    const solution = simplexMethod(
      objectiveCoefficients,
      constraints,
      constraintsCompartion,
      "max"
    );

    console.log(`Problema: 
    
                Maximizar f(x1, x2, x3, x4) = 2x1 + x2 − 3x3 + 5x4, sujeito as restrições,

                x1 + 2x2 + 4x3 − x4 ≤ 6
                2x1 + 3x2 − x3 + x4 ≤ 12
                x1 + 0x2 + x3 + x4 ≤ 4
                x1, x2, x3, x4 ≥ 0.

               
    `)
    console.log("Solução: ", solution)

    
    const objectiveCoefficients2 = [1, -2, 1];
    const constraints2 = [
      [1, 2, -2],
      [2, 0, -2],
      [2, -1, 2],
    ];
    const constraintsCompartion2 =  [4, 6, 2];

    const solution2 = simplexMethod(
      objectiveCoefficients2,
      constraints2,
      constraintsCompartion2,
      "min"
    );
    console.log(`Problema:  
                
                Minimizar f(x1, x2, x3) = x1 − 2x2 + x3, sujeito as restrições,

                x1 + 2x2 − 2x3 ≤ 4
                2x1 + 0x2 − 2x3 ≤ 6
                2x1 − x2 + 2x3 ≤ 2
                x1, x2, x3 ≥ 0.

    `)
    console.log("Solução: ", solution2)

  };

  solveProblem();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Simplex Solver
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
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
          <Paper elevation={3} style={{ padding: "20px" }}>
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
                    style={{ marginRight: "10px" }}
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
          <Paper elevation={3} style={{ padding: "20px" }}>
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
                style={{ marginRight: "10px" }}
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

type Constraint = number[];
type Coefficients = number[];
