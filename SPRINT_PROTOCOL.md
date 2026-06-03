# SPRINT_PROTOCOL.md — Regra operacional permanente do PAUZEfem™

> Protocolo obrigatório para **toda sprint que mexa em código**.
> Regra máxima: **nunca alterar produção sem backup prévio.**

---

## Antes de começar (pré-sprint)

1. **Gerar snapshot** da versão atual do projeto.
2. Nomear seguindo a convenção: **`backup-vX.X-AAAA-MM-DD.zip`**
   (conteúdo: `src/`, `index.html`, `package.json`, configs Vite/Tailwind/PostCSS,
   `vercel.json`, `.env.example`, `README.md`, `RECOVERY.md`). Guardar em `/backups`.
3. **Confirmar a versão estável atual** (última tag/release + branch `production-safe`).
4. **Trabalhar em feature branch** (ex.: `feature/<nome>`), nunca direto em `main`.

## Durante / antes do deploy

5. **`npm run build` com 0 erros** — pré-requisito inegociável para qualquer deploy.
6. **Validação manual (mobile)** de TODO o funil:
   - [ ] Landing
   - [ ] Quiz
   - [ ] Resultado
   - [ ] PAUZEfem™ Completo
   - [ ] Checkout Kiwify
   - [ ] Domínio `fem.pauze.com.br` (HTTPS)
   - [ ] `/admin`

## Depois

7. Só **após** build limpo + validação, fazer **merge/deploy** (e atualizar
   `production-safe`).
8. **Atualizar `RECOVERY.md`** quando o processo de rollback mudar.
9. **Entrega de fim de sprint** (sempre informar):
   - snapshot gerado (nome do zip)
   - arquivos alterados
   - status do build
   - URL validada
   - tag/release (se for marco importante)

---

## Definition of Done (resumo)
`snapshot ✓ → feature branch ✓ → build 0 erros ✓ → funil validado ✓ → merge/deploy ✓ → entrega documentada ✓`

Rollback de emergência: **Vercel → Deployments → Promote to Production** (ver `RECOVERY.md`).
