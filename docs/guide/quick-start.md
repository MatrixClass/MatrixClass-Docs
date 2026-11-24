# 快速开始

本页带你完成一次完整的“教师端开课 → 学生端加入 → 课堂操作”流程。示例使用 Windows 版本；Linux、macOS 的启动方式相同，界面名称保持一致。

## 获取程序

前往 [下载页面](/download) 选择对应平台的教师端和学生端安装包。

- Windows 安装说明：[Windows 安装](/deploy/windows)
- Linux 安装说明：[Linux 安装](/deploy/linux)
- macOS 安装说明：[macOS 安装](/deploy/macos)

也可以从源码构建：

```powershell
go test -tags nexlab_nowebview -count=1 ./...

go build -tags nexlab_nowebview -ldflags "-H windowsgui" -o dist\matrixclass-teacher.exe .\cmd\teacher
go build -tags nexlab_nowebview -ldflags "-H windowsgui" -o dist\matrixclass-student.exe .\cmd\student
```

## 启动教师端

![教师端频道与账号登录](/screenshots/teacher-channel-login.png)

1. 双击 `matrixclass-teacher.exe`。
2. 在启动弹窗中选择数字频道 ID，例如 `1` 或 `12`。频道 ID 不是教师姓名，也不是机房名称。
3. 输入教师端账号和密码。首次启动可以创建账号；默认用户名为 `admin`，密码为空。
4. 进入设备视图后确认底部状态显示“就绪”，并确认频道号正确。

![教师端设备视图](/screenshots/teacher-device-view.png)

上图是真实运行中的教师端窗口截图。设备卡片显示机位编号、在线状态、签到状态和延迟；右上角浮动条提供举手、作业、消息、广播等常用入口。截图中学生端首次启动密码窗口覆盖在教师端上方，完成学生端首次配置后该窗口不会再出现。

## 启动学生端

![学生端首次启动设置](/screenshots/student-first-run.png)

1. 安装完成后学生端会自动启动。
2. 首次启动设置学生端退出密码，并输入教师端使用的数字频道 ID。
3. 点击保存后，学生端会自动搜索并连接同一局域网内对应频道的教师端。
4. 连接成功后学生端默认隐藏在托盘，不会主动显示课堂功能入口。

![学生端课堂悬浮条](/screenshots/student-bar.png)

上图是真实运行中的学生端课堂悬浮条。学生端只在教师发起签到、随堂测验、课堂消息、文件接收或作业收取时弹出对应页面；平时保持轻量显示。右键托盘图标可以打开参数设置，但修改频道 ID 前需要输入退出密码。

## 验证连接

- 教师端底部“在线”数量应增加。
- 设备视图中会出现学生机位卡片，卡片显示 IP、延迟和在线状态。
- 学生端断线时会显示“连接掉线，正在重新连接”，并持续尝试连接，不需要手动重启。
- 如果学生端一直未出现，优先检查两端频道 ID、Windows 防火墙和局域网隔离设置。

## 第一堂课建议流程

1. 教师端确认设备视图和频道 ID。
2. 点击“点名签到”，学生端填写班级和姓名后提交。
3. 使用“屏幕广播”或“网络影院”开始授课。
4. 使用“发送课堂消息”发布提醒；学生端右下角会弹出通知。
5. 需要收作业时点击“收取作业”，选择保存目录，再等待学生提交。
6. 结束课堂后停止广播、结束收取作业，再退出教师端。

::: tip 网络提示
教师端和学生端必须处于可互通的局域网，并允许 UDP 广播/组播和 KCP 监听端口。
:::
