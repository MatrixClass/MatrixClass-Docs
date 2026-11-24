# MatrixClass Docs

[矩联电子教室 MatrixClass](https://github.com/MatrixClass/MatrixClass) 的官方文档网站，基于 [VitePress](https://vitepress.dev/) 构建。

## 本地预览

```bash
npm install
npm run docs:dev
```

默认打开 <http://localhost:5173>。

## 构建生产版本

```bash
npm run docs:build
npm run docs:preview
```

构建产物输出到 `docs/.vitepress/dist`。下载页面会在构建时读取 MatrixClass 最新 Release 的文件列表，发布新版本后重新构建即可更新下载地址。

## 目录结构

```text
docs/
├─ .vitepress/        站点配置与主题
├─ guide/             快速开始、安装与使用流程
├─ teacher/           教师端功能说明
├─ student/           学生端功能说明
├─ deploy/            部署、网络与各平台安装
├─ faq/               常见问题
├─ development/       开发与发布
├─ public/            Logo 与界面截图
├─ download.md        下载页面
└─ index.md           首页
```