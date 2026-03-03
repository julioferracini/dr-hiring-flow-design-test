# Guia de Deploy Contínuo na Vercel — Para Designers

> **Objetivo:** Publicar protótipos web automaticamente a cada push no GitHub.
> Qualquer pessoa com o link consegue testar no navegador, sem instalar nada.

---

## Por que a Vercel?

| Benefício | O que significa pra você |
| --- | --- |
| **Deploy automático** | Fez push no GitHub → protótipo atualizado em ~60 segundos |
| **Preview por branch** | Cada branch gera uma URL própria. Stakeholders testam versões diferentes ao mesmo tempo |
| **HTTPS grátis** | Links seguros que funcionam em qualquer dispositivo |
| **Plano gratuito** | Projetos pessoais/protótipos não custam nada |
| **Zero configuração** | A Vercel detecta Vite automaticamente |

---

## Pré-requisitos

| Você precisa de | Como conseguir |
| --- | --- |
| Conta no GitHub | [github.com/signup](https://github.com/signup) |
| Repositório com o projeto | Já temos: `julioferracini/dr-hiring-flow-design-test` |
| Conta na Vercel | Próximo passo abaixo |

---

## Passo 1 — Criar conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique **Sign Up**
3. Escolha **Continue with GitHub**
4. Autorize o acesso ao GitHub quando solicitado
5. Pronto — sua conta Vercel está conectada ao GitHub

---

## Passo 2 — Importar o projeto

1. No dashboard da Vercel, clique **Add New → Project**
2. Na lista de repositórios, encontre `dr-hiring-flow-design-test`
   - Se não aparecer, clique **Adjust GitHub App Permissions** e dê acesso ao repo
3. A Vercel vai detectar automaticamente:

| Campo | Valor (auto-detectado) |
| --- | --- |
| Framework Preset | **Vite** |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

4. Clique **Deploy**
5. Aguarde ~60 segundos. Quando aparecer "Congratulations!", seu protótipo está no ar

Você vai receber uma URL como:

```
https://dr-hiring-flow-design-test.vercel.app
```

---

## Passo 3 — Configurar branches de produção e preview

Por padrão a Vercel usa `main` como branch de produção. Como usamos `develop` como branch de integração, vale configurar:

1. No projeto na Vercel, vá em **Settings → Git**
2. Em **Production Branch**, mantenha `main`
3. A Vercel já cria **Preview Deployments** automaticamente para qualquer outra branch

### O que cada branch gera:

| Branch | Tipo de deploy | URL |
| --- | --- | --- |
| `main` | **Production** | `dr-hiring-flow-design-test.vercel.app` |
| `develop` | Preview | `dr-hiring-flow-design-test-git-develop-julio.vercel.app` |
| `feature/nova-tela` | Preview | `dr-hiring-flow-design-test-git-feature-nova-tela-julio.vercel.app` |

---

## Passo 4 — Fluxo do dia a dia

### Cenário: você quer testar uma mudança

```
1. Abra o Cursor
2. Faça suas alterações no código
3. No terminal:

   git add .
   git commit -m "style: ajuste na tela de simulação"
   git push

4. Em ~60 segundos a Vercel publica automaticamente
5. Acesse a URL da sua branch para testar
```

### Cenário: quer mostrar pra alguém revisar

```
1. Faça push da sua branch feature
2. Abra o GitHub e crie um Pull Request para develop
3. A Vercel comenta no PR com o link de preview
4. Envie esse link para quem precisa testar
5. A pessoa abre no celular ou computador — sem instalar nada
```

### Cenário: aprovar e publicar em produção

```
1. Merge o PR de develop → main no GitHub
2. A Vercel faz deploy de produção automaticamente
3. A URL principal é atualizada
```

---

## Passo 5 — Domínio personalizado (opcional)

Se quiser um endereço mais bonito:

1. Vá em **Settings → Domains** no projeto da Vercel
2. Adicione um domínio próprio (ex: `prototipos.suaempresa.com`)
3. Siga as instruções de DNS que a Vercel mostrar

Para protótipos de teste, a URL gratuita `.vercel.app` é suficiente.

---

## Dicas úteis

### Compartilhar link de preview direto

Cada deploy gera uma URL única e permanente. Mesmo depois de novos deploys, URLs antigas continuam funcionando. Isso é útil para documentar versões:

- v1: `https://dr-hiring-flow-xxx-abc123.vercel.app`
- v2: `https://dr-hiring-flow-xxx-def456.vercel.app`

### Proteger com senha (plano Pro)

No plano gratuito, qualquer pessoa com o link acessa. No plano Pro ($20/mês), você pode:
- Adicionar senha por projeto
- Restringir acesso por e-mail

Para protótipos internos de teste, o link não-listado do plano gratuito geralmente basta.

### Ver logs de deploy

Se algo der errado:
1. Vá ao dashboard da Vercel
2. Clique no deploy que falhou
3. Veja os logs — geralmente o erro aparece claramente

---

## Resumo visual do fluxo

```
┌─────────────────────────────────────────────────────────────┐
│                      SEU COMPUTADOR                         │
│                                                             │
│  Cursor IDE  →  git push  →  GitHub                         │
│                                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL                              │
│                                                             │
│  1. Detecta o push                                          │
│  2. Roda pnpm install                                       │
│  3. Roda pnpm build                                         │
│  4. Publica o resultado                                     │
│  5. Gera URL pública                                        │
│                                                             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     QUALQUER NAVEGADOR                      │
│                                                             │
│  Stakeholder abre o link → testa o protótipo                │
│  Celular, tablet, desktop — sem instalar nada               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Checklist de setup

- [ ] Conta no GitHub criada
- [ ] Repositório com push feito
- [ ] Conta na Vercel criada (via GitHub)
- [ ] Projeto importado na Vercel
- [ ] Primeiro deploy funcionando
- [ ] Link compartilhado com a equipe

---

## Perguntas frequentes

**Preciso pagar algo?**
Não. O plano Hobby (gratuito) da Vercel é suficiente para protótipos.

**Funciona no celular?**
Sim. O protótipo é responsivo (375x812) e qualquer navegador mobile acessa a URL.

**E se eu quebrar o protótipo?**
Cada deploy é independente. Se o build falhar, a última versão que funcionou continua no ar. Nada quebra para quem está testando.

**Quantas pessoas podem acessar ao mesmo tempo?**
No plano gratuito, não há limite prático para protótipos de teste.

**Preciso saber programar?**
Só precisa saber usar o terminal para `git add`, `git commit` e `git push`. O resto é automático.

**Posso ter vários protótipos ao mesmo tempo?**
Sim. Cada repositório vira um projeto separado na Vercel, cada um com sua URL.
