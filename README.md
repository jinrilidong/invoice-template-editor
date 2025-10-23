# Figma Test 项目

这是一个包含发票模板编辑器的项目，使用 Vue.js 和 TypeScript 开发。

## 项目结构

```
figma-test/
├── invoice-template-editor/    # 主要的发票模板编辑器项目
│   ├── src/                    # 源代码
│   ├── public/                 # 静态资源
│   └── package.json           # 项目依赖
├── src/                        # 设计系统组件
│   ├── components/            # Vue 组件
│   └── styles/               # 样式文件
└── backup.sh                  # 自动备份脚本
```

## Git 版本控制

本项目已配置 Git 版本控制，用于代码备份和版本管理。

### 基本 Git 命令

```bash
# 查看状态
git status

# 添加文件
git add .

# 提交更改
git commit -m "描述更改"

# 查看提交历史
git log --oneline

# 查看差异
git diff
```

### 自动备份

使用 `backup.sh` 脚本进行自动备份：

```bash
# 运行自动备份
./backup.sh
```

该脚本会：
- 检查是否有新的更改
- 自动提交所有更改
- 推送到远程仓库（如果已配置）

### 配置远程仓库

如果需要云端备份，可以添加远程仓库：

```bash
# 添加远程仓库
git remote add origin https://github.com/用户名/仓库名.git

# 推送到远程仓库
git push -u origin main
```

## 开发环境

### 安装依赖

```bash
cd invoice-template-editor
npm install
```

### 启动开发服务器

```bash
npm run dev
```

## 备份策略

1. **本地备份**：使用 Git 进行版本控制
2. **自动备份**：使用 `backup.sh` 脚本定期备份
3. **云端备份**：推送到 GitHub 等远程仓库

## 注意事项

- 定期运行 `./backup.sh` 进行备份
- 重要更改前先提交当前状态
- 使用有意义的提交信息
- 定期推送到远程仓库

## 联系方式

如有问题，请联系项目维护者。
