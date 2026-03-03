#!/bin/bash

# 🔍 Script de Diagnóstico - Figma Make Site
# Execute este script para verificar se o site está acessível

SITE_URL="julioferracini-dr-design.figma.site"
FULL_URL="https://${SITE_URL}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo ""
echo -e "${BOLD}🔍 DIAGNÓSTICO DE ACESSO - FIGMA MAKE${NC}"
echo -e "Site: ${BLUE}${SITE_URL}${NC}"
echo "=================================================="
echo ""

# Test 1: DNS Resolution
echo -e "${BOLD}1️⃣ Testando resolução DNS...${NC}"
if host "$SITE_URL" > /dev/null 2>&1; then
    IP=$(host "$SITE_URL" | grep "has address" | awk '{print $4}' | head -n1)
    echo -e "${GREEN}✅ DNS resolvido com sucesso${NC}"
    echo -e "   IP: ${IP}"
else
    echo -e "${RED}❌ Falha na resolução DNS${NC}"
    echo -e "   ${YELLOW}Solução: Trocar DNS para 8.8.8.8${NC}"
fi
echo ""

# Test 2: Ping
echo -e "${BOLD}2️⃣ Testando conectividade (ping)...${NC}"
if ping -c 3 "$SITE_URL" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Servidor respondendo ao ping${NC}"
    PING_TIME=$(ping -c 1 "$SITE_URL" | grep "time=" | awk -F'time=' '{print $2}' | awk '{print $1}')
    echo -e "   Latência: ${PING_TIME}ms"
else
    echo -e "${YELLOW}⚠️  Ping bloqueado (normal para alguns servidores)${NC}"
fi
echo ""

# Test 3: HTTP/HTTPS Status
echo -e "${BOLD}3️⃣ Testando acesso HTTP/HTTPS...${NC}"
HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" -L "$FULL_URL" --max-time 10)
if [ "$HTTP_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ Site acessível (HTTP $HTTP_STATUS)${NC}"
elif [ "$HTTP_STATUS" -eq 301 ] || [ "$HTTP_STATUS" -eq 302 ]; then
    echo -e "${GREEN}✅ Site redirecionando corretamente (HTTP $HTTP_STATUS)${NC}"
else
    echo -e "${RED}❌ Erro de acesso (HTTP $HTTP_STATUS)${NC}"
    echo -e "   ${YELLOW}Código de status HTTP: $HTTP_STATUS${NC}"
fi
echo ""

# Test 4: Response Time
echo -e "${BOLD}4️⃣ Medindo tempo de resposta...${NC}"
RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}" "$FULL_URL" --max-time 10)
RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc)
if (( $(echo "$RESPONSE_TIME < 2" | bc -l) )); then
    echo -e "${GREEN}✅ Resposta rápida: ${RESPONSE_MS}ms${NC}"
elif (( $(echo "$RESPONSE_TIME < 5" | bc -l) )); then
    echo -e "${YELLOW}⚠️  Resposta moderada: ${RESPONSE_MS}ms${NC}"
else
    echo -e "${RED}❌ Resposta lenta: ${RESPONSE_MS}ms${NC}"
fi
echo ""

