# macOS 安装

本页说明 Intel Mac、Apple Silicon Mac 和 Universal 2 包的安装、首次打开、系统权限、卸载与故障排查。当前发布包未使用 Apple Developer 账号签名或公证，因此首次打开会受到 Gatekeeper 的额外限制。

## 选择正确的包

| Mac 类型 | 选择 | 识别方式 |
| --- | --- | --- |
| Intel | `matrixclass-macos-amd64.zip` | “关于本机”显示处理器为 Intel |
| Apple Silicon | `matrixclass-macos-arm64.zip` | “关于本机”显示芯片为 Apple M 系列 |
| 两者均可 | `matrixclass-macos-universal.zip` 或 Universal DMG | 一个包同时包含 amd64 与 arm64 |

查看本机架构：

```sh
uname -m
```

输出 `x86_64` 表示 Intel，输出 `arm64` 表示 Apple Silicon。Universal 包体积更大，但适合统一分发。

## 获取和解压

从 release 中下载对应 zip 或 DMG。zip 包在终端解压：

```sh
unzip matrixclass-macos-universal.zip
cd matrixclass-macos-universal
ls -la
```

目录中包含：

- `MatrixClass Teacher.app`
- `MatrixClass Student.app`
- `README-macOS.md`
- `permissions-macOS.md`
- `uninstall-student.sh`

如果使用 DMG，双击打开磁盘映像，把 `MatrixClass Teacher.app` 或 `MatrixClass Student.app` 拖到 `Applications` 文件夹。DMG 中的 `Applications` 图标是拖动安装目标，不要直接从 DMG 长期运行程序。

## 首次打开未签名应用

当前包没有 Developer ID 签名和 Apple 公证。首次打开推荐使用 Finder：

1. 打开 `Applications`。
2. 按住 Control 点击 `MatrixClass Teacher.app` 或 `MatrixClass Student.app`。
3. 选择“打开”。
4. 在系统提示中再次选择“打开”。
5. 如果没有“打开”按钮，进入“系统设置 → 隐私与安全性”，在安全提示旁点击“仍要打开”。

只对确认来源的 MatrixClass 包执行上述操作。不要为了运行未知来源程序而关闭 Gatekeeper，也不要把网络下载的未知应用直接加入白名单。

## 可选：验证或使用 ad-hoc 签名

如果是在自己的 macOS 测试机上构建，可以使用系统自带的 ad-hoc 签名减少部分重复提示：

```sh
codesign --deep --force --sign - "MatrixClass Teacher.app"
codesign --deep --force --sign - "MatrixClass Student.app"
codesign --verify --deep --strict "MatrixClass Teacher.app"
codesign --verify --deep --strict "MatrixClass Student.app"
```

ad-hoc 签名不等于 Developer ID 签名，不提供公证，也不能替代正式分发所需的 Apple 开发者账号。

## 首次启动配置

### 教师端

1. 打开教师端并允许本地网络访问。
2. 选择数字频道 ID。
3. 输入教师端账号密码；首次启动可以设置账号。
4. 等待教师端主窗口进入就绪状态。

### 学生端

1. 打开学生端并设置退出密码。
2. 输入与教师端相同的数字频道 ID。
3. 保存后等待学生端连接教师端。
4. 连接成功后学生端通常以悬浮条或托盘状态运行。

## 授予系统权限

进入“系统设置 → 隐私与安全性”，按功能为对应的教师端或学生端 `.app` 授权。授权后完全退出并重新打开应用，部分权限不会对已经运行的进程立即生效。

### 屏幕录制

路径：**隐私与安全性 → 屏幕录制**。

用于屏幕广播、屏幕监控和屏幕采集。没有该权限时，控制消息可能正常，但教师端会看不到学生屏幕或无法广播桌面。

### 麦克风

路径：**隐私与安全性 → 麦克风**。

用于语音广播和课堂音频采集。拒绝权限时不要通过反复点击语音广播来恢复，应回到系统设置授权后重启应用。

