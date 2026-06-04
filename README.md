# PAUZEfem™ — Seu corpo de volta ao eixo

Um guia inteligente de bem-estar para mulheres 40+ que sentem o corpo pesado,
inchado, cansado ou fora de sintonia. MVP web, mobile-first, dark premium neon.

> **Aviso:** ferramenta educacional de bem-estar. Não diagnostica, trata, cura ou
> previne doenças. Consulte profissionais de saúde para orientações individuais.

---

## Como rodar

Pré-requisito: **Node.js 18+** instalado.

```bash
npm install
npm run dev
```

O terminal vai mostrar um endereço local (ex.: `http://localhost:5173`).
Abra no navegador — de preferência no modo mobile (DevTools → ícone de celular).

Para gerar a versão de produção:

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve o build localmente
```

---

## O que está incluído

1. **Landing page** — headline, subheadline e CTA do diagnóstico.
2. **Quiz PAUZE™** — 15 perguntas (com inversão de pontuação nas positivas).
3. **PAUZE Score™** — converte respostas em 0–100 e classifica em 4 faixas.
4. **Tela de resultado** — score animado, barra neon e mensagem acolhedora.
5. **PAUZE Reset — 7 Dias™** — 7 dias temáticos com checklist pontuado.
6. **Dashboard diário** — score, pontos do dia, sequência, check-in rápido.
7. **Lista Inteligente PAUZE™** — feira, mercado e suplementos (com aviso).
8. **Gamificação** — pontos em tempo real, barra animada e mensagens de incentivo.

Todo o progresso é salvo no **localStorage** do navegador — sem backend, sem cadastro.

---

## Estrutura de arquivos

Coloque tudo dentro de uma pasta `pauzefem/`:

```
pauzefem/
├── index.html                 # HTML raiz + fonte Inter
├── package.json               # dependências e scripts
├── vite.config.js             # config do Vite + plugin React
├── tailwind.config.js         # tema dark neon (cores, animações)
├── postcss.config.js          # Tailwind + autoprefixer
├── .gitignore
├── README.md
└── src/
    ├── main.jsx               # ponto de entrada React
    ├── App.jsx                # providers + roteamento entre telas
    ├── index.css              # base Tailwind + fundo neon
    ├── data/
    │   ├── quiz.js            # 15 perguntas + lógica de inversão
    │   ├── program.js         # 7 dias + itens do checklist
    │   └── lists.js           # lista inteligente, check-in, frases
    ├── utils/
    │   ├── score.js           # cálculo do score e faixas
    │   ├── storage.js         # localStorage + hook + datas/streak
    │   ├── store.jsx          # estado global (Context)
    │   └── feedback.js        # haptics + stub de áudio (futuro)
    ├── components/
    │   ├── Logo.jsx
    │   ├── NeonBar.jsx        # barra de progresso neon
    │   ├── BottomNav.jsx      # navegação inferior mobile
    │   ├── Footer.jsx         # disclaimer
    │   ├── Toast.jsx          # mensagens de incentivo
    │   └── ui.jsx             # Button, Card, Stat
    └── screens/
        ├── Home.jsx
        ├── Quiz.jsx
        ├── Result.jsx
        ├── Reset.jsx
        ├── Dashboard.jsx
        └── SmartList.jsx
```

---

## Como pontua o quiz

- Respostas padrão: `Nunca = 0`, `Às vezes = 1`, `Frequentemente = 2`, `Quase sempre = 3`.
- Perguntas positivas (**caminhar 20 min** e **consumir fibras**) têm pontuação
  invertida: `Nunca = 3 … Quase sempre = 0`.
- `scoreRisco = soma / pontuaçãoMáxima × 100` · `scoreBemEstar = 100 − scoreRisco`.

| scoreBemEstar | Faixa                              | Cor da barra   |
| ------------- | ---------------------------------- | -------------- |
| 0–25          | Corpo fora do eixo                 | Vermelho       |
| 26–50         | Corpo sobrecarregado               | Laranja/Amarelo|
| 51–75         | Corpo pedindo pequenos ajustes     | Amarelo/Verde  |
| 76–100        | Corpo em equilíbrio                | Verde neon     |

---

## Som (preparado para o futuro)

A gamificação já tem o ponto de integração de áudio pronto em
`src/utils/feedback.js` (`playChime`). Hoje ele usa apenas vibração leve quando
disponível. Para ativar som real, basta plugar um `new Audio(...)` ali e ligar o
estado `soundOn` no store.

---

## Deploy na Vercel (1 clique, sem terminal)

O projeto já vem com `vercel.json` configurado (framework Vite + fallback SPA).

### Opção A — Upload direto (sem Git, sem terminal)
1. Crie uma conta grátis em https://vercel.com (pode entrar com Google/GitHub).
2. No painel, clique em **Add New… → Project**.
3. Escolha **importar/arrastar** a pasta do projeto (a pasta `pauzefem/` extraída do zip).
4. A Vercel detecta o Vite automaticamente. Confirme os campos:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Clique em **Deploy**. Em ~1 min você recebe uma URL pública
   (ex.: `https://pauzefem.vercel.app`).

### Opção B — Via GitHub (recomendado para atualizar depois)
1. Suba a pasta do projeto para um repositório no GitHub.
2. Em Vercel: **Add New… → Project → Import** o repositório.
3. Mesmos campos da Opção A → **Deploy**.

### Subdomínio personalizado (fem.pauze.com.br)
1. No projeto da Vercel: **Settings → Domains → Add**.
2. Digite `fem.pauze.com.br` e confirme.
3. A Vercel mostra um registro **CNAME**. No painel DNS do domínio `pauze.com.br`
   (Registro.br, Cloudflare, etc.), crie:
   - **Tipo:** `CNAME`
   - **Nome/Host:** `fem`
   - **Valor/Aponta para:** `cname.vercel-dns.com`
4. Salve. Em alguns minutos (propagação DNS) o endereço
   `https://fem.pauze.com.br` fica no ar, com HTTPS automático.

---

## Versionamento, backup e recovery

Estratégia de versões (tags/releases no GitHub):

| Versão | Marco |
| --- | --- |
| `v0.9-mvp-working` | MVP funcional (quiz, score, reset, dashboard) |
| `v1.0-domain-live` | `fem.pauze.com.br` no ar com HTTPS |
| `v1.1-premium-kiwify` | Tela PAUZEfem™ Completo + checkout Kiwify por env var |
| `v1.2-admin-panel` | Área `/admin` + editor de perguntas (localStorage) |
| `v1.3-landing-premium` | Landing premium + refinamentos + analytics |
| `v1.4-conversao-captura` | Captura de lead + heatmap/painel no /admin + A/B de headlines (**atual**) |
| `v1.5-axis-score` | (planejado) eixos/categorias e pesos por pergunta |

Branch de produção estável: **`production-safe`** — só recebe código já validado.

Fluxo recomendado:
```
feature/ajuste  →  npm run build (0 erros)  →  validação manual  →  merge em main
                                                                    →  atualizar production-safe + tag
```

Snapshots ficam em `backups/` (convenção em `backups/README.md`). Recuperação
passo a passo em **`RECOVERY.md`**.

## Regra de deploy (obrigatória)

Nunca subir código sem:

1. `npm run build` com **0 erros**.
2. Validação manual no celular: **landing · quiz · resultado · PAUZEfem™ Completo ·
   checkout · domínio (HTTPS) · /admin**.

Em caso de problema em produção, use o **rollback instantâneo da Vercel**
(Deployments → ⋯ → Promote to Production) — ver `RECOVERY.md`.
