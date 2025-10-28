#!/bin/bash

# 快速修复脚本 - 一键解决连接问题
echo "🔧 快速修复开发服务器..."

# 停止所有进程
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true

# 设置环境并启动
export PATH="/usr/local/bin:$PATH"
cd /Users/Matthew/figma-test/invoice-template-editor

# 恢复文件（如果需要）
git restore . 2>/dev/null || true

# 启动服务器
npm run dev &
echo "✅ 服务器已启动: http://localhost:5173"

