# Windows 安装

本页说明 Windows 10 / 11 上教师端与学生端的安装、首次启动、防火墙放行、批量部署、升级与卸载。Windows 版提供独立的教师端与学生端 NSIS 安装程序，以及解压即用的便携压缩包。

## 支持范围

| 架构 | 适用设备 | 系统要求 |
| --- | --- | --- |
| x86_64（amd64） | 绝大多数台式机、笔记本 | Windows 10 1809 及以上、Windows 11 |
| arm64 | 骁龙等 Windows on ARM 设备 | Windows 11 on ARM |

查看本机架构：打开“设置 → 系统 → 系统信息”，查看“系统类型”。显示“基于 x64 的处理器”选 x86_64，显示“基于 ARM 的处理器”选 arm64。

::: tip
32 位 Windows（x86）不受支持。程序无需安装 .NET、VC++ 运行库或 WebView2。
:::

## 选择安装包

从 [下载页面](/download) 获取对应文件：

| 文件 | 用途 |
| --- | --- |
| `matrixclass-teacher-windows-<架构>-<版本>-setup.exe` | 教师端安装程序，装在教师机 |
| `matrixclass-student-windows-<架构>-<版本>-setup.exe` | 学生端安装程序，装在每台学生机 |
| `matrixclass-windows-<架构>.zip` | 便携包，同时包含两个程序，解压即用，适合临时测试 |

正式机房请使用安装程序：它会创建快捷方式、注册卸载项，学生端卸载时还会校验退出密码。

## 安装教师端

1. 双击 `matrixclass-teacher-windows-amd64-<版本>-setup.exe`。
2. 出现“用户账户控制”提示时选择“是”。安装程序需要管理员权限写入 `Program Files`。
3. 如果出现 SmartScreen“Windows 已保护你的电脑”，点击“更多信息 → 仍要运行”。当前安装包未做代码签名，这是正常提示。
4. 按向导点击“下一步”。默认安装目录为 `C:\Program Files\MatrixClass\Teacher`，可以修改。
5. 安装完成后，桌面和开始菜单会出现“MatrixClass 教师端”快捷方式。

### 教师端首次启动

![教师端频道与账号登录](/screenshots/teacher-channel-login.png)

1. 打开“MatrixClass 教师端”。
2. 在下拉框中选择数字频道 ID，例如 `1`。同一教室的学生端必须使用相同频道。
3. 首次启动可以设置教师账号密码；默认用户名为 `admin`，密码为空。建议立即设置密码。
4. Windows 防火墙询问网络访问时，勾选“专用网络”并点击“允许访问”。
5. 进入主界面后，底部状态显示当前频道和“就绪”。

## 安装学生端

1. 在学生机上运行 `matrixclass-student-windows-amd64-<版本>-setup.exe`，同样需要管理员权限。
2. 默认安装目录为 `C:\Program Files\MatrixClass\Student`。
3. 安装完成后，学生端会**自动启动**，无需手动打开。

### 学生端首次启动

![学生端首次启动设置](/screenshots/student-first-run.png)

1. 设置学生端退出密码。退出学生端、进入参数设置、卸载学生端、黑屏锁屏紧急解锁都需要这个密码。
2. 输入与教师端相同的数字频道 ID。
3. 防火墙提示时允许“专用网络”访问。
4. 学生端连接成功后，教师端设备视图会出现这台学生机。

::: warning
请妥善保存学生端退出密码，不要使用学生容易猜到的班级号或学号。忘记密码时，可以在教师端选中设备后重置。
:::

## 防火墙放行

MatrixClass 依赖局域网 UDP 通信：学生端通过广播 / 组播发现教师端，之后通过 KCP（UDP）传输数据。教师端默认监听 UDP `39100` 端口。

首次启动时允许防火墙提示即可。如果当时点了“取消”，或机房使用统一策略，可以用管理员 PowerShell 手动放行：

```powershell
# 教师机
New-NetFirewallRule -DisplayName "MatrixClass Teacher" -Direction Inbound -Action Allow `
  -Program "C:\Program Files\MatrixClass\Teacher\matrixclass-teacher.exe" -Profile Private,Domain

# 学生机
New-NetFirewallRule -DisplayName "MatrixClass Student" -Direction Inbound -Action Allow `
  -Program "C:\Program Files\MatrixClass\Student\matrixclass-student.exe" -Profile Private,Domain
```

