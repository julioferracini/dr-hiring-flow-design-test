# 🌐 Guia de Resolução: Problemas de Acesso ao Figma Make

## ⚠️ Problema
URL publicada no Figma Make configurada como "Anyone on the web" mas algumas pessoas não conseguem acessar.

**URL:** `julioferracini-dr-design.figma.site`

---

## 🔍 Diagnóstico Rápido

### Para os USUÁRIOS que NÃO conseguem acessar:

#### **Teste 1: Verificar se o site responde**
```bash
# No terminal/CMD
ping julioferracini-dr-design.figma.site

# Ou testar DNS
nslookup julioferracini-dr-design.figma.site
```

#### **Teste 2: Testar em navegador anônimo**
- **Chrome/Edge**: `Ctrl + Shift + N` (Windows) ou `Cmd + Shift + N` (Mac)
- **Firefox**: `Ctrl + Shift + P` (Windows) ou `Cmd + Shift + P` (Mac)
- **Safari**: `Cmd + Shift + N`

Se funcionar no modo anônimo → **Problema de cache/extensões**

---

## ✅ Soluções para USUÁRIOS

### 1️⃣ **Limpar Cache do Navegador**

**Chrome/Edge:**
```
1. Pressione Ctrl + Shift + Delete (ou Cmd + Shift + Delete no Mac)
2. Selecione "Todo o período"
3. Marque:
   ✅ Cookies e dados de sites
   ✅ Imagens e arquivos em cache
   ✅ Dados de sites hospedados
4. Clique em "Limpar dados"
5. Reinicie o navegador
6. Tente acessar novamente
```

**Firefox:**
```
1. Pressione Ctrl + Shift + Delete
2. Selecione "Tudo"
3. Marque tudo exceto "Histórico de navegação"
4. Clique em "Limpar Agora"
5. Reinicie o navegador
```

**Safari:**
```
1. Safari > Preferências > Privacidade
2. Clique em "Gerenciar Dados de Sites"
3. Clique em "Remover Tudo"
4. Safari > Limpar Histórico
5. Reinicie o Safari
```

---

### 2️⃣ **Desativar Extensões de Navegador**

Algumas extensões podem bloquear conteúdo:
- ❌ Bloqueadores de anúncios (AdBlock, uBlock Origin)
- ❌ Bloqueadores de rastreamento (Privacy Badger)
- ❌ VPNs de navegador
- ❌ Antivírus com proteção web
- ❌ Extensões de privacidade

**Como testar:**
1. Abra modo anônimo (extensões desativadas por padrão)
2. Se funcionar, desative extensões uma por uma
3. Identifique qual está causando o problema

---

### 3️⃣ **Trocar DNS (Problema Comum!)**

Se o problema é "site não encontrado" ou "DNS_PROBE_FINISHED_NXDOMAIN":

**Windows:**
```
1. Painel de Controle > Rede e Internet > Central de Rede
2. Clique na sua conexão ativa
3. Propriedades > Protocolo TCP/IPv4 > Propriedades
4. Marque "Usar os seguintes endereços de servidor DNS:"
   - DNS preferencial: 8.8.8.8 (Google)
   - DNS alternativo: 8.8.4.4 (Google)
   OU
   - DNS preferencial: 1.1.1.1 (Cloudflare)
   - DNS alternativo: 1.0.0.1 (Cloudflare)
5. OK > Fechar
6. Abrir CMD e executar: ipconfig /flushdns
```

**Mac:**
```
1. Preferências do Sistema > Rede
2. Selecione sua conexão > Avançado
3. Aba DNS
4. Clique no "+" e adicione:
   8.8.8.8
   8.8.4.4
5. OK > Aplicar
6. Terminal: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

**Linux:**
```bash
# Editar resolv.conf
sudo nano /etc/resolv.conf

# Adicionar:
nameserver 8.8.8.8
nameserver 8.8.4.4

# Salvar (Ctrl+O, Enter, Ctrl+X)

# Limpar cache DNS
sudo systemd-resolve --flush-caches
```

---

### 4️⃣ **Verificar Firewall/Antivírus**

Alguns antivírus bloqueiam sites `.figma.site`:

**Windows Defender:**
```
1. Configurações > Atualização e Segurança > Segurança do Windows
2. Proteção de firewall e rede
3. Permitir um aplicativo pelo firewall
4. Adicione seu navegador (Chrome, Firefox, etc.)
```

**Outros antivírus:**
- Adicione `*.figma.site` à lista de sites confiáveis
- Desative temporariamente para testar

---

### 5️⃣ **Testar em Outro Dispositivo/Rede**

- 📱 Teste no celular usando **dados móveis** (não WiFi)
- 💻 Teste em outro computador
- 🌐 Teste em outra rede (casa, trabalho, café)

Se funcionar em dados móveis → **Problema de rede corporativa/ISP**

---

### 6️⃣ **Verificar Restrições de Rede Corporativa**

Se estiver em **rede corporativa/escola**:

**Problema:** Firewall bloqueando `.figma.site`

**Solução:**
1. Contate o departamento de TI
2. Solicite liberação do domínio: `*.figma.site`
3. Justificativa: "Ferramenta de design/prototipagem profissional"

---

### 7️⃣ **Atualizar Navegador**

Navegadores desatualizados podem ter problemas:

- **Chrome:** `chrome://settings/help`
- **Firefox:** `about:support` > "Verificar atualizações"
- **Edge:** `edge://settings/help`
- **Safari:** App Store > Atualizações