# Test 5: SSL Certificate
echo -e "${BOLD}5️⃣ Verificando certificado SSL...${NC}"
if openssl s_client -connect "${SITE_URL}:443" -servername "$SITE_URL" < /dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
    echo -e "${GREEN}✅ Certificado SSL válido${NC}"
    CERT_EXPIRY=$(echo | openssl s_client -connect "${SITE_URL}:443" -servername "$SITE_URL" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    echo -e "   Válido até: ${CERT_EXPIRY}"
else
    echo -e "${RED}❌ Problema com certificado SSL${NC}"
fi
echo ""

# Test 6: Headers
echo -e "${BOLD}6️⃣ Analisando cabeçalhos HTTP...${NC}"
HEADERS=$(curl -s -I -L "$FULL_URL" --max-time 10)
echo "$HEADERS" | grep -i "content-type" | while read line; do
    echo -e "${GREEN}✅${NC} $line"
done
echo "$HEADERS" | grep -i "x-" | while read line; do
    echo -e "   $line"
done
echo ""

# Test 7: DNS Propagation Check
echo -e "${BOLD}7️⃣ Verificando propagação DNS global...${NC}"
echo -e "   🌍 Testando servidores DNS:"

# Test with Google DNS
GOOGLE_DNS=$(dig @8.8.8.8 +short "$SITE_URL" | head -n1)
if [ -n "$GOOGLE_DNS" ]; then
    echo -e "   ${GREEN}✅ Google DNS (8.8.8.8): $GOOGLE_DNS${NC}"
else
    echo -e "   ${RED}❌ Google DNS (8.8.8.8): Não resolvido${NC}"
fi

# Test with Cloudflare DNS
CLOUDFLARE_DNS=$(dig @1.1.1.1 +short "$SITE_URL" | head -n1)
if [ -n "$CLOUDFLARE_DNS" ]; then
    echo -e "   ${GREEN}✅ Cloudflare DNS (1.1.1.1): $CLOUDFLARE_DNS${NC}"
else
    echo -e "   ${RED}❌ Cloudflare DNS (1.1.1.1): Não resolvido${NC}"
fi
echo ""

# Test 8: Check for common blocking
echo -e "${BOLD}8️⃣ Verificando bloqueios comuns...${NC}"
if curl -s "$FULL_URL" --max-time 10 | grep -q "figma"; then
    echo -e "${GREEN}✅ Conteúdo Figma carregando${NC}"
else
    echo -e "${YELLOW}⚠️  Conteúdo Figma não detectado${NC}"
fi

if curl -s "$FULL_URL" --max-time 10 | grep -q "react"; then
    echo -e "${GREEN}✅ React detectado${NC}"
else
    echo -e "${YELLOW}⚠️  React não detectado na resposta${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo -e "${BOLD}📊 RESUMO DO DIAGNÓSTICO${NC}"
echo "=================================================="
echo ""

if [ "$HTTP_STATUS" -eq 200 ] && [ -n "$IP" ]; then
    echo -e "${GREEN}${BOLD}✅ SITE TOTALMENTE FUNCIONAL${NC}"
    echo ""
    echo "O site está online e acessível. Se usuários relatam"
    echo "problemas, verifique:"
    echo "• Cache do navegador"
    echo "• Extensões de bloqueio (AdBlock, etc)"
    echo "• Firewall/antivírus"
    echo "• DNS local (recomendar Google DNS: 8.8.8.8)"
else
    echo -e "${RED}${BOLD}❌ PROBLEMAS DETECTADOS${NC}"
    echo ""
    echo "Ações recomendadas:"
    if [ -z "$IP" ]; then
        echo "• DNS não está resolvendo - verificar configuração"
    fi
    if [ "$HTTP_STATUS" -ne 200 ]; then
        echo "• Site retornou erro HTTP $HTTP_STATUS"
        echo "• Verificar configuração do Figma Make"
        echo "• Tentar re-publicar o site"
    fi
fi

echo ""
echo -e "Para mais informações, consulte:"
echo -e "${BLUE}FIGMA_MAKE_ACCESS_ISSUES.md${NC}"
echo ""

# Test 9: Generate shareable report
echo -e "${BOLD}9️⃣ Gerando relatório compartilhável...${NC}"
REPORT_FILE="diagnostic_report_$(date +%Y%m%d_%H%M%S).txt"
{
    echo "RELATÓRIO DE DIAGNÓSTICO - FIGMA MAKE"
    echo "====================================="
    echo "Site: $SITE_URL"
    echo "Data: $(date)"
    echo ""
    echo "DNS Resolvido: $IP"
    echo "HTTP Status: $HTTP_STATUS"
    echo "Tempo de Resposta: ${RESPONSE_MS}ms"
    echo "SSL Válido: $(echo | openssl s_client -connect "${SITE_URL}:443" -servername "$SITE_URL" 2>/dev/null | grep -q "Verify return code: 0" && echo "Sim" || echo "Não")"
    echo ""
    echo "DNS Google (8.8.8.8): $GOOGLE_DNS"
    echo "DNS Cloudflare (1.1.1.1): $CLOUDFLARE_DNS"
    echo ""
    echo "Cabeçalhos HTTP:"
    echo "$HEADERS"
} > "$REPORT_FILE"

echo -e "${GREEN}✅ Relatório salvo em: $REPORT_FILE${NC}"
echo ""

# Test 10: Quick fixes
echo -e "${BOLD}🔧 COMANDOS RÁPIDOS DE CORREÇÃO${NC}"
echo "=================================================="
echo ""
echo -e "${YELLOW}Para limpar cache DNS local:${NC}"
echo "• Linux/Mac: sudo systemd-resolve --flush-caches"
echo "• Mac alternativo: sudo dscacheutil -flushcache"
echo "• Windows: ipconfig /flushdns"
echo ""
echo -e "${YELLOW}Para testar DNS alternativo:${NC}"
echo "dig @8.8.8.8 $SITE_URL"
echo ""
echo -e "${YELLOW}Para testar com curl verboso:${NC}"
echo "curl -v -L $FULL_URL"
echo ""

# Final recommendation
echo "=================================================="
echo -e "${BOLD}💡 RECOMENDAÇÃO FINAL${NC}"
echo "=================================================="
echo ""
if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ O site está funcionando perfeitamente do servidor"
    echo "   onde este script foi executado."
    echo ""
    echo "Se usuários reportam problemas:"
    echo ""
    echo "1️⃣ Compartilhe SHARE_MESSAGES.md com eles"
    echo "2️⃣ Peça para testarem em modo anônimo"
    echo "3️⃣ Recomende trocar DNS para 8.8.8.8"
    echo "4️⃣ Verifique se não é firewall corporativo"
else
    echo "⚠️  Existem problemas de conectividade."
    echo ""
    echo "1️⃣ Tente re-publicar no Figma Make"
    echo "2️⃣ Aguarde 15 minutos para propagação DNS"
    echo "3️⃣ Verifique status do Figma: status.figma.com"
    echo "4️⃣ Contate suporte do Figma se persistir"
fi

echo ""
echo "=================================================="
echo -e "${BOLD}Diagnóstico completo! ✨${NC}"
echo "=================================================="
echo ""
