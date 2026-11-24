# Linux 安装

本页说明 Linux amd64 和 arm64 的正式桌面安装方式，以及 loong64 当前的实际支持边界。安装包采用目录包/tar.gz 为主，发行版 `.deb` 和 `.rpm` 属于可选构建产物。

## 支持范围

| 架构 | 当前状态 | 可用功能 |
| --- | --- | --- |
| amd64 / x86_64 | 正式桌面目标 | 教师端、学生端、网络、文件、UI；采集能力取决于桌面权限 |
| arm64 / aarch64 | 正式桌面目标 | 同上，需选择 arm64 包 |
| loong64 / loongarch64 | 编译验证目标 | 当前可生成二进制检查包，但 MyGo Linux 原生 UI 尚未覆盖，不能当作可用桌面发行版 |
| riscv64、386、armv7 | 编译验证目标 | 不属于当前正式 UI 发布目标 |

## 安装前准备

### 桌面环境

教师端和学生端是桌面程序，不建议安装在无图形界面的纯服务器上。使用屏幕广播、屏幕监控和远程输入时，需要 X11 或发行版提供的桌面授权机制。

检查当前架构和桌面会话：

```sh
uname -m
printf 'DISPLAY=%s\n' "${DISPLAY:-}"
printf 'XDG_SESSION_TYPE=%s\n' "${XDG_SESSION_TYPE:-}"
```

### 运行库

X11 屏幕采集和输入控制至少需要：

- `libX11.so.6`
- `libXtst.so.6`
- 可用的 `DISPLAY`

Debian/Ubuntu 可以先安装基础库：

```sh
sudo apt update
sudo apt install libx11-6 libxtst6 libgl1
```

Fedora/RHEL 系列可以安装对应运行库：

```sh
sudo dnf install libX11 libXtst mesa-libGL
```

不同发行版的包名可能不同；如果只使用消息、文件和协议功能，可以先启动程序，再根据实际错误补充桌面库。

### 音频

语音广播和音频采集需要系统可用的 PipeWire 或 PulseAudio 会话。没有音频设备时，教师端仍可能启动，但语音广播会报告音频不可用，不应把该状态当作网络故障。

## 使用目录包安装

目录包由 `matrixclass-linux-<arch>.tar.gz` 解压得到。下面以 amd64 为例，arm64 只需要把 `amd64` 替换为 `arm64`。

### 1. 解压并检查文件

```sh
tar -xzf matrixclass-linux-amd64.tar.gz
cd matrixclass-linux-amd64
ls -la
```

目录中应包含：

- `matrixclass-teacher-linux-amd64`
- `matrixclass-student-linux-amd64`
- `install.sh`
- `uninstall.sh`
- 两个 `.desktop` 启动项
- 图标文件、systemd 模板和 `README.md`

### 2. 执行安装脚本

默认安装位置如下：

| 内容 | 默认位置 |
| --- | --- |
| 程序真实文件 | `/opt/matrixclass` |
| 命令入口 | `/usr/local/bin` |
| 桌面启动项 | `/usr/share/applications` |
| 用户数据 | `~/.local/share/matrixclass` |
| 用户配置 | `~/.config/matrixclass` |
| 用户日志 | `~/.local/state/matrixclass` |

执行：

```sh
chmod +x install.sh uninstall.sh
sudo ./install.sh
```

安装脚本会根据 `uname -m` 自动选择架构，并创建教师端和学生端命令入口。它不会自动启用 systemd 服务，也不会自动替你设置频道和密码。

### 3. 启动程序

桌面环境中可以从应用菜单打开“矩联电子教室教师端”或“矩联电子教室学生端”，也可以从终端启动：

```sh
matrixclass-teacher
matrixclass-student
```

教师端首次启动：

1. 选择数字频道 ID。
2. 设置或输入教师端账号密码。
3. 等待主窗口底部显示就绪状态。

学生端首次启动：

1. 设置学生端退出密码。
2. 选择与教师端相同的数字频道 ID。
3. 保存后等待学生端托盘或悬浮条显示连接状态。

## 自定义安装目录

安装脚本支持通过环境变量覆盖默认目录。例如将程序安装到用户目录，不使用 `/opt` 和 `/usr/local/bin`：

```sh
PREFIX="$HOME/.local/lib/matrixclass" \
BINDIR="$HOME/.local/bin" \
DESKTOPDIR="$HOME/.local/share/applications" \
ICONDIR="$HOME/.local/share/icons/hicolor/scalable/apps" \
PIXMAPDIR="$HOME/.local/share/pixmaps" \
DATADIR="$HOME/.local/share/matrixclass" \
CONFIGDIR="$HOME/.config/matrixclass" \
LOGDIR="$HOME/.local/state/matrixclass" \
./install.sh
```

确保 `$HOME/.local/bin` 在 `PATH` 中；否则应用菜单仍可能能启动，但终端找不到 `matrixclass-teacher` 命令。

## 可选：安装用户级 systemd 服务

安装脚本可以复制用户级 systemd 模板，但默认不启用：

```sh
INSTALL_SYSTEMD=1 ./install.sh
systemctl --user daemon-reload
```

按需启用。学生端通常适合登录后自动运行，教师端是否自动运行取决于机房管理策略：

```sh
systemctl --user enable --now matrixclass-student.service
systemctl --user status matrixclass-student.service
```

