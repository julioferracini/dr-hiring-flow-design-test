#!/bin/bash

echo "🔍 Verificando arquivos essenciais..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_file() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✅${NC} $1"
    return 0
  else
    echo -e "${RED}❌${NC} $1 (FALTANDO)"
    return 1
  fi
}

check_dir() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✅${NC} $1/"
    return 0
  else
    echo -e "${RED}❌${NC} $1/ (FALTANDO)"
    return 1
  fi
}

echo "📁 Arquivos de Configuração:"
check_file "package.json"
check_file "vite.config.ts"
check_file "index.html"
check_file ".gitignore"
echo ""

echo "📄 Entry Points:"
check_file "src/main.tsx"
check_file "src/app/App.tsx"
echo ""

echo "🎨 Estilos:"
check_file "src/styles/index.css"
check_file "src/styles/theme.css"
check_file "src/styles/fonts.css"
check_file "src/styles/tailwind.css"
echo ""

echo "🔧 Constantes:"
check_file "src/app/constants/colors.ts"
check_file "src/app/constants/tokens.ts"
check_file "src/app/constants/index.ts"
echo ""

echo "📱 Telas Principais:"
check_file "src/app/screens/Simulation/Simulation.tsx"
check_file "src/app/screens/InstallmentValue/InstallmentValue.tsx"
check_file "src/app/screens/index.ts"
echo ""

echo "📦 Diretórios:"
check_dir "node_modules"
check_dir "src"
check_dir "src/app"
check_dir "src/app/screens"
check_dir "src/imports"
echo ""

echo "🔍 Verificando dependências críticas..."
if [ -f "node_modules/react/package.json" ]; then
  REACT_VERSION=$(node -p "require('./node_modules/react/package.json').version")
  echo -e "${GREEN}✅${NC} React: $REACT_VERSION"
else
  echo -e "${RED}❌${NC} React: NÃO INSTALADO"
fi

if [ -f "node_modules/motion/package.json" ]; then
  MOTION_VERSION=$(node -p "require('./node_modules/motion/package.json').version")
  echo -e "${GREEN}✅${NC} Motion: $MOTION_VERSION"
else
  echo -e "${RED}❌${NC} Motion: NÃO INSTALADO"
fi

if [ -f "node_modules/vite/package.json" ]; then
  VITE_VERSION=$(node -p "require('./node_modules/vite/package.json').version")
  echo -e "${GREEN}✅${NC} Vite: $VITE_VERSION"
else
  echo -e "${RED}❌${NC} Vite: NÃO INSTALADO"
fi

echo ""
echo "📊 Resumo:"
echo "─────────────────────────────────────"

MISSING_FILES=0

[ ! -f "index.html" ] && ((MISSING_FILES++))
[ ! -f "src/main.tsx" ] && ((MISSING_FILES++))
[ ! -f "src/app/App.tsx" ] && ((MISSING_FILES++))
[ ! -d "node_modules" ] && ((MISSING_FILES++))

if [ $MISSING_FILES -eq 0 ]; then
  echo -e "${GREEN}✅ Todos os arquivos essenciais estão presentes!${NC}"
  echo ""
  echo "Para iniciar o projeto, execute:"
  echo -e "${YELLOW}pnpm install${NC} (se ainda não instalou)"
  echo -e "${YELLOW}pnpm dev${NC}"
else
  echo -e "${RED}❌ $MISSING_FILES arquivo(s) essencial(is) faltando!${NC}"
  echo ""
  echo "Soluções:"
  echo "1. Reinstale as dependências: pnpm install"
  echo "2. Consulte TROUBLESHOOTING.md para mais detalhes"
fi

echo ""
