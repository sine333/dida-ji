# 滴答记 · DiDa Ji

2026-06-26 更新 from Codex

滴答记是一个手机优先的个人饮食与身体记录 Web App。当前版本是静态网页应用，主文件是 `dida-ji.html`，`index.html` 会跳转到主页面。

这个项目可以部署到 GitHub Pages、Vercel 或其他静态托管服务。手机浏览器打开线上地址后，可以添加到桌面，像小 App 一样使用。

## 当前功能

- 饮食记录：早餐、午餐、晚餐、加餐。
- 饮食记录删除。
- 今日感受记录。
- 大便情况记录：基于布里斯托大便分类法简化为 5 类。
- 大便情况鼓励弹窗：每次记录后给出一条轻松搞笑的身体线索鼓励语。
- 大便情况 5 次彩蛋：每累计 5 次记录触发一次小彩蛋。
- 月历回顾：查看每天的饮食、感受和大便情况。
- Markdown 导出：导出饮食与身体记录。
- Supabase 登录与云同步。
- PWA 基础缓存：支持手机桌面入口和离线缓存。

## 当前文件结构

部署时需要保留下面这些文件和文件夹的位置：

```text
index.html
dida-ji.html
manifest.webmanifest
sw.js
icon.svg
assets/
  2026-06-26-bowel-icon-hard-pebbles-from-Codex.png
  2026-06-26-bowel-icon-lumpy-hard-from-Codex.png
  2026-06-26-bowel-icon-smooth-formed-from-Codex.png
  2026-06-26-bowel-icon-soft-mushy-from-Codex.png
  2026-06-26-bowel-icon-watery-from-Codex.png
```

注意：`assets` 文件夹必须放在仓库根目录，文件夹名是小写 `assets`。如果这五张图片没有一起上传，页面里的大便情况图标会打不开。

## GitHub 上传检查

每次更新线上版本时，至少确认这些文件已经上传到 GitHub：

- `dida-ji.html`
- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`
- 整个 `assets` 文件夹

版本说明文件请放在：

```text
版本小结/
```

例如：

```text
版本小结/2026-06-26 - 滴答记大便情况五类记录版本小结 from Codex.md
```

不要把版本小结散放在仓库根目录。

## Supabase 数据库脚本

当前版本需要运行两份 SQL。

第一份是基础同步表：

```text
2026-06-25 - Supabase schema from Codex.sql
```

第二份是大便情况记录表：

```text
2026-06-26 - Supabase bowel records schema from Codex.sql
```

运行位置：

```text
Supabase Dashboard > SQL Editor
```

如果第二份脚本还没运行，应用仍然可以在本机记录大便情况；饮食和今日感受同步不会被影响。运行后，大便情况会加入云同步。

## Supabase 邮箱登录

当前前端已经有验证码输入框，但验证码能不能收到，取决于 Supabase Auth 邮件模板。

### 默认情况

如果没有设置 Custom SMTP，Supabase 会使用默认邮件模板。这个状态下通常只能收到登录链接，不能自定义邮件正文，也不能把 `{{ .Token }}` 加进去。

### 要收到验证码，需要做三步

1. 在 Supabase 里设置 Custom SMTP。
2. 回到 `Authentication > Email Templates > Magic Link or OTP`。
3. 在邮件标题或正文里加入 `{{ .Token }}`。

邮件标题可以写：

```text
滴答记登录验证码：{{ .Token }}
```

邮件正文可以写：

```html
<h2>滴答记登录验证码</h2>

<p>你的验证码是：</p>

<h1 style="font-size: 32px; letter-spacing: 6px;">{{ .Token }}</h1>

<p>把这个验证码填回滴答记登录框即可。</p>

<p>如果你更习惯链接，也可以点这里登录：</p>

<p><a href="{{ .ConfirmationURL }}">打开滴答记</a></p>
```

## Gmail SMTP 快速配置

如果只是先把验证码跑通，可以用 Gmail SMTP。

Google 账号需要先开启：

```text
两步验证
```

然后生成：

```text
应用专用密码
```

Supabase 的 SMTP 配置填写：

```text
Sender email: 你的 Gmail 地址
Sender name: 滴答记
SMTP host: smtp.gmail.com
SMTP port: 587
SMTP username: 你的 Gmail 地址
SMTP password: Google 生成的应用专用密码
```

注意：这里的 `SMTP password` 不是 Gmail 登录密码，而是 Google 生成的应用专用密码。

## 手机桌面入口与缓存

`sw.js` 当前缓存版本是：

```text
dida-ji-cache-v12
```

如果手机桌面入口打开后还是旧样子，可以按这个顺序处理：

1. 先用手机浏览器直接打开线上地址。
2. 下拉或重新加载页面。
3. 确认新页面里能看到大便情况入口。
4. 如果桌面图标还是旧版本，删除旧桌面图标后重新添加。

## 常见问题

### 大便情况五张图打不开

优先检查：

- GitHub 上是否有 `assets` 文件夹。
- 五张 PNG 是否都在 `assets` 文件夹里。
- 文件名是否和本地一致。
- 部署平台是否已经重新部署。
- 手机是否还在使用旧 PWA 缓存。

### 邮件只有链接，没有验证码

原因通常是还没设置 Custom SMTP，或者邮件模板没有加入：

```text
{{ .Token }}
```

先完成 SMTP，再重新发送邮件。旧邮件不会自动变成验证码邮件。

### 从手机桌面打开又要求登录

手机桌面入口和浏览器里的登录状态可能不完全一致。配置好验证码后，推荐从桌面入口直接输入邮件验证码登录，而不是依赖邮箱链接跳回浏览器。

## 维护原则

- `dida-ji.html` 是当前真实应用入口。
- `index.html` 只负责跳转。
- `sw.js` 每次改静态资源时要升级缓存版本。
- 新图片资源要放进 `assets` 并加入 `sw.js` 缓存清单。
- 新数据库能力要有独立 SQL 文件。
- 版本说明统一放入 `版本小结/`。