教师端也可以启用：

```sh
systemctl --user enable --now matrixclass-teacher.service
systemctl --user status matrixclass-teacher.service
```

服务模板依赖图形会话；如果桌面尚未登录、`DISPLAY` 不存在或桌面权限未授予，屏幕采集和 UI 可能不可用。不要在无桌面的系统服务环境中期待完整桌面功能。

## 使用 `.deb` / `.rpm` 安装

发行版安装包按“角色”拆成两个独立的包，教师机和学生机各装各的：

| 包名 | 用途 | 安装到 |
|---|---|---|
| `matrixclass-teacher` | 教师端 | 教师机 |
| `matrixclass-student` | 学生端（安装后立即启动、登录桌面自动启动、卸载需要退出密码） | 学生机 |

文件名示例（以 1.1.0 为例）：

| 系统 | 教师机 | 学生机 |
|---|---|---|
| 统信 UOS / Deepin / 银河麒麟 / Ubuntu / Debian（x86） | `matrixclass-teacher_1.1.0_amd64.deb` | `matrixclass-student_1.1.0_amd64.deb` |
| 同上（鲲鹏 / 飞腾 ARM） | `matrixclass-teacher_1.1.0_arm64.deb` | `matrixclass-student_1.1.0_arm64.deb` |
| 同上（龙芯） | `matrixclass-teacher_1.1.0_loong64.deb` | `matrixclass-student_1.1.0_loong64.deb` |
| openEuler / 龙蜥 Anolis / CentOS / Fedora（x86） | `matrixclass-teacher-1.1.0-1.x86_64.rpm` | `matrixclass-student-1.1.0-1.x86_64.rpm` |
| 同上（ARM） | `matrixclass-teacher-1.1.0-1.aarch64.rpm` | `matrixclass-student-1.1.0-1.aarch64.rpm` |
| 同上（龙芯） | `matrixclass-teacher-1.1.0-1.loongarch64.rpm` | `matrixclass-student-1.1.0-1.loongarch64.rpm` |

不确定 CPU 架构时执行 `uname -m`：`x86_64` 选 amd64/x86_64，`aarch64` 选 arm64/aarch64，`loongarch64` 选 loong64/loongarch64。

教师机（deb 系）：

```sh
sudo apt install ./matrixclass-teacher_1.1.0_amd64.deb
```

学生机（deb 系）：

```sh
sudo apt install ./matrixclass-student_1.1.0_amd64.deb
```

rpm 系把 `apt` 换成 `dnf`（老系统用 `yum`）：

```sh
sudo dnf install ./matrixclass-student-1.1.0-1.x86_64.rpm
```

学生端包的行为：

- 安装完成后，会在当前已登录的桌面会话里立即启动学生端，首次启动设置退出密码和频道 ID。
- 写入 `/etc/xdg/autostart/matrixclass-student.desktop`，之后每次登录桌面自动启动。
- 卸载（`sudo apt remove matrixclass-student` / `sudo dnf remove matrixclass-student`）前会弹出退出密码验证，验证失败或取消会中止卸载。需要在已设置密码的用户桌面会话中执行卸载。
- 升级安装不需要密码，会自动结束旧进程并启动新版本。

两个包互不依赖；同一台机器需要同时测试教师端和学生端时可以都装。

### 自行构建 `.deb` / `.rpm`

目录包构建完成后，在 Linux 主机执行：

```sh
scripts/build-linux-distro-packages.sh dist/linux amd64
```

生成条件：

- 安装 `dpkg-deb` 才会生成 `.deb`（教师端、学生端各一个）。
- 安装 `rpmbuild` 才会生成 `.rpm`（教师端、学生端各一个）。
- 缺少其中一个工具只跳过对应格式，不代表另一个格式失败。

例如 Debian/Ubuntu：

```sh
sudo apt install dpkg-dev
scripts/build-linux-distro-packages.sh dist/linux amd64
sudo apt install ./dist/linux/matrixclass-student_<version>_amd64.deb
```

RPM 系发行版需要在对应 Linux 主机安装 `rpm-build` 后再生成和安装，不建议在 Windows 直接把未验证的 `.rpm` 当作 Linux 安装包。

## 卸载

使用安装目录中的脚本，而不是直接删除 `/opt/matrixclass`：

```sh
sudo ./uninstall.sh
```

卸载前会调用学生端退出密码验证；验证失败会中止卸载。程序、桌面启动项和 systemd 模板会被删除，但用户数据、配置、日志和接收文件会保留。

## Linux 常见问题

### 双击没有反应

先从终端运行二进制，查看缺少库、权限或桌面会话错误：

```sh
matrixclass-student
```

### 能连接但没有屏幕画面

确认 `DISPLAY` 有值、`libX11.so.6` 和 `libXtst.so.6` 存在，并检查当前用户是否拥有桌面会话。Wayland 环境需要系统桌面授权；不能通过修改频道或重复启动解决权限问题。

### loong64 能不能正式安装

当前不能按正式桌面版本承诺。构建脚本可以生成 `loong64` 检查产物，但现有 MyGo Linux 原生后端只覆盖 amd64/arm64，启动时可能提示该架构不支持 UI。等待原生 UI 后端覆盖并完成实机验证后，才能列为正式安装目标。
