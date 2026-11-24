---
layout: home

hero:
  name: MatrixClass
  text: 矩联电子教室
  tagline: 简洁、快速、可靠的局域网电子教室
  image:
    src: /screenshots/teacher-device-view.png
    alt: MatrixClass 教师端设备视图
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick-start
    - theme: alt
      text: 下载
      link: /download
    - theme: alt
      text: 常见问题
      link: /faq/
    - theme: sponsor
      text: GitHub
      link: https://github.com/MatrixClass/MatrixClass

features:
  - title: 界面简洁
    details: 黑白灰配色，常用功能一屏可达。<br>启动即用，无需加载网页内核。
    link: /teacher/
  - title: 跨平台
    details: 支持 Windows / Linux / macOS<br>兼容 x86_64 / ARM64 / LoongArch 架构<br>适配主流国产 CPU 与操作系统
    link: /download
  - title: 一键加入
    details: 学生端输入数字频道即可自动发现教师端。<br>断线后持续重连，无需人工干预。
    link: /student/first-run
  - title: 防伪装破解
    details: 教师身份指纹校验，挡住同网段伪装教师端。<br>退出、卸载、参数设置均需密码。
    link: /teacher/settings
  - title: 屏幕广播与监控
    details: 教师屏幕实时广播，学生屏幕批量监控。<br>断联恢复后自动请求关键帧。
    link: /teacher/broadcast
  - title: 网络影院
    details: 教师端视频实时推流到学生端。<br>教师统一控制播放、暂停与进度。
    link: /teacher/broadcast
  - title: 文件与作业
    details: 文件、文件夹批量分发，断点续传、失败重试。<br>一键收取作业，学生拖拽提交。
    link: /teacher/files-homework
  - title: 课堂互动与管控
    details: 消息、点名签到、随堂测验、举手。<br>黑屏锁屏、管控策略、远程启动程序与命令。
    link: /teacher/classroom-tools
  - title: 抗 UDP 丢包
    details: 基于 KCP 协议传输，连接快、丢包少。<br>多网卡同时监听，自动忽略虚拟网卡。
    link: /deploy/network
---
