"use client";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { simplexMethod } from "../utils/simplexSolver";

const Home: React.FC = () => {
  const [numVariables, setNumVariables] = useState(4);
  const [constraints, setConstraints] = useState<Constraint[]>([
    [1, 2, 4, -1],
    [2, 3, -1, 1],
    [1, 0, 1, 1],
  ]);
  const [constraintsCompartion, setConstraintsCompartion] = useState([
    5000, 15000
  ]);
  const [objectiveCoefficients, setObjectiveCoefficients] =
    useState<Coefficients>([2, 1, -3, 5]);
  const [typeOfFunction, setTypeOfFunction] = useState<"min" | "max">("min")
  const [result, setResult] = useState<{ [key: string]: number }>()

  const handleConstraintChange = (index: number, values: number[]) => {
    const updatedConstraints = [...constraints];
    updatedConstraints[index] = values;
    setConstraints(updatedConstraints);
  };

  const handleVariableNumber = useCallback((numberOfVariables: number) => {
    setNumVariables(numberOfVariables)
    if (numberOfVariables && numberOfVariables < 10) {
      setObjectiveCoefficients(Array(numberOfVariables).fill(0))
      setConstraints(constraints.map(() => Array(numberOfVariables).fill(0)))
      setConstraintsCompartion(constraintsCompartion.fill(0))
    }
  }, [constraints, constraintsCompartion])

  const addConstraint = () => {
    setConstraints([...constraints, Array(numVariables).fill(0)])
    setConstraintsCompartion([...constraintsCompartion, 0])
  }

  const rmConstraint = () => {
    const newConstrants = constraints.filter((_, index) => index !== constraints.length - 1)
    setConstraints(newConstrants)

    const newConstrantsCompartion = constraintsCompartion.filter((_, index) => index !== constraints.length - 1)
    setConstraintsCompartion(newConstrantsCompartion)
  }

  const solveProblem = () => {
    const solution = simplexMethod(
      objectiveCoefficients,
      constraints,
      constraintsCompartion,
      typeOfFunction
    );
    console.log(Object.keys(solution))
    setResult(solution)
  };


  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Simplex Solver
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: '1rem' }}>

              <Select
                type="number"
                value={typeOfFunction}
                onChange={(e) => setTypeOfFunction(e.target.value as "min" | "max")}
                fullWidth
              >
                <MenuItem value="max">Max</MenuItem>
                <MenuItem value="min">Min</MenuItem>
              </Select>
              <TextField
                label="Número de Variáveis"
                type="number"
                value={numVariables}
                onChange={(e) => handleVariableNumber(parseInt(e.target.value))}
                fullWidth
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px", marginBottom: "2rem" }}>
            <Typography variant="h6" gutterBottom>
              Coeficientes da Função Objetivo
            </Typography>
            <div className="flex-center">
              {objectiveCoefficients.map((value, index) => (
                <TextField
                  key={index}
                  type="number"
                  label={"X" + (index + 1)}
                  value={value}
                  onChange={(e) => {
                    const values = [...objectiveCoefficients];
                    values[index] = parseInt(e.target.value);
                    setObjectiveCoefficients(values);
                  }}
                  style={{ marginRight: "10px" }}
                />
              ))}

            </div>
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
                <div className="flex-center">

                  {constraint.map((value, i) => (
                    <TextField
                      key={i}
                      type="number"
                      value={value}
                      label={"X" + (i + 1)}
                      onChange={(e) => {
                        const values = [...constraint];
                        values[i] = parseInt(e.target.value);
                        handleConstraintChange(index, values);
                      }}
                      style={{ marginRight: "10px" }}
                    />
                  ))}
                  <span>{"<="}</span>
                  <TextField
                    type="number"
                    value={constraintsCompartion[index]}
                    onChange={(e) => {
                      const values = [...constraintsCompartion];
                      values[index] = parseInt(e.target.value);
                      setConstraintsCompartion(values);
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="flex-center">
              <Button color="warning" onClick={rmConstraint}>
                - Remover Restrição
              </Button>
              <Button color="primary" onClick={addConstraint}>
                + Adicionar Restrição
              </Button>
            </div>

          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={solveProblem}>
            Resolver problema
          </Button>
        </Grid>

        {result &&
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px", marginBottom: "2rem" }}>
              <h2>Resultado:</h2>
              {Object.keys(result).map(key => (
                // eslint-disable-next-line react/jsx-key
                <p>{key}: {result[key]}</p>
              ))}
            </Paper>
          </Grid>
        }
      </Grid>
    </Container>
  );
};

export default Home;

type Constraint = number[];
type Coefficients = number[];
