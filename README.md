# 前凌智选 Chrome 插件

[![版本](https://img.shields.io/badge/版本-v1.1-orange)](https://f.fore.vip/download/fore-ex-v1.1.zip)
[![下载](https://img.shields.io/badge/下载-静态网站-blue)](https://f.fore.vip/download/fore-ex-v1.1.zip)
[![官网](https://img.shields.io/badge/官网-fore.vip-green)](https://fore.vip)
[![GitHub](https://img.shields.io/badge/GitHub-fore--vip/fore--ex-black?logo=github)](https://github.com/fore-vip/fore-ex)

**前凌智选** Chrome 浏览器插件，一键创建活动，快速发布到前凌智选平台。

---

## 📦 下载安装

### 国内用户（推荐）

从静态网站下载最新版本：

- **下载链接**: https://f.fore.vip/download/fore-ex-v1.1.zip
- **文件大小**: 约 89KB
- **更新时间**: 2026-03-21

[👉 点击下载 v1.1](https://f.fore.vip/download/fore-ex-v1.1.zip)

### 国际用户

从 GitHub 仓库获取源码：

- **仓库地址**: https://github.com/fore-vip/fore-ex

---

## 📚 相关文档

### MCP 技能文档

- **activity-create 技能**: https://github.com/fore-vip/skills/tree/main/activity-create
- **技能安装指引**: [INSTALL.md](https://github.com/fore-vip/skills/blob/main/activity-create/INSTALL.md)
- **Installation Guide (EN)**: [INSTALL_en.md](https://github.com/fore-vip/skills/blob/main/activity-create/INSTALL_en.md)

### 项目文档

- **前凌智选官网**: https://fore.vip
- **项目文档库**: https://doc.fore.vip


## 🚀 安装教程

### 方式一：开发者模式安装（推荐）

> ⏱️ 预计耗时：2 分钟

#### 第 1 步：下载并解压

1. 下载插件包：[fore-ex-v1.1.zip](https://f.fore.vip/download/fore-ex-v1.1.zip)
2. 解压到任意目录，例如：
   - macOS: `/Users/你的用户名/fore-ex`
   - Windows: `C:\Users\你的用户名\fore-ex`

#### 第 2 步：打开扩展管理页面

**方法 A: 地址栏访问**
```
chrome://extensions/
```

**方法 B: 菜单访问**
1. 点击 Chrome 右上角「⋮」菜单
2. 选择「更多工具」
3. 选择「扩展程序」

#### 第 3 步：开启开发者模式

在扩展管理页面右上角，找到「开发者模式」开关，将其打开（变为蓝色）。

#### 第 4 步：加载插件

1. 点击左上角「加载已解压的扩展程序」按钮
2. 在弹出的文件选择器中，找到并选择你解压后的 `fore-ex` 文件夹
3. 点击「选择」或「打开」

#### 第 5 步：验证安装

- ✅ 插件出现在扩展列表中
- ✅ 插件图标出现在浏览器右上角工具栏
- ✅ 插件状态显示为「已启用」

#### 第 6 步：固定到工具栏（可选）

如果图标未显示：
1. 点击 Chrome 右上角「🧩」扩展图标
2. 找到「前凌智选」
3. 点击右侧的「📌」图钉图标，固定到工具栏

---

### 方式二：Git 克隆安装（开发者）

适合需要修改源码的开发者：

```bash
# 1. 克隆仓库
git clone git@github.com:fore-vip/fore-ex.git
cd fore-ex

# 2. 打开 Chrome 扩展管理页面
# chrome://extensions/

# 3. 开启开发者模式

# 4. 点击「加载已解压的扩展程序」
# 5. 选择 fore-ex 项目根目录
```

---

### 方式三：拖拽安装（.crx 文件）

> ⚠️ 注意：Chrome 新版可能限制此方式

如果有 `.crx` 文件：

1. 访问 `chrome://extensions/`
2. 开启「开发者模式」
3. 将 `.crx` 文件拖拽到页面任意位置
4. 在弹出的确认对话框中点击「添加扩展程序」

---

## 📖 功能特性

### ✨ 核心功能

| 功能 | 说明 |
|------|------|
| 🎯 快速创建活动 | 填写表单，一键发布到前凌智选平台 |
| 📍 活动地点 | 支持输入详细地址 |
| 💰 门票设置 | 免费/付费活动灵活配置 |
| 📱 联系方式 | 自动收集组织者微信 |
| 🔗 自动跳转 | 创建成功后自动打开活动详情页 |

### 🎨 界面优化（v1.1）

- ✅ Logo 与标题同行显示
- ✅ 点击 Logo/标题跳转官网
- ✅ 简洁表单，无冗余字段
- ✅ 响应式布局，适配不同屏幕

---

## 📋 使用指南

### 创建活动流程

```
1. 点击浏览器右上角的前凌智选插件图标
        ↓
2. 填写活动信息：
   - 活动标题（必填，至少 2 字符）
   - 开始时间（必填）
   - 结束时间（可选）
   - 活动地址（必填）
   - 联系方式/微信（必填）
   - 门票价格（可选，0 表示免费）
        ↓
3. 点击「创建活动」按钮
        ↓
4. 等待提交（显示加载动画）
        ↓
5. 创建成功 → 自动跳转到活动详情页
```

### 表单字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| 活动标题 | ✅ | 至少 2 个字符，建议简洁明了 |
| 开始时间 | ✅ | 活动开始日期和时间 |
| 结束时间 | ⚪ | 可选，默认 2 小时后 |
| 活动地址 | ✅ | 详细活动地点 |
| 联系方式 | ✅ | 微信或其他联系方式 |
| 门票价格 | ⚪ | 0 表示免费，单位为元 |

### 快速填写技巧

- **开始时间**: 默认设置为 1 小时后，可直接修改
- **结束时间**: 默认设置为开始时间后 2 小时
- **门票价格**: 输入 0 或留空表示免费活动

---

## 🔧 技术架构

### 技术栈

| 技术 | 说明 |
|------|------|
| **Manifest V3** | Chrome 插件最新规范 |
| **HTML5 + CSS3** | 现代化界面 |
| **Vanilla JavaScript** | 轻量级，无框架依赖 |
| **MCP 协议** | 与前凌智选 API 通信 |

### 项目结构

```
fore-ex/
├── manifest.json      # 插件配置文件
├── popup.html         # 弹出页面 HTML
├── popup.js           # 表单逻辑处理
├── icon.png           # 插件图标
├── activity.html      # 活动页面
├── check.html         # 检查页面
├── test.html          # 测试页面
├── index.html         # 主页面
├── README.md          # 项目说明
└── .gitignore         # Git 忽略配置
```

### API 端点

| 端点 | 说明 |
|------|------|
| `https://api.fore.vip/mcp/tools/call` | MCP 工具调用 |
| `https://api.fore.vip/mcp/tools/list` | 可用工具列表 |
| `https://fore.vip/st?id={id}` | 活动详情页 |

### 权限说明

| 权限 | 用途 |
|------|------|
| `storage` | 存储用户配置（可选功能） |
| `host_permissions: api.fore.vip` | 调用 MCP API 创建活动 |

---

## 🔄 版本历史

### v1.4 (2026-03-27)

**功能调整**
- ✅ 发布活动功能调整为弹出提示引导
- ✅ 引导用户先发布产品再创建活动

**界面优化**
- ✅ 产品卡片样式全面升级（简洁大气）
- ✅ 卡片圆角 12px → 16px
- ✅ 卡片阴影优化，hover 效果增强
- ✅ 标签样式优化（胶囊形 + 渐变）
- ✅ 产品详情页跳转链接更新

**修复**
- ✅ 修复 JavaScript 语法错误（alert 换行问题）

### v1.1 (2026-03-21)

**优化**
- ✅ Logo 与标题同行显示
- ✅ 删除标题 emoji，界面更简洁
- ✅ Logo 和标题可点击跳转官网
- ✅ 移除外部链接字段，简化表单
- ✅ 优化表单布局，提升用户体验
- ✅ 完善 README 文档

**修复**
- ✅ 修复表单提交后 url 字段处理

### v1.0 (2025-12-25)

**首发版本**
- ✅ 基础活动创建功能
- ✅ MCP 协议集成
- ✅ 表单验证
- ✅ 自动跳转

---

## ❓ 常见问题

### Q: 插件无法加载？

**A**: 请确保：
1. ✅ 已解压 ZIP 文件，**不要直接从压缩包加载**
2. ✅ 选择的是包含 `manifest.json` 的文件夹
3. ✅ 已开启「开发者模式」开关
4. ✅ 文件夹路径不包含中文或特殊字符

### Q: 创建活动失败？

**A**: 检查以下几点：
1. ✅ 网络连接是否正常
2. ✅ 所有必填字段是否已填写
3. ✅ 活动标题是否至少 2 个字符
4. ✅ 开始时间是否晚于当前时间
5. ✅ 结束时间是否晚于开始时间
6. ✅ 是否能访问 `https://api.fore.vip`

### Q: 如何更新插件？

**A**: 
1. 下载最新版本的 ZIP 包
2. 解压覆盖原目录
3. 在 `chrome://extensions/` 找到插件
4. 点击插件卡片上的「刷新」按钮 🔄

### Q: 数据是否安全？

**A**: 
- ✅ 插件仅收集活动创建所需的最少信息
- ✅ 所有数据传输使用 HTTPS 加密
- ✅ 不存储任何用户隐私数据
- ✅ 不开启任何第三方统计或追踪

### Q: 卸载插件？

**A**: 
1. 访问 `chrome://extensions/`
2. 找到「前凌智选」插件
3. 点击「移除」按钮
4. 在确认对话框中点击「移除」

---

## 📞 技术支持

| 渠道 | 链接 |
|------|------|
| **官网** | https://fore.vip |
| **API 文档** | https://api.fore.vip/mcp |
| **项目文档** | https://doc.fore.vip |
| **GitHub** | https://github.com/fore-vip/fore-ex |
| **问题反馈** | https://github.com/fore-vip/fore-ex/issues |

---

## 📄 许可证

MIT License

Copyright (c) 2026 前凌智选

---

**享受便捷的活动创建体验！** 🎉

最后更新：2026-03-21
