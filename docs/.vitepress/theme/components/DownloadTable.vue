<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as buildRelease } from './release.data'

const repo = 'MatrixClass/MatrixClass'
const releasesPage = `https://github.com/${repo}/releases/latest`

const mirrors = [
  { label: '直连', prefix: '' },
  { label: 'ghfast.top', prefix: 'https://ghfast.top/' },
  { label: 'gh-proxy.com', prefix: 'https://gh-proxy.com/' },
  { label: 'ghproxy.net', prefix: 'https://ghproxy.net/' },
]

type Kind = 'exe' | 'deb' | 'rpm' | 'dmg' | 'zip' | 'tar.gz'
interface Rule { label: Kind; match: RegExp }
interface Row {
  os: string
  arch: string
  teacher: Rule[]
  student: Rule[]
  portable: Rule[]
  note: string
}

const rows: Row[] = [
  {
    os: 'Windows', arch: 'x86_64',
    teacher: [{ label: 'exe', match: /^matrixclass-teacher-windows-amd64-.*-setup\.exe$/ }],
    student: [{ label: 'exe', match: /^matrixclass-student-windows-amd64-.*-setup\.exe$/ }],
    portable: [{ label: 'zip', match: /^matrixclass-windows-amd64\.zip$/ }],
    note: '支持 Windows 10 / 11。学生端安装完成后会自动启动，首次启动需设置退出密码和频道 ID。',
  },
  {
    os: 'Windows', arch: 'arm64',
    teacher: [{ label: 'exe', match: /^matrixclass-teacher-windows-arm64-.*-setup\.exe$/ }],
    student: [{ label: 'exe', match: /^matrixclass-student-windows-arm64-.*-setup\.exe$/ }],
    portable: [{ label: 'zip', match: /^matrixclass-windows-arm64\.zip$/ }],
    note: '适用于 Windows on ARM 设备。',
  },
  {
    os: 'Linux', arch: 'x86_64',
    teacher: [
      { label: 'deb', match: /^matrixclass-teacher_.*_amd64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-teacher-.*\.x86_64\.rpm$/ },
    ],
    student: [
      { label: 'deb', match: /^matrixclass-student_.*_amd64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-student-.*\.x86_64\.rpm$/ },
    ],
    portable: [{ label: 'tar.gz', match: /^matrixclass-linux-amd64\.tar\.gz$/ }],
    note: '需要图形桌面（X11）。教师机装教师端包，学生机装学生端包；Debian 系选 deb，openEuler / 龙蜥等选 rpm。',
  },
  {
    os: 'Linux', arch: 'aarch64',
    teacher: [
      { label: 'deb', match: /^matrixclass-teacher_.*_arm64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-teacher-.*\.aarch64\.rpm$/ },
    ],
    student: [
      { label: 'deb', match: /^matrixclass-student_.*_arm64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-student-.*\.aarch64\.rpm$/ },
    ],
    portable: [{ label: 'tar.gz', match: /^matrixclass-linux-arm64\.tar\.gz$/ }],
    note: '适用于鲲鹏、飞腾、树莓派等 ARM64 设备。',
  },
  {
    os: 'Linux', arch: 'loongarch64',
    teacher: [
      { label: 'deb', match: /^matrixclass-teacher_.*_loong64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-teacher-.*\.loongarch64\.rpm$/ },
    ],
    student: [
      { label: 'deb', match: /^matrixclass-student_.*_loong64\.deb$/ },
      { label: 'rpm', match: /^matrixclass-student-.*\.loongarch64\.rpm$/ },
    ],
    portable: [{ label: 'tar.gz', match: /^matrixclass-linux-loong64\.tar\.gz$/ }],
    note: '适用于龙芯 3A5000 / 3A6000 等新世界 LoongArch 系统。',
  },
  {
    os: 'macOS', arch: 'Universal',
    teacher: [{ label: 'dmg', match: /^matrixclass-macos-universal\.dmg$/ }],
    student: [{ label: 'dmg', match: /^matrixclass-macos-universal\.dmg$/ }],
    portable: [{ label: 'zip', match: /^matrixclass-macos-universal\.zip$/ }],
    note: 'dmg 内同时包含教师端与学生端，同时支持 Intel 与 Apple 芯片。未经苹果公证，首次打开需在“隐私与安全性”中允许。',
  },
  {
    os: 'macOS', arch: 'x86_64',
    teacher: [], student: [],
    portable: [{ label: 'zip', match: /^matrixclass-macos-amd64\.zip$/ }],
    note: '仅 Intel 芯片 Mac，压缩包内同时包含教师端与学生端。',
  },
  {
    os: 'macOS', arch: 'arm64',
    teacher: [], student: [],
    portable: [{ label: 'zip', match: /^matrixclass-macos-arm64\.zip$/ }],
    note: '仅 Apple 芯片（M 系列）Mac，压缩包内同时包含教师端与学生端。',
  },
]

