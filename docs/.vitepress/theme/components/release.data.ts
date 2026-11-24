export interface ReleaseAsset { name: string; url: string; size: number }
export interface ReleaseData { tag: string; publishedAt: string; assets: ReleaseAsset[] }

const repo = 'MatrixClass/MatrixClass'

declare const data: ReleaseData
export { data }

async function fromApi(): Promise<ReleaseData> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const json: any = await res.json()
  return {
    tag: json.tag_name,
    publishedAt: (json.published_at || '').slice(0, 10),
    assets: (json.assets || []).map((a: any) => ({ name: a.name, url: a.browser_download_url, size: a.size })),
  }
}

async function fromHtml(): Promise<ReleaseData> {
  const latest = await fetch(`https://github.com/${repo}/releases/latest`, { redirect: 'follow' })
  const tag = decodeURIComponent(latest.url.split('/tag/')[1] || '')
  if (!tag) throw new Error('no release tag')
  const html = await (await fetch(`https://github.com/${repo}/releases/expanded_assets/${tag}`)).text()
  const names = [...new Set([...html.matchAll(/\/releases\/download\/[^/"]+\/([^"?#]+)/g)].map(m => decodeURIComponent(m[1])))]
  return {
    tag,
    publishedAt: '',
    assets: names.map(name => ({ name, url: `https://github.com/${repo}/releases/download/${tag}/${name}`, size: 0 })),
  }
}

export default {
  async load(): Promise<ReleaseData> {
    for (const source of [fromApi, fromHtml]) {
      try {
        const result = await source()
        console.log(`[download] ${result.tag}: ${result.assets.length} assets (${source.name})`)
        return result
      } catch (err) {
        console.warn(`[download] ${source.name} failed: ${(err as Error).message}`)
      }
    }
    return { tag: '', publishedAt: '', assets: [] }
  },
}