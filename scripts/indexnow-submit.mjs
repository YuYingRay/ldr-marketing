/**
 * IndexNow 提交(2026-08-28):读线上 sitemap,把全部 URL 批量提交给 api.indexnow.org
 * (Bing/Seznam/Naver/Yandex 共享端点;Bing 是我们的目标——中国桌面专业人群主入口)。
 *
 * 触发:.github/workflows/indexnow.yml 在 push main 后延迟运行(等 Vercel 部署换版);
 * 也可本地手跑 `node scripts/indexnow-submit.mjs`。
 * 幂等安全:重复提交同一批 URL 无副作用,IndexNow 语义就是"这些 URL 变了,来抓"。
 * key 是公开的(keyLocation 文件本身就证明域名所有权),放仓库无泄密问题。
 * 注意:响应 200/202 都算成功;4xx 打出正文方便排错(常见 = key 文件还没随部署上线)。
 */
const HOST = "www.ldr-design.com";
const KEY = "588896e54f48e07e1b10a68d6f296648";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// 先验证 key 文件已经在线上(部署未完成就 ping,IndexNow 校验 keyLocation 会失败)
const keyRes = await fetch(KEY_LOCATION);
const keyBody = (await keyRes.text()).trim();
if (!keyRes.ok || keyBody !== KEY) {
  console.error(`key file not live yet (HTTP ${keyRes.status}, body=${keyBody.slice(0, 40)}) — deploy first`);
  process.exit(1);
}

// 读 sitemap index → 各分片 → 汇总 URL
const urls = [];
const idx = await (await fetch(`https://${HOST}/sitemap-index.xml`)).text();
const sitemaps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const sm of sitemaps) {
  const xml = await (await fetch(sm)).text();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1]);
}
if (urls.length === 0) {
  console.error("sitemap yielded 0 urls — aborting");
  process.exit(1);
}
console.log(`submitting ${urls.length} urls from ${sitemaps.length} sitemap(s)`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls.slice(0, 10000) }),
});
const body = await res.text();
console.log(`IndexNow HTTP ${res.status}${body ? ` — ${body.slice(0, 200)}` : ""}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
console.log("done");