### 辅助功能

路径：**隐私与安全性 → 辅助功能**。

用于远程鼠标、键盘、滚轮和部分课堂管控动作。将实际运行的 MatrixClass 应用加入列表，而不是只添加 zip 文件或 DMG 文件。

### 本地网络

路径：**隐私与安全性 → 本地网络**，部分系统版本也会在首次启动时弹出请求。

用于发现同一局域网中的教师端或学生端。拒绝后即使频道 ID 正确，学生端也可能一直处于连接中。

### 权限状态检查

打开应用后按功能逐项验证：先发课堂消息，再测试文件传输，最后测试屏幕和音频。这样可以区分网络连接问题与 macOS 原生权限问题。

## 从终端启动和查看错误

如果 Finder 双击没有明显提示，从终端启动可以看到更具体的错误：

```sh
"/Applications/MatrixClass Student.app/Contents/MacOS/matrixclass-student"
"/Applications/MatrixClass Teacher.app/Contents/MacOS/matrixclass-teacher"
```

看到 `permission denied` 时检查应用内部可执行文件权限：

```sh
chmod +x "/Applications/MatrixClass Student.app/Contents/MacOS/matrixclass-student"
chmod +x "/Applications/MatrixClass Teacher.app/Contents/MacOS/matrixclass-teacher"
```

如果提示应用已损坏或无法验证开发者，优先按 Finder 右键“打开”和“隐私与安全性”中的允许流程处理；不要把 `xattr` 命令作为常规安装步骤。

## macOS 上生成发行包

Windows 或 Linux 可以交叉构建 amd64、arm64 和 Universal `.app`/zip 检查产物：

```sh
scripts/build-darwin-package.sh dist/darwin
```

在 macOS 上还可以生成 DMG：

```sh
scripts/build-darwin-package.sh dist/darwin
```

脚本检测到 `hdiutil` 后会生成 `matrixclass-macos-universal.dmg`，并在 DMG 内放置两个应用、权限说明和指向 `/Applications` 的拖动入口。Windows 上没有 `hdiutil` 时只生成 `.app` 目录和 zip，不要把 zip 改名为 dmg。

如需本机 ad-hoc 签名：

```sh
SIGN_ADHOC=1 scripts/build-darwin-package.sh dist/darwin
```

这只适合测试机，不等于正式签名和公证。

## 卸载

### 教师端

退出教师端后，把 `MatrixClass Teacher.app` 移到废纸篓。需要清理用户数据时，再按项目数据目录说明手动备份和删除；不要在未备份数据库前清理配置目录。

### 学生端

发布包提供密码保护的卸载脚本。先进入脚本所在目录，再执行：

```sh
chmod +x uninstall-student.sh
./uninstall-student.sh "/Applications/MatrixClass Student.app"
```

脚本会调用学生端退出密码验证；验证失败会取消卸载。卸载应用不会自动删除用户数据、配置、日志和接收文件。

## macOS 常见问题

### Universal 是否代表 Intel 和 ARM 都能用

是。Universal 2 包同时包含 `amd64` 和 `arm64` 两套代码，但仍需要在实际 Mac 上验证屏幕采集、音频、辅助功能和本地网络权限。

### 能启动但看不到学生屏幕

检查教师端和学生端是否都获得屏幕录制权限；如果刚刚授权，完全退出应用后重新打开。然后确认两端频道和局域网连接正确。

### 学生端卸载时没有弹密码

不要直接把应用拖到废纸篓。使用发布包中的 `uninstall-student.sh`，并把实际 `.app` 路径作为参数传入；Finder 直接删除无法拦截并验证密码。

### 没有苹果开发者账号能不能发布

可以生成未签名 `.app`、zip 和在 macOS 上生成未签名 DMG，但用户首次打开需要手动允许。不能提供 Developer ID 签名、公证和无提示分发体验；这些需要 Apple Developer 账号。
