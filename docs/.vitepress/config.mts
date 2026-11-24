import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'MatrixClass 文档',
  description: '矩联电子教室 MatrixClass 官方文档',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon-32.png' }]],
  themeConfig: {
    siteTitle: 'MatrixClass',
    logo: '/matrixclass-teacher.png',
    nav: [
      { text: '概览', link: '/' },
      { text: '快速开始', link: '/guide/quick-start' },
      { text: '下载', link: '/download' },
      { text: '教师端', link: '/teacher/' },
      { text: '学生端', link: '/student/' },
      { text: '部署与网络', link: '/deploy/' },
      { text: '常见问题', link: '/faq/' },
      { text: 'GitHub', link: 'https://github.com/MatrixClass/MatrixClass' },
    ],
    sidebar: {
      '/guide/': [
        { text: '开始使用', items: [
          { text: '快速开始', link: '/guide/quick-start' },
          { text: '安装与首次配置', link: '/guide/installation' },
          { text: '一堂课的完整流程', link: '/guide/classroom-flow' },
          { text: '工作原理', link: '/guide/architecture' },
          { text: '故障排查清单', link: '/guide/troubleshooting' },
        ] },
      ],
      '/teacher/': [
        { text: '教师端', items: [
          { text: '教师端概览', link: '/teacher/' },
          { text: '频道、账号与设置', link: '/teacher/settings' },
          { text: '设备视图与监控', link: '/teacher/device-view' },
          { text: '广播、影院与演示', link: '/teacher/broadcast' },
          { text: '文件与作业', link: '/teacher/files-homework' },
          { text: '消息、签到与测验', link: '/teacher/classroom-tools' },
          { text: '远程操作', link: '/teacher/remote-ops' },
          { text: '管控策略', link: '/teacher/policies' },
        ] },
      ],
      '/student/': [
        { text: '学生端', items: [
          { text: '学生端概览', link: '/student/' },
          { text: '首次启动与频道', link: '/student/first-run' },
          { text: '课堂消息与通知', link: '/student/messages' },
          { text: '文件接收与作业提交', link: '/student/messages-homework' },
          { text: '断线重连与托盘', link: '/student/connection' },
        ] },
      ],
      '/deploy/': [
        { text: '部署与网络', items: [
          { text: '部署概览', link: '/deploy/' },
          { text: '频道与 KCP', link: '/deploy/network' },
          { text: '防火墙与多网卡', link: '/deploy/firewall' },
          { text: 'Windows 安装', link: '/deploy/windows' },
          { text: 'Linux 安装', link: '/deploy/linux' },
          { text: 'macOS 安装', link: '/deploy/macos' },
          { text: '跨平台能力', link: '/deploy/platforms' },
          { text: '发行包与目录结构', link: '/deploy/releases' },
        ] },
      ],
      '/faq/': [{ text: '常见问题', items: [{ text: '常见问题', link: '/faq/' }] }],
      '/development/': [{ text: '开发者', items: [{ text: '开发指南', link: '/development/' }, { text: '模块与协议', link: '/development/modules' }, { text: 'CI 与发布', link: '/development/ci-release' }, { text: '贡献规范', link: '/development/contributing' }] }],
    },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/MatrixClass/MatrixClass' }],
    outline: { label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    langMenuLabel: '语言',
    footer: { message: '矩联电子教室 MatrixClass', copyright: 'Copyright © JiuXia2025' },
  },
})
