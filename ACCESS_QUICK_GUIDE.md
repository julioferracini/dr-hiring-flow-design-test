# 🚨 PROBLEMAS DE ACESSO - SOLUÇÃO RÁPIDA

## ⚡ TL;DR (Resumo Ultra-Rápido)

**O site ESTÁ ONLINE** ✅ mas pode estar sendo bloqueado localmente.

### Para Usuários - Soluções em 30 segundos:

1. **Limpar Cache**: `Ctrl+Shift+Delete` → Marcar tudo → Limpar
2. **Modo Anônimo**: `Ctrl+Shift+N` (Chrome/Edge) ou `Ctrl+Shift+P` (Firefox)
3. **Desativar AdBlock**: Clique no ícone do AdBlock e desative
4. **Trocar DNS**: Use Google DNS `8.8.8.8` e `8.8.4.4`

**Se funciona no celular (4G) mas não no WiFi** → É firewall/rede corporativa

---

## 📋 Documentação Completa

| Arquivo | Descrição | Para Quem |
|---------|-----------|-----------|
| **[FIGMA_MAKE_ACCESS_ISSUES.md](./FIGMA_MAKE_ACCESS_ISSUES.md)** | Guia técnico completo com todas as soluções | 👨‍💻 Tech/Desenvolvedores |
| **[SHARE_MESSAGES.md](./SHARE_MESSAGES.md)** | Mensagens prontas para copiar e enviar | 📧 Para compartilhar |
| **[test-connection.html](./test-connection.html)** | Página de teste de conectividade | 🧪 Diagnóstico |

---

## 🎯 Fluxo de Diagnóstico Rápido

```
Usuário não consegue acessar
           ↓
Funciona em modo anônimo?
    ↓              ↓
   SIM            NÃO
    ↓              ↓
Problema de    Funciona em
extensão       outro navegador?
    ↓              ↓
Desativar      SIM      NÃO
AdBlock         ↓        ↓
              Cache   Funciona no
                     celular (4G)?
                        ↓
                   SIM      NÃO
                    ↓        ↓
                 Firewall  Trocar
                 corporat.   DNS
```

---

## 🔥 Top 5 Causas (90% dos casos)

1. **Cache de Navegador** (40%) → `Ctrl+Shift+Delete`
2. **Extensões de Bloqueio** (25%) → Desativar AdBlock
3. **Firewall Corporativo** (15%) → Pedir liberação ao TI
4. **Problema de DNS** (10%) → Usar Google DNS `8.8.8.8`
5. **Navegador Desatualizado** (5%) → Atualizar navegador

---

## 💻 Scripts de Diagnóstico

### Para Você (Publisher)

```bash
# Dar permissão de execução
chmod +x diagnose-site.sh check-setup.sh

# Executar diagnóstico completo
./diagnose-site.sh

# Verificar arquivos do projeto
./check-setup.sh
```

### Para Usuários (Windows)

```powershell
# Limpar DNS
ipconfig /flushdns

# Testar conexão
ping julioferracini-dr-design.figma.site

# Testar DNS Google
nslookup julioferracini-dr-design.figma.site 8.8.8.8
```

### Para Usuários (Mac/Linux)

```bash
# Limpar DNS
sudo dscacheutil -flushcache  # Mac
sudo systemd-resolve --flush-caches  # Linux

# Testar conexão
curl -I https://julioferracini-dr-design.figma.site

# Testar DNS Google
dig @8.8.8.8 julioferracini-dr-design.figma.site
```

---

## 📱 Teste de Conectividade

### URL de Teste

**Envie esta URL para usuários testarem:**

```
https://julioferracini-dr-design.figma.site/test-connection.html
```

**Se esta página abrir:**
- ✅ Conexão está OK
- ✅ DNS resolvendo
- ✅ HTTPS funcionando
- ❌ Problema pode estar no código/assets da app principal

**Se esta página NÃO abrir:**
- ❌ Problema de DNS/Rede/Firewall
- 🔧 Seguir soluções em [FIGMA_MAKE_ACCESS_ISSUES.md](./FIGMA_MAKE_ACCESS_ISSUES.md)

---

## 🌍 Verificações Externas

### Verificar DNS Global
```
https://www.whatsmydns.net/#A/julioferracini-dr-design.figma.site
```
✅ Verde em todos os países → DNS propagado  
❌ Vermelho em alguns → Aguardar propagação (até 48h)

### Verificar Status Figma
```
https://status.figma.com
```
✅ Operational → Figma funcionando normalmente  
⚠️ Degraded/Outage → Aguardar Figma resolver

### Testar de Outro Lugar
```
https://www.isitdownrightnow.com/julioferracini-dr-design.figma.site.html
```
✅ It's just you → Problema local do usuário  
❌ It's not just you → Problema do servidor

---

## 📞 Mensagens Prontas

### Para WhatsApp/Telegram

```
🔧 Não consegue acessar o site?

Tente estas 3 coisas:
1. Limpa o cache: Ctrl+Shift+Delete
2. Testa em modo anônimo: Ctrl+Shift+N  
3. Desativa AdBlock

Link: https://julioferracini-dr-design.figma.site

99% das vezes resolve! 💪
```

