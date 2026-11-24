# 跨平台能力

| 平台 | 架构 | 注意事项 |
| --- | --- | --- |
| Windows | amd64 / arm64 | 允许专用网络，NSIS 安装包需要 `makensis.exe` |
| Linux | amd64 / arm64 | 正式 UI 发布目标；教师端、学生端分别提供 deb / rpm；X11、PipeWire/PulseAudio 和桌面权限按发行版配置 |
| Linux | loong64 | UI 发布目标（待实机验证）；提供 deb / rpm / tar.gz，龙芯桌面的 OpenGL、采集和音频需在实机确认 |
| macOS | amd64 / arm64 / Universal 2 | 未签名应用需要手动授权屏幕录制、麦克风和辅助功能 |

Linux 的 X11 屏幕采集和远程输入需要 `DISPLAY`、`libX11.so.6` 和 `libXtst.so.6`。Wayland 会明确提示需要桌面授权，不伪造为无授权采集。详细安装步骤见 [Linux 安装](/deploy/linux)。

macOS 的屏幕录制、麦克风、辅助功能和本地网络权限由系统控制，详细步骤见 [macOS 安装](/deploy/macos)。
