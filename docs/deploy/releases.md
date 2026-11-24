# 发行包与目录结构

发行文件按平台和架构分目录。当前可用于桌面 UI 的正式目标是 Windows amd64/arm64、Linux amd64/arm64 和 macOS amd64/arm64/Universal；Linux loong64 当前只用于交叉编译验证，详见[跨平台能力](/deploy/platforms)。

## Windows

- 教师端 NSIS 安装包：安装后创建快捷方式并保留教师端数据库目录。
- 学生端 NSIS 安装包：安装完成后强制启动学生端，首次启动进入密码和频道配置。
- 便携版：适合测试，不建议用于需要持久化数据库的教师机。

## macOS

可以生成 Intel、Apple Silicon 或 Universal 2 `.app` 和 zip 包。Universal 2 同时包含 Intel 与 Apple Silicon 二进制；未签名和未公证的 DMG 仍会受到 Gatekeeper 限制，首次运行需要在系统设置中手动允许，并授予采集权限。详细步骤见 [macOS 安装](/deploy/macos)。

## Linux

按 CPU 架构选择发行目录。Linux amd64/arm64 可以使用目录包和 tar.gz 包安装；在有 `dpkg-deb` 或 `rpmbuild` 的 Linux 主机上还可以生成 `.deb` 或 `.rpm`。屏幕采集、输入控制和音频能力依赖桌面环境与系统权限；无桌面环境的服务器只能验证协议、文件和控制类能力。详细步骤见 [Linux 安装](/deploy/linux)。

## 升级建议

升级前停止教师端，备份教师端 SQLite 数据库和配置；学生端升级前确认未有文件接收或作业提交任务。不要混用不同版本的教师端和学生端进行正式课堂。
