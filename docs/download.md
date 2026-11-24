---
outline: [2, 3]
---

# 下载

下载地址来自 [GitHub Releases](https://github.com/MatrixClass/MatrixClass/releases/latest) 的最新正式版本。国内网络访问 GitHub 较慢时，可以在“GitHub 加速”中切换镜像。

<ClientOnly>
  <DownloadTable />
</ClientOnly>

## 如何选择

- **Windows**：教师机下载“教师端安装包”，学生机下载“学生端安装包”。便携压缩包内同时包含两个程序，解压即用，适合临时测试。
- **Linux**：教师端和学生端是两个独立的安装包，教师机下载“教师端安装包”，学生机下载“学生端安装包”。Debian / Ubuntu / 统信 UOS / 深度 / 麒麟选 `deb`，Fedora / openEuler / 龙蜥 / CentOS 选 `rpm`；其他发行版使用 `tar.gz`（同时包含两个程序）。
- **macOS**：推荐下载 Universal 的 `dmg`，其中同时包含教师端和学生端，打开后把需要的应用拖到“应用程序”文件夹即可。

Linux 安装包文件名对照（以 1.1.0、x86_64 为例）：

| 发行版 | 教师机 | 学生机 |
| --- | --- | --- |
| Debian / Ubuntu / 统信 UOS / 深度 / 麒麟 | `matrixclass-teacher_1.1.0_amd64.deb` | `matrixclass-student_1.1.0_amd64.deb` |
| Fedora / openEuler / 龙蜥 / CentOS | `matrixclass-teacher-1.1.0-1.x86_64.rpm` | `matrixclass-student-1.1.0-1.x86_64.rpm` |

ARM64 把 `amd64` / `x86_64` 换成 `arm64` / `aarch64`，龙芯换成 `loong64` / `loongarch64`。安装命令：

```bash
# deb 系
sudo apt install ./matrixclass-student_1.1.0_amd64.deb
# rpm 系
sudo dnf install ./matrixclass-student-1.1.0-1.x86_64.rpm
```

学生端安装后会立即启动；卸载学生端需要输入首次启动时设置的退出密码。

不确定硬件架构时：

| 系统 | 查看方法 |
| --- | --- |
| Windows | 设置 → 系统 → 系统信息 → 系统类型 |
| Linux | 终端执行 `uname -m`：`x86_64`、`aarch64` 或 `loongarch64` |
| macOS | 左上角苹果菜单 → 关于本机 → 芯片 / 处理器 |

## 校验文件

每个版本都附带 `SHA256SUMS`。下载后可以校验文件完整性：

```bash
# Linux / macOS
sha256sum -c SHA256SUMS --ignore-missing
```

```powershell
# Windows PowerShell
Get-FileHash .\matrixclass-teacher-windows-amd64-1.1.0-setup.exe -Algorithm SHA256
```

## 下一步

下载完成后，按照 [安装与首次配置](/guide/installation) 部署教师端和学生端；各平台详细步骤见 [Windows 安装](/deploy/windows)、[Linux 安装](/deploy/linux) 和 [macOS 安装](/deploy/macos)。
