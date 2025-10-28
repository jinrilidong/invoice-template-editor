#!/bin/bash

# 一键修复开发服务器连接问题
# 作者: AI Assistant
# 用途: 解决 "Unable to connect" 问题

echo "🔧 开始修复开发服务器连接问题..."

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目路径
PROJECT_PATH="/Users/Matthew/figma-test/invoice-template-editor"
PORT=5173

echo -e "${BLUE}📁 项目路径: $PROJECT_PATH${NC}"

# 1. 检查项目目录是否存在
if [ ! -d "$PROJECT_PATH" ]; then
    echo -e "${RED}❌ 项目目录不存在: $PROJECT_PATH${NC}"
    exit 1
fi

# 2. 停止所有相关进程
echo -e "${YELLOW}🛑 停止现有进程...${NC}"

# 停止端口5173上的进程
if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "发现端口 $PORT 上的进程，正在停止..."
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# 停止Vite进程
pkill -f "vite" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true

echo -e "${GREEN}✅ 进程已停止${NC}"

# 3. 设置环境变量
echo -e "${YELLOW}🔧 设置环境变量...${NC}"
export PATH="/usr/local/bin:$PATH"
export NODE_ENV=development

# 4. 进入项目目录
cd "$PROJECT_PATH" || {
    echo -e "${RED}❌ 无法进入项目目录${NC}"
    exit 1
}

# 5. 检查并恢复git文件（如果需要）
echo -e "${YELLOW}🔄 检查git状态...${NC}"
if git status --porcelain | grep -q "deleted"; then
    echo "发现删除的文件，正在恢复..."
    git restore . 2>/dev/null || true
    echo -e "${GREEN}✅ Git文件已恢复${NC}"
fi

# 6. 检查关键文件是否存在
echo -e "${YELLOW}📋 检查关键文件...${NC}"

critical_files=(
    "package.json"
    "src/main.ts"
    "src/App.vue"
    "src/router/index.ts"
    "index.html"
    "vite.config.ts"
)

for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ 缺少关键文件: $file${NC}"
        echo "尝试从git恢复..."
        git restore "$file" 2>/dev/null || true
    else
        echo -e "${GREEN}✅ $file 存在${NC}"
    fi
done

# 7. 清理缓存
echo -e "${YELLOW}🧹 清理缓存...${NC}"
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# 8. 检查Node.js和npm
echo -e "${YELLOW}🔍 检查环境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js 未安装或不在PATH中${NC}"
    echo "请安装Node.js或检查PATH设置"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm 未安装或不在PATH中${NC}"
    echo "请安装npm或检查PATH设置"
    exit 1
fi

echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"

# 9. 安装依赖（如果需要）
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo -e "${YELLOW}📦 安装依赖...${NC}"
    npm install
fi

# 10. 启动开发服务器
echo -e "${YELLOW}🚀 启动开发服务器...${NC}"

# 在后台启动服务器
nohup npm run dev > server.log 2>&1 &
SERVER_PID=$!

# 等待服务器启动
echo "等待服务器启动..."
for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200"; then
        echo -e "${GREEN}✅ 服务器启动成功！${NC}"
        echo -e "${GREEN}🌐 访问地址: http://localhost:$PORT${NC}"
        echo -e "${GREEN}📊 进程ID: $SERVER_PID${NC}"
        echo -e "${BLUE}📝 日志文件: $PROJECT_PATH/server.log${NC}"
        break
    fi
    
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ 服务器启动超时${NC}"
        echo "检查日志文件: $PROJECT_PATH/server.log"
        cat "$PROJECT_PATH/server.log" | tail -20
        exit 1
    fi
    
    sleep 1
    echo -n "."
done

# 11. 验证连接
echo -e "${YELLOW}🔍 验证连接...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 连接验证成功 (HTTP $HTTP_CODE)${NC}"
    echo -e "${GREEN}🎉 修复完成！服务器正常运行${NC}"
else
    echo -e "${RED}❌ 连接验证失败 (HTTP $HTTP_CODE)${NC}"
    echo "检查日志文件: $PROJECT_PATH/server.log"
    cat "$PROJECT_PATH/server.log" | tail -10
    exit 1
fi

# 12. 显示有用的信息
echo ""
echo -e "${BLUE}📋 有用的命令:${NC}"
echo "  查看日志: tail -f $PROJECT_PATH/server.log"
echo "  停止服务器: kill $SERVER_PID"
echo "  检查端口: lsof -i :$PORT"
echo "  重新运行修复: $0"
echo ""

echo -e "${GREEN}🎯 修复脚本执行完成！${NC}"

