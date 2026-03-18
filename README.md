# ValueHunter API — Proxy SofaScore

Backend gratuito que resolve o CORS do SofaScore para o ValueHunter.

## Deploy no Vercel (grátis)

1. Crie conta em vercel.com
2. Instale o Vercel CLI ou use o GitHub
3. Faça deploy deste repositório

## Endpoints

### Stats de um time
```
GET /api/team-stats?teamId=123&tournamentId=325&seasonId=68478
```

### Standings de uma liga
```
GET /api/standings?tournamentId=325&seasonId=68478
```

## Como funciona

O browser não consegue chamar a API do SofaScore diretamente por CORS.
Este proxy roda no servidor Vercel, busca os dados e retorna com os headers
corretos para o browser aceitar.