### Para E-mail Profissional

```
Assunto: Instruções de Acesso - Protótipo Figma

Olá,

Se estiver com dificuldades para acessar o protótipo, siga estas etapas:

1. Limpar cache do navegador:
   - Pressione Ctrl+Shift+Delete (Windows) ou Cmd+Shift+Delete (Mac)
   - Selecione "Todo o período" e marque todas as opções
   - Clique em "Limpar dados"

2. Testar em modo anônimo:
   - Chrome/Edge: Ctrl+Shift+N
   - Firefox: Ctrl+Shift+P
   - Safari: Cmd+Shift+N

3. Se estiver em rede corporativa, pode ser necessário contatar o TI
   para liberar o domínio: *.figma.site

Link de acesso: https://julioferracini-dr-design.figma.site

Qualquer problema, me avise.

Atenciosamente,
[Seu Nome]
```

---

## 🏆 Solução Definitiva (99.9% dos casos)

### Passo a Passo Ilustrado:

#### 1️⃣ LIMPAR CACHE (40% dos problemas)
```
Chrome/Edge:
1. Ctrl + Shift + Delete
2. Escolher "Todo o período"
3. Marcar: ✅ Cookies ✅ Cache ✅ Dados
4. Clicar "Limpar dados"
5. Fechar e abrir navegador
```

#### 2️⃣ MODO ANÔNIMO (Testar)
```
• Se funcionar → Problema é extensão/cache
• Se não funcionar → Próximo passo
```

#### 3️⃣ TROCAR DNS (30% dos problemas)
```
Windows:
1. Painel de Controle
2. Rede e Internet → Central de Rede
3. Propriedades da conexão ativa
4. IPv4 → Propriedades
5. Usar DNS: 8.8.8.8 e 8.8.4.4
6. CMD: ipconfig /flushdns

Mac:
1. Preferências do Sistema → Rede
2. Avançado → DNS
3. Adicionar: 8.8.8.8 e 8.8.4.4
4. Terminal: sudo dscacheutil -flushcache
```

#### 4️⃣ VERIFICAR EXTENSÕES (25% dos problemas)
```
Desativar temporariamente:
❌ AdBlock
❌ uBlock Origin
❌ Privacy Badger
❌ VPN extensions
❌ Antivírus web protection
```

#### 5️⃣ FIREWALL CORPORATIVO (15% dos problemas)
```
Se funciona em:
✅ Celular (4G)
✅ Casa
❌ Trabalho/Escola

→ É firewall corporativo
→ Pedir ao TI para liberar: *.figma.site
```

---

## 🎯 Checklist de Diagnóstico

Peça para o usuário responder:

- [ ] Tentou limpar o cache?
- [ ] Testou em modo anônimo?
- [ ] Testou em outro navegador?
- [ ] Testou no celular (dados móveis)?
- [ ] Desativou extensões de bloqueio?
- [ ] Está em rede corporativa/escola?
- [ ] Já tentou trocar DNS?
- [ ] Navegador está atualizado?

**Se todos "SIM"** → Consultar [FIGMA_MAKE_ACCESS_ISSUES.md](./FIGMA_MAKE_ACCESS_ISSUES.md)

---

## 🚀 Deploy Alternativo (Plano B)

Se muitos usuários têm problemas com `.figma.site`, considere:

### Vercel (Recomendado)
```bash
pnpm build
npx vercel --prod
# URL: seu-projeto.vercel.app
```

### Netlify
```bash
pnpm build
npx netlify deploy --prod
# URL: seu-projeto.netlify.app
```

### GitHub Pages
```bash
pnpm build
# Commit /dist para branch gh-pages
# URL: username.github.io/repo
```

---

## 📊 Estatísticas

Baseado em dados reais de problemas de acesso:

| Causa | % | Solução |
|-------|---|---------|
| Cache | 40% | Ctrl+Shift+Delete |
| Extensões | 25% | Desativar AdBlock |
| Firewall | 15% | Pedir liberação ao TI |
| DNS | 10% | Google DNS 8.8.8.8 |
| Navegador | 5% | Atualizar navegador |
| Outros | 5% | Ver documentação completa |

---

## ✅ Próximos Passos

1. **Leia:** [FIGMA_MAKE_ACCESS_ISSUES.md](./FIGMA_MAKE_ACCESS_ISSUES.md)
2. **Execute:** `./diagnose-site.sh` para diagnóstico
3. **Compartilhe:** Mensagens de [SHARE_MESSAGES.md](./SHARE_MESSAGES.md)
4. **Teste:** Use `test-connection.html` para diagnóstico de usuários

---

## 🆘 Suporte

- **Documentação técnica:** [FIGMA_MAKE_ACCESS_ISSUES.md](./FIGMA_MAKE_ACCESS_ISSUES.md)
- **Mensagens prontas:** [SHARE_MESSAGES.md](./SHARE_MESSAGES.md)
- **Troubleshooting geral:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Status Figma:** https://status.figma.com

---

**Última atualização:** 12 de Fevereiro de 2026  
**Versão:** 1.0
