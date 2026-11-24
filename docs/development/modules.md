# 模块与协议

MatrixClass 按课堂业务、传输、媒体、文件、控制和 UI 分层，便于替换平台实现并保持教师端和学生端行为一致。

## 主要模块

| 模块 | 职责 |
| --- | --- |
| `internal/classroom` | 频道、设备状态、分组和课堂会话 |
| `internal/transport` | KCP 会话、重连、可靠消息和流量状态 |
| `internal/media` | 屏幕、音频、关键帧和平台采集适配 |
| `internal/filetransfer` | 队列、断点续传、覆盖、重试和进度 |
| `internal/control` | 锁屏、输入、策略和批量控制 |
| `internal/remoteexec` | 程序启动、路径启动和命令执行 |
| `internal/store` | SQLite 持久化和配置读写 |
| `internal/ui/teacher` | 教师端页面、弹窗和交互状态 |
| `internal/ui/student` | 学生端悬浮条、独立窗口和托盘 |

## 数据流

课堂控制消息优先保证顺序和确认；文件传输以队列任务为单位记录偏移和重试；屏幕和音频使用媒体流，并在恢复后请求关键帧。UI 不应直接操作底层连接，而应通过业务服务接口发送意图。

## 依赖原则

项目避免使用 GPL、LGPL 和 AGPL 传染性协议依赖。引入新库前检查许可证、传递依赖和发布条款，并把结果记录在依赖审查文档中。

## 测试边界

无桌面会话的 CI 环境不能真实验证屏幕采集、音频设备和输入控制；这些测试应提供可注入的假实现，同时在 Windows、Linux 桌面和 macOS 实机进行补充验证。
