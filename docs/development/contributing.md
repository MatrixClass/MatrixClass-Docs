# 贡献规范

## 开始前

1. 阅读根目录 `AGENTS.md`、README 和相关模块说明。
2. 确认改动属于教师端、学生端、传输、媒体或文档中的哪一层。
3. 先写复现步骤或测试，再修改实现。

## 提交改动

- 一个提交尽量只解决一个问题。
- 不提交 `node_modules`、构建产物、运行日志、SQLite 数据库和个人配置。
- UI 改动需要说明窗口尺寸、交互入口和键盘操作。
- 协议或传输改动需要说明兼容性、重连和失败行为。
- 新依赖必须注明许可证，并确认不包含 GPL、LGPL 或 AGPL 传染性依赖。

## 本地验证

```powershell
go test -tags nexlab_nowebview -count=1 ./...
go build -tags nexlab_nowebview ./cmd/teacher
go build -tags nexlab_nowebview ./cmd/student
```

文档改动在 `webdoc` 目录执行：

```powershell
npm install
npm run docs:build
```

## Pull Request

描述改动范围、测试命令、平台限制和已知问题。涉及桌面 UI 时附上真实截图；涉及跨平台功能时列出实际验证的平台，不要把 CI 交叉编译当成完整实机验证。