确认当前网络是“专用网络”而不是“公用网络”：打开“设置 → 网络和 Internet → 属性”，将网络配置文件改为“专用”。公用网络下防火墙会拦截局域网发现。

学生端默认多网卡模式，会自动忽略 Hyper-V、VMware、VirtualBox 等虚拟机网卡和组网工具的虚拟网卡，无需手动禁用。更多说明见 [防火墙与多网卡](/deploy/firewall)。

## 便携包使用

1. 将 `matrixclass-windows-amd64.zip` 解压到一个**可写**目录，例如 `D:\MatrixClass`。
2. 双击 `matrixclass-teacher.exe` 或 `matrixclass-student.exe` 运行。
3. 便携模式下，教师端数据库 `nexlab-teacher.db` 和日志保存在程序同目录。

不要直接在压缩包内运行，也不要解压到桌面临时文件夹或只读目录，否则数据无法保存。

## 批量部署学生端

先在一台学生机完成安装和连接验证，再批量部署：

1. 将学生端安装程序拷贝到每台学生机，或放到共享目录。
2. 逐台运行安装程序，安装完成后学生端自动启动并进入首次设置。
3. 每台设置相同的数字频道和统一的退出密码。
4. 部署完成后，在教师端设备视图确认所有学生机在线。

学生端支持命令行参数，可以在快捷方式“目标”中追加：

| 参数 | 说明 |
| --- | --- |
| `--channel 12` | 指定数字频道 ID |
| `--teacher 192.168.1.10:39100` | 广播 / 组播不可用时，直接指定教师端地址 |
| `--recv D:\课堂文件` | 修改接收文件目录，默认保存到桌面 |
| `--teacher-fingerprint <指纹>` | 固定信任的教师端身份指纹，防止同网段伪装教师端 |

教师端指纹可以在教师端“设置 → 网络”中查看。

::: tip
不要复制已经运行过的学生端配置目录到其他电脑，每台学生机会根据本机生成独立的设备 ID。
:::

## 数据目录

| 内容 | 安装版位置 | 便携版位置 |
| --- | --- | --- |
| 教师端数据库 | `%AppData%\MatrixClass\nexlab-teacher.db` | 程序同目录 |
| 运行日志 | `%LocalAppData%\MatrixClass\logs` | 程序目录下的 `logs` |
| 学生端接收文件 | 当前用户桌面（可在设置中修改） | 同左 |
| 作业收取目录 | 系统“下载”目录（可在教师端设置中修改） | 同左 |

在资源管理器地址栏输入 `%AppData%\MatrixClass` 即可打开数据目录。

## 升级

1. 先在教师端结束正在进行的广播、文件分发和作业收取。
2. 备份 `%AppData%\MatrixClass\nexlab-teacher.db`。
3. 直接运行新版本安装程序覆盖安装，原有数据、频道和密码会保留。
4. 教师端和学生端应升级到同一版本后再上课。

## 卸载

- **教师端**：“设置 → 应用 → 已安装的应用”中找到“矩联电子教室 MatrixClass 教师端”，点击卸载。卸载不会删除 `%AppData%\MatrixClass` 中的数据库，需要彻底清理时手动删除。
- **学生端**：同样在“已安装的应用”中卸载，卸载前会弹出退出密码验证，密码错误会取消卸载。

## Windows 常见问题

### SmartScreen 阻止运行

安装包未做 Authenticode 签名，点击“更多信息 → 仍要运行”。如果企业策略完全禁止未签名程序，需要由管理员加入白名单。

### 学生端找不到教师端

1. 两端频道 ID 是否一致。
2. 两台电脑是否在同一网段，网络配置文件是否为“专用”。
3. 防火墙是否放行了两个程序。
4. 虚拟网卡默认已自动忽略；如果机器有多块物理网卡，可在学生端参数设置中改为“单网卡（手动选择）”并选定教室网卡。
5. 仍不行时，在学生端快捷方式中追加 `--teacher <教师机IP>:39100` 直接连接。

### 学生端无法退出

这是预期行为。右键托盘图标选择“退出学生端”，输入首次设置的退出密码。直接关闭窗口不会退出。

### 屏幕监控没有画面

确认学生机已登录桌面且未处于系统锁屏界面，学生端正在运行且已连接。更多排查顺序见 [设备视图与监控](/teacher/device-view)。
