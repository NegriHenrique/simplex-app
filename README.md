# Projeto de Otimização Linear com Algoritmo Simplex

Este é um projeto que implementa o algoritmo simplex em Python/TypeScript para resolver problemas de otimização linear. O algoritmo simplex é uma técnica amplamente utilizada para encontrar soluções ótimas para problemas de programação linear, onde o objetivo é maximizar ou minimizar uma função linear sujeita a um conjunto de restrições lineares.

Este projeto inclui a implementação do algoritmo simplex em Python e TypeScript, bem como uma interface de usuário simples para inserir problemas de programação linear e obter soluções. Ele também suporta problemas de maximização e minimização, restrições de igualdade e desigualdade, variáveis de folga e não negativas.

## Funcionalidades
- Resolução de problemas de otimização linear com o algoritmo simplex.
- Suporte para problemas de maximização e minimização.
- Manipulação de restrições de igualdade e desigualdade.
- Suporte para variáveis de folga.
- Interface de usuário simples para entrada de dados e exibição de resultados.

## Autores

- [@NegriHenrique](https://github.com/NegriHenrique)

## Requisitos
- NextJS
- yarn
## Instalação
Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/NegriHenrique/simplex-app
```

Navegue para a pasta do projeto:

```bash
cd simplex-app
```

Rode o projeto no modo desenvolvedor

```bash
yarn dev
```

Estará disponível em http://localhost:3000


## Como Inserir um Problema
Na interface de usuário, insira a função objetivo e as restrições do problema em um formato adequado.

Escolha se é um problema de maximização ou minimização.

Clique no botão "Resolver" para executar o algoritmo simplex e obter a solução.

## Exemplos
Para entender como inserir problemas e obter soluções, aqui estão alguns exemplos de problemas de otimização linear e suas soluções:

Problema de Maximização
Função Objetivo:

```bash
Maximizar Z = 2x1 + x2 - 3x3 + 5x4

Restrições:
1. x1 + 2x2 + 4x3 - x4 ≤ 6
2. 2x1 + 3x2 - x3 + x4 ≤ 12
3. x1 + x3 + x4 ≤ 4

Variáveis de Decisão:
x1, x2, x3, x4 ≥ 0

Resultado Esperado:
A solução ótima é Z = -68 / 3
X1 = 0
X2 = 0
X3 = 0
X4 = 0
S1 = 8 / 3
S2 = 4
S3 = 14 / 3


Problema de Minimização
Função Objetivo: Minimizar Z = x1 - 2x2 + x3

Restrições:
1. x1 + 2x2 - 2x3 ≤ 4
2. 2x1 - 2x3 ≤ 6
3. 2x1 - x2 + 2x3 ≤ 2

Variáveis de Decisão:
x1, x2, x3 ≥ 0

Resultado Esperado:
A solução ótima é Z = -8
X1 = 0
X2 = 0
X3 = 0
S1 = 4
S2 = 14
S3 = 6
```

## Contribuições
Contribuições para este projeto são bem-vindas. Se você encontrar problemas, bugs ou tiver melhorias para sugerir, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato
Para obter mais informações ou entrar em contato, você pode me encontrar no GitHub.
