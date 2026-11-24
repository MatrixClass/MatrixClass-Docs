# CI 与发布

GitHub Actions 在 push 到 `main` 和创建或更新 Pull Request 时运行：

- Go 全量测试
- Linux `amd64`、`arm64`、`loong64` 构建
- Windows `amd64`、`arm64` 构建
- macOS `amd64`、`arm64` 构建

汇总检查名称为 `CI / test-and-build`，仓库管理员应在 GitHub 分支保护规则中将其设置为必需。

## CI 能证明什么

CI 可以验证 Go 包测试、无桌面依赖的协议与业务逻辑、交叉编译和发行脚本。Linux Runner 没有真实桌面、屏幕和音频设备，因此不能替代 Windows、Linux 桌面和 macOS 实机验证。

## 发布前检查

- 确认教师端和学生端版本号一致。
- 确认 Windows 安装包为中文界面，并验证学生端安装后自动启动。
- 确认 macOS DMG 包含拖动到 Applications 的引导；未签名状态在发布说明中明确写出。
- 确认 Linux amd64、arm64、loong64 发行目录和启动说明齐全。
- 确认依赖许可证审查没有引入 GPL、LGPL 或 AGPL 传染性协议依赖。
- 确认 `SHA256SUMS.txt` 与实际文件一致。

完整发行构建使用：

```powershell
.\scripts\build-all.ps1 -Version 0.1.0
```

发行结果位于 `dist/release`，并包含 `SHA256SUMS.txt`。
