# /backups

Snapshots completos do projeto, um por sprint, para recuperação rápida.

## Convenção de nome
```
backup-vX.X-AAAA-MM-DD.zip
```
Ex.: `backup-v1.3-2026-06-03.zip`

## O que cada zip contém
`src/`, `index.html`, `package.json`, `vite.config.js`, `tailwind.config.js`,
`postcss.config.js`, `vercel.json`, `.env.example`, `README.md`, `RECOVERY.md`.

## Regra
Gerar um snapshot **antes de iniciar qualquer sprint** que mexa em código.
Os arquivos `.zip` ficam fora do Git (são entregues e guardados à parte) para
não inchar o repositório — este README documenta a convenção.
