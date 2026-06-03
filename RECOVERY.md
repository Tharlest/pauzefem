# RECOVERY.md — PAUZEfem™

Guia de recuperação rápida. Objetivo: **voltar a produção a um estado bom em minutos**,
sem depender de memória. Três caminhos de rollback, do mais rápido ao mais completo.

---

## 0. Versão atual segura

> **v1.3-landing-premium** — domínio `fem.pauze.com.br` no ar (HTTPS), funil
> Landing → Quiz → Resultado → PAUZEfem™ Completo → Checkout Kiwify, analytics e
> área `/admin` funcionando. Marcada como Release no GitHub e refletida na branch
> `production-safe`.

Histórico de versões: ver seção "Versionamento" no `README.md`.

---

## 1. Rollback instantâneo na Vercel (RECOMENDADO — segundos)

A Vercel guarda **todos os deploys**. Reverter NÃO precisa de Git nem build.

1. Acesse: https://vercel.com/tharles-projects/pauzefem/deployments
2. Encontre um deploy antigo com status **Ready** que você sabe que funcionava.
3. Clique nos **três pontinhos (⋯)** do deploy → **Promote to Production**
   (ou **Rollback**).
4. Em segundos, `fem.pauze.com.br` volta a servir aquele deploy. HTTPS é mantido.

Use isto quando "acabou de quebrar" — é o caminho mais rápido e seguro.

---

## 2. Rollback por código (Git) — voltar a uma versão/tag

Quando você quer que o **repositório** também volte (não só o deploy servido).

### Opção A — pela interface do GitHub (sem terminal)
1. Vá em https://github.com/Tharlest/pauzefem/releases e abra a release alvo
   (ex.: **v1.2-admin-panel**).
2. Em **Tags**, copie o estado dessa tag.
3. Crie uma branch a partir da tag (botão "Browse files" → "..." → branch) e abra
   um Pull Request dela para `main`, ou use "Revert" nos commits problemáticos.
4. Ao mergear em `main`, a Vercel redeploya automaticamente aquele estado.

### Opção B — com Git local (terminal)
```bash
# ver as tags disponíveis
git fetch --tags
git tag

# voltar main para uma versão (ex.: v1.2-admin-panel)
git checkout main
git reset --hard v1.2-admin-panel
git push --force-with-lease origin main
```
> Atenção: `reset --hard` reescreve o histórico de `main`. Prefira o caminho 1
> (Vercel) para urgências e o caminho 2A (PR/Revert) para mudanças controladas.

### Exemplo — rollback para v1.2
1. Vercel → Deployments → promova o último deploy "Ready" da época do admin; **ou**
2. GitHub → `git reset --hard v1.2-admin-panel && git push --force-with-lease`.

---

## 3. Restaurar a partir de um snapshot (.zip)

Cada sprint gera um backup em `backups/backup-vX.X-AAAA-MM-DD.zip` (entregue a você).
Se o repositório for perdido:

1. Extraia o `.zip` numa pasta limpa.
2. `npm install`
3. `npm run build` (deve dar **0 erros**)
4. Suba os arquivos para o GitHub (ou `vercel deploy`).

O zip contém: `src/`, `index.html`, `package.json`, `vite.config.js`,
`tailwind.config.js`, `postcss.config.js`, `vercel.json`, `.env.example`,
`README.md`, `RECOVERY.md`.

---

## 4. Variáveis de ambiente (reconfigurar após restore)

Não vão no código. Recrie em Vercel → Settings → Environment Variables:

| Variável | Função |
| --- | --- |
| `VITE_KIWIFY_CHECKOUT_URL` | URL do checkout Kiwify |
| `VITE_ADMIN_PASSWORD` | senha da área `/admin` |

Depois de recriar, faça **Redeploy** (variáveis `VITE_` entram no build).

---

## 5. Checklist pós-rollback (validação manual)

Sempre confirme, no celular:
- [ ] Landing abre (`fem.pauze.com.br`)
- [ ] Quiz funciona (15 perguntas)
- [ ] Resultado aparece
- [ ] PAUZEfem™ Completo abre
- [ ] Checkout Kiwify abre
- [ ] `/admin` abre com a senha
- [ ] HTTPS ativo (cadeado)