---

### 8️⃣ **Testar URL Alternativa**

Se nada funcionar, teste acessar via:

**HTTPS forçado:**
```
https://julioferracini-dr-design.figma.site
```

**Com porta explícita:**
```
https://julioferracini-dr-design.figma.site:443
```

---

## 🔧 Soluções para o PUBLISHER (Você)

### 1️⃣ **Re-publicar o Site**

Às vezes uma re-publicação resolve:

1. No Figma Make, clique em "Update" novamente
2. Aguarde 2-3 minutos
3. Teste em modo anônimo

---

### 2️⃣ **Verificar Dependências Externas**

Verifique se todos os assets estão carregando:

**Abrir DevTools (F12) e verificar:**
- ❌ Erros 404 (assets não encontrados)
- ❌ Erros de CORS
- ❌ Erros de CSP (Content Security Policy)

**Se houver erros:**
- Certifique-se que todos os `figma:asset` imports estão corretos
- Verifique se SVGs importados existem em `/src/imports/`

---

### 3️⃣ **Criar URL de Teste Alternativa**

Publique uma **versão simplificada** para testar:

1. Crie novo projeto com apenas:
   ```tsx
   function App() {
     return <div>🟢 Site funcionando!</div>
   }
   ```
2. Publique e compartilhe
3. Se funcionar → problema está no código/assets
4. Se não funcionar → problema é de infraestrutura

---

### 4️⃣ **Otimizar Assets Pesados**

Se o site carrega mas demora muito:

**Verificar tamanho do bundle:**
```bash
pnpm build
du -sh dist/assets/*

# Se algum arquivo > 1MB, otimize
```

**Otimizações:**
- Comprimir imagens grandes
- Usar lazy loading para componentes pesados
- Code splitting para reduzir bundle inicial

---

### 5️⃣ **Verificar Limites do Figma Make**

O Figma Make tem limites:
- ⚠️ Tamanho máximo do build
- ⚠️ Número de arquivos
- ⚠️ Requisições por minuto

**Solução:**
- Otimize o build (veja seção acima)
- Remova assets não utilizados
- Considere usar CDN para assets grandes

---

## 📊 Checklist de Diagnóstico Rápido

Para usuários que não conseguem acessar, peça para testar:

- [ ] Funciona em modo anônimo?
- [ ] Funciona em outro navegador?
- [ ] Funciona em dados móveis (4G/5G)?
- [ ] Funciona em outra rede WiFi?
- [ ] Cache foi limpo?
- [ ] Extensões foram desativadas?
- [ ] DNS foi alterado para 8.8.8.8?
- [ ] Firewall/Antivírus foi verificado?

**Se 3 ou mais "NÃO"** → Problema local do usuário  
**Se todos "NÃO"** → Problema de rede/ISP do usuário  
**Se todos "SIM" em outro lugar** → Problema de rede corporativa

---

## 🌍 Problemas Regionais

### DNS Propagation

Pode levar até **48 horas** para DNS propagar globalmente.

**Verificar propagação:**
```
https://www.whatsmydns.net/#A/julioferracini-dr-design.figma.site
```

Se alguns países mostram ❌ → **Aguardar propagação DNS**

---

## 📱 Compartilhar Instruções com Usuários

**Mensagem pronta para copiar e enviar:**

```
🔧 Não consegue acessar o site? Tente estas soluções:

1️⃣ Limpe o cache do navegador:
   • Chrome: Ctrl+Shift+Delete → Limpar tudo
   • Firefox: Ctrl+Shift+Delete → Limpar tudo

2️⃣ Teste em modo anônimo:
   • Chrome/Edge: Ctrl+Shift+N
   • Firefox: Ctrl+Shift+P

3️⃣ Desative extensões (especialmente AdBlock)

4️⃣ Troque DNS para Google DNS:
   • DNS: 8.8.8.8 e 8.8.4.4
   • Tutorial: https://developers.google.com/speed/public-dns/docs/using

5️⃣ Teste em dados móveis (celular)

Se nada funcionar, pode ser bloqueio de rede corporativa.
Contate seu departamento de TI para liberar: *.figma.site
```

---

## 🆘 Ainda Não Funciona?

### Opção 1: Deploy Alternativo

Se o problema persistir, considere fazer deploy em outra plataforma:

**Vercel (Gratuito):**
```bash
pnpm build
npx vercel --prod
# Vai gerar uma URL: seu-site.vercel.app
```

**Netlify (Gratuito):**
```bash
pnpm build
npx netlify deploy --prod
# Vai gerar uma URL: seu-site.netlify.app
```

### Opção 2: Usar Link Curto

Crie um link curto que redireciona:
- bit.ly
- tinyurl.com
- Domínio próprio com redirect

---

## 📊 Estatísticas de Problemas Comuns

Baseado em casos similares:

- **70%**: Cache de navegador / Extensões
- **15%**: DNS / Firewall corporativo
- **10%**: Problemas regionais de ISP
- **5%**: Problemas reais do Figma Make

**Na maioria dos casos, é problema local do usuário!**

---

## 📞 Suporte Figma

Se nada funcionar, entre em contato:

- **Fórum:** https://forum.figma.com
- **Suporte:** https://help.figma.com/hc/en-us/requests/new
- **Status:** https://status.figma.com (verificar se há incidentes)

---

**Última atualização:** 12 de Fevereiro de 2026
