# 2026-06-26 - 滴答记大便情况五类记录版本小结 from Codex

## 本次更新

- 在真实应用 `dida-ji.html` 加入“大便情况”记录维度。
- 将布里斯托大便分类简化为 5 类：硬颗粒、块状偏硬、顺滑成形、松软偏糊、水样。
- 五个入口只显示图片，不在按钮里放中文，避免一行过挤。
- 支持同一天记录多次大便情况，并支持删除单条记录。
- 日历详情页会显示当天的大便情况。
- Markdown 导出从“饮食记录”扩展为“饮食与身体记录”，包含饮食、大便情况、今日感受。
- Service Worker 缓存版本从 `dida-ji-cache-v9` 升级到 `dida-ji-cache-v10`，并缓存五张新图标。

## 新增文件

- `assets/2026-06-26-bowel-icon-hard-pebbles-from-Codex.png`
- `assets/2026-06-26-bowel-icon-lumpy-hard-from-Codex.png`
- `assets/2026-06-26-bowel-icon-smooth-formed-from-Codex.png`
- `assets/2026-06-26-bowel-icon-soft-mushy-from-Codex.png`
- `assets/2026-06-26-bowel-icon-watery-from-Codex.png`
- `2026-06-26 - Supabase bowel records schema from Codex.sql`

## 上线前提醒

先在 Supabase SQL Editor 运行 `2026-06-26 - Supabase bowel records schema from Codex.sql`。

如果暂时没运行脚本，应用仍然可以在本机记录大便情况；饮食和今日感受同步不会被影响。运行脚本后，大便情况会自动参与云同步。
