# 开发指南

以下命令在 `repo` 目录执行：

```powershell
go test -tags nexlab_nowebview -count=1 ./...
.\scripts\build-all.ps1 -Version 0.1.0
```

源码只放在 `repo`，发行文件放在工作区根目录 `release`，文档放在 `doc`，临时验证产物放在 `other`。

## 开发入口

- 新功能先从 [模块与协议](/development/modules) 确定归属和接口边界。
- 提交前阅读 [贡献规范](/development/contributing)。
- 发布前阅读 [CI 与发布](/development/ci-release)。
- 跨平台问题优先复现到具体平台、架构和桌面会话，再修改平台适配层。

## 本地运行

教师端和学生端可以使用 demo 数据启动，用于检查页面布局、设备卡片、课堂弹窗和队列状态。真实屏幕采集、音频和输入控制仍需要对应系统的桌面权限与设备环境。