const mirror = ref('')
const osFilter = ref('全部')
const archFilter = ref('全部')
const assets = ref(buildRelease.assets)
const version = ref(buildRelease.tag)
const publishedAt = ref(buildRelease.publishedAt)
const state = ref<'loading' | 'ready' | 'error'>(buildRelease.tag ? 'ready' : 'loading')

const osOptions = ['全部', ...new Set(rows.map(r => r.os))]
const archOptions = computed(() => ['全部', ...new Set(rows.filter(r => osFilter.value === '全部' || r.os === osFilter.value).map(r => r.arch))])
const filtered = computed(() => rows.filter(r =>
  (osFilter.value === '全部' || r.os === osFilter.value) &&
  (archFilter.value === '全部' || r.arch === archFilter.value)))

function onOsChange() {
  if (!archOptions.value.includes(archFilter.value)) archFilter.value = '全部'
}

function find(rule: Rule) {
  return assets.value.find(a => rule.match.test(a.name))
}
function href(rule: Rule) {
  const asset = find(rule)
  const url = asset ? asset.url : releasesPage
  return mirror.value + url
}
function title(rule: Rule) {
  const asset = find(rule)
  if (!asset) return '在 Releases 页面查找'
  return asset.size ? `${asset.name}（${(asset.size / 1024 / 1024).toFixed(1)} MB）` : asset.name
}

onMounted(async () => {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } })
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()
    version.value = data.tag_name
    publishedAt.value = (data.published_at || '').slice(0, 10)
    assets.value = (data.assets || []).map((a: any) => ({ name: a.name, url: a.browser_download_url, size: a.size }))
    state.value = 'ready'
  } catch {
    if (!version.value) state.value = 'error'
  }
})
</script>

<template>
  <div class="mc-download">
    <p class="mc-status">
      <template v-if="state === 'loading'">正在获取最新版本信息…</template>
      <template v-else-if="state === 'ready'">最新版本 <b>{{ version }}</b><span v-if="publishedAt">，发布于 {{ publishedAt }}</span></template>
      <template v-else>暂时无法获取版本信息，按钮将跳转到 <a :href="releasesPage" target="_blank" rel="noreferrer">GitHub Releases</a> 页面。</template>
    </p>

    <ul class="mc-filters">
      <li>
        <span>GitHub 加速</span>
        <select v-model="mirror">
          <option v-for="m in mirrors" :key="m.label" :value="m.prefix">{{ m.label }}</option>
        </select>
      </li>
      <li>
        <span>根据操作系统筛选</span>
        <select v-model="osFilter" @change="onOsChange">
          <option v-for="o in osOptions" :key="o" :value="o">{{ o }}</option>
        </select>
      </li>
      <li>
        <span>根据硬件架构筛选</span>
        <select v-model="archFilter">
          <option v-for="a in archOptions" :key="a" :value="a">{{ a }}</option>
        </select>
      </li>
    </ul>

    <table>
      <thead>
        <tr>
          <th>操作系统</th>
          <th>硬件架构</th>
          <th>教师端安装包</th>
          <th>学生端安装包</th>
          <th>便携压缩包</th>
          <th>注意事项</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filtered" :key="row.os + row.arch">
          <td>{{ row.os }}</td>
          <td>{{ row.arch }}</td>
          <td v-for="col in [row.teacher, row.student, row.portable]">
            <a v-for="rule in col" :key="rule.label" class="mc-btn" :class="{ missing: state === 'ready' && !find(rule) }"
               :href="href(rule)" :title="title(rule)" target="_blank" rel="noreferrer">{{ rule.label }}</a>
          </td>
          <td class="mc-note">{{ row.note }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.mc-status { color: var(--vp-c-text-2); }
.mc-filters { padding-left: 1.25rem; }
.mc-filters li { margin: 10px 0 16px; }
.mc-filters span { display: block; margin-bottom: 8px; }
.mc-filters select {
  min-width: 220px; height: 34px; padding: 0 12px;
  border: 1px solid var(--vp-c-divider); border-radius: 6px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); font-size: 14px;
}
.mc-filters select:focus { outline: none; border-color: var(--vp-c-brand-1); }
.mc-download table { display: table; width: 100%; }
.mc-download td { vertical-align: middle; }
.mc-btn {
  display: inline-block; margin: 3px 4px 3px 0; padding: 3px 10px;
  border-radius: 5px; background: var(--vp-c-brand-1); color: var(--vp-c-bg) !important;
  font-size: 13px; font-weight: 600; line-height: 22px; text-decoration: none !important; white-space: nowrap;
}
.mc-btn:hover { opacity: .82; }
.mc-btn.missing { background: var(--vp-c-default-soft); color: var(--vp-c-text-3) !important; }
.mc-note { font-size: 13px; color: var(--vp-c-text-2); min-width: 200px; }
</style>
