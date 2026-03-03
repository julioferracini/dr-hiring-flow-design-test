#!/bin/bash

# 🚀 Script Automático: Git Push para GitHub
# Execute: chmod +x quick-push.sh && ./quick-push.sh

echo ""
echo "🚀 =================================="
echo "   GIT PUSH AUTOMÁTICO"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar status
echo -e "${BLUE}📋 Verificando status...${NC}"
git status
echo ""

# 2. Adicionar todos os arquivos
echo -e "${BLUE}➕ Adicionando arquivos...${NC}"
git add .
echo -e "${GREEN}✅ Arquivos adicionados${NC}"
echo ""

# 3. Solicitar mensagem de commit
echo -e "${YELLOW}📝 Digite a mensagem do commit (ou Enter para usar padrão):${NC}"
read -p "Mensagem: " commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update: automated commit $(date +%Y-%m-%d)"
fi

echo ""
echo -e "${BLUE}💾 Fazendo commit...${NC}"
git commit -m "$commit_message"
echo -e "${GREEN}✅ Commit realizado${NC}"
echo ""

# 4. Verificar remote
echo -e "${BLUE}🔍 Verificando remote...${NC}"
remote_url=$(git remote get-url origin 2>/dev/null)

if [ -z "$remote_url" ]; then
    echo -e "${YELLOW}⚠️  Remote não configurado. Configurando...${NC}"
    git remote add origin https://github.com/julioferracini-droid/debt-resolution-design-hf.git
    echo -e "${GREEN}✅ Remote configurado${NC}"
else
    echo -e "${GREEN}✅ Remote: $remote_url${NC}"
fi
echo ""

# 5. Verificar branch atual
current_branch=$(git branch --show-current)
echo -e "${BLUE}🌿 Branch atual: ${current_branch}${NC}"
echo ""

# 6. Push
echo -e "${BLUE}🚀 Enviando para GitHub...${NC}"
echo ""

if git push -u origin "$current_branch"; then
    echo ""
    echo -e "${GREEN}✅ =================================="
    echo "   PUSH REALIZADO COM SUCESSO!"
    echo "===================================${NC}"
    echo ""
    echo -e "${BLUE}🔗 Repositório:${NC}"
    echo "   https://github.com/julioferracini-droid/debt-resolution-design-hf"
    echo ""
    echo -e "${BLUE}🎯 Próximo passo:${NC}"
    echo "   1. Acesse: https://vercel.com/new"
    echo "   2. Importe o repositório"
    echo "   3. Clique em Deploy"
    echo ""
else
    echo ""
    echo -e "${YELLOW}⚠️  Erro no push. Tentando resolver...${NC}"
    echo ""
    
    # Tentar pull com rebase
    echo -e "${BLUE}🔄 Tentando sincronizar com remoto...${NC}"
    if git pull origin "$current_branch" --rebase; then
        echo -e "${GREEN}✅ Sincronizado${NC}"
        echo -e "${BLUE}🚀 Tentando push novamente...${NC}"
        
        if git push origin "$current_branch"; then
            echo ""
            echo -e "${GREEN}✅ =================================="
            echo "   PUSH REALIZADO COM SUCESSO!"
            echo "===================================${NC}"
            echo ""
        else
            echo ""
            echo -e "${YELLOW}⚠️  Ainda com erro. Opções:${NC}"
            echo ""
            echo "1. Force push (CUIDADO - sobrescreve histórico remoto):"
            echo "   git push -f origin $current_branch"
            echo ""
            echo "2. Verificar credenciais:"
            echo "   - Pode precisar de Personal Access Token"
            echo "   - GitHub não aceita senha normal"
            echo ""
            echo "3. Configurar SSH (mais seguro):"
            echo "   - Ver: DEPLOY_GITHUB_VERCEL.md"
            echo ""
        fi
    else
        echo ""
        echo -e "${YELLOW}⚠️  Conflitos detectados ou erro de sincronização${NC}"
        echo ""
        echo "Opções:"
        echo ""
        echo "1. Resolver conflitos manualmente:"
        echo "   - Edite os arquivos em conflito"
        echo "   - git add ."
        echo "   - git rebase --continue"
        echo "   - Execute este script novamente"
        echo ""
        echo "2. Cancelar rebase e force push:"
        echo "   git rebase --abort"
        echo "   git push -f origin $current_branch"
        echo ""
    fi
fi

echo ""
echo -e "${BLUE}📚 Documentação completa:${NC}"
echo "   DEPLOY_GITHUB_VERCEL.md"
echo ""
