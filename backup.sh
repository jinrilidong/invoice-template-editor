#!/bin/bash
# 自动备份脚本 - 使用 Git 进行版本控制备份

echo "🚀 开始备份代码..."

# 检查是否有未提交的更改
if git diff --quiet && git diff --staged --quiet; then
    echo "✅ 没有新的更改需要提交"
    echo "📊 当前状态："
    git status --short
else
    echo "📝 发现新的更改，正在提交..."
    
    # 添加所有更改
    git add .
    
    # 获取当前时间戳
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    # 提交更改
    git commit -m "自动备份: $TIMESTAMP"
    
    echo "✅ 本地备份完成！"
    
    # 检查是否有远程仓库
    if git remote -v | grep -q origin; then
        echo "🌐 推送到远程仓库..."
        git push
        echo "✅ 远程备份完成！"
    else
        echo "ℹ️  未配置远程仓库，仅完成本地备份"
        echo "💡 提示：可以添加远程仓库进行云端备份"
        echo "   命令：git remote add origin <远程仓库URL>"
    fi
fi

echo ""
echo "📈 备份统计："
echo "   总提交数：$(git rev-list --count HEAD)"
echo "   最新提交：$(git log -1 --format='%h - %s (%cr)')"
echo "   分支：$(git branch --show-current)"

echo ""
echo "🎉 备份完成！"
