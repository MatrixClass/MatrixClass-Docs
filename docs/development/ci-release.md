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
- 确认 Linux amd64、arm64、loong64 的教师端、学生端 deb / rpm 和 tar.gz 齐全，学生端包安装后自动启动、卸载需要密码。
- 确认依赖许可证审查没有引入 GPL、LGPL 或 AGPL 传染性协议依赖。
- 确认 `SHA256SUMS.txt` 与实际文件一致。

## 发布正式版本

正式版本通过 GitHub Actions 手动发布：进入仓库 **Actions → Release → Run workflow**，填写版本号（例如 `1.1.0`）后运行。工作流会：

1. 运行全量单元测试。
2. 构建 Windows 教师端 / 学生端 NSIS 安装包和便携 zip。
3. 构建 Linux amd64 / arm64 / loong64 的教师端、学生端 `.deb` 和 `.rpm` 分包以及 tar.gz 目录包，并检查分包是否齐全。
4. 构建 macOS Universal dmg 和各架构 zip。
5. 生成 `SHA256SUMS`，创建 `v<版本号>` 标签和 GitHub Release，发布说明开头附带“教师机 / 学生机下载对照表”。

本地完整发行构建使用：

```powershell
.\scripts\build-all.ps1 -Version 0.1.0
```

发行结果位于 `dist/release`，并包含 `SHA256SUMS.txt`。
