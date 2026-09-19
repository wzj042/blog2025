# 博客精简与上游跟进计划

> 目标：把 blog2025 从“改过的 AstroPaper 模板”逐步收敛成一个更容易维护的个人博客，同时尽量减少与上游 AstroPaper 的长期分叉。

## 当前基线

- 当前 `package.json` 仍标记为 AstroPaper `5.5.0`，Astro 为 `^5.12.0`。
- 上游 AstroPaper 已进入 v6 系列。v6 是一次破坏性升级：升级到 Astro 6，并调整配置、内容目录和 Content Layer。
- 因此不建议现在直接把上游 main 整体覆盖进来。先缩小本地定制面，再单独做 v6 迁移，会更容易审查和回滚。

## 1. 先保留什么

个人博客真正需要长期维护的核心可以先收敛到：

1. 首页文章索引。
2. 文章详情页。
3. Markdown / MDX 内容。
4. 基础 SEO、RSS、sitemap。
5. Header / Footer 与 About。
6. 文章 TOC。长文时保留，短文不显示。
7. Giscus 评论。如果后续实际使用率很低，再单独移除。

原则：内容与少量站点配置是“自己的”；通用组件、构建逻辑、SEO 和 Markdown 管线尽可能交给上游。

## 2. 可以优先精简的部分

### 首页

当前 `src/pages/index.astro` 已经把 Hero 注释掉，但仍保留整块死代码和未使用的 `Hr` import。

建议直接删除，而不是继续注释保存。

首页最终只承担：

- Header
- 最近文章列表
- “全部文章”入口
- Footer

后续若想重新设计 Hero，再从零加入。这样首页不会背着模板历史包袱。

### 文章详情页

`src/layouts/PostDetails.astro` 是目前本地定制最集中的位置，包括：

- 桌面端固定 TOC
- 移动端 FloatingTOCButton
- 分类 / 标签布局
- Giscus
- 阅读进度条
- heading anchor
- copy-code
- prev / next

这里不建议一次性删除功能，而应区分：

**保留本地产品选择**

- TOC 的呈现方式
- Giscus
- 中文化后的文章元信息布局

**优先回归上游实现**

- heading anchor
- copy-code
- prev / next
- BackToTop
- 通用文章布局逻辑

这些属于模板基础设施。本地复制越多，上游修 bug 时越难跟。

### Layout / 第三方资源

`src/layouts/Layout.astro` 目前直接加入了：

- Google Analytics / Partytown
- 外部 ByteDance CDN 的 KaTeX CSS

建议后续拆开：

- Analytics 做成明确的可选配置或独立组件。
- KaTeX 样式尽量跟 Markdown/数学渲染管线一起管理，不在全站 Layout 里硬编码一个旧版本 CDN。

这样 Layout 更接近上游，第三方依赖也更容易检查。

### 配置

当前站点信息在 `src/config.ts`，社交链接在 `src/constants.ts`。

上游 v6 已改为根目录统一的 `astro-paper.config.ts`。迁移时应顺势把个人配置集中到这一层，避免继续修改模板内部配置文件。

## 3. 上游值得跟进的内容

### 先补 v5.5.1

当前项目基线是 v5.5.0。v5.5.1 主要是 bugfix / refactor，包含：

- code block metadata 容错
- OG image 修复
- Tag 整体可点击
- LinkButton / props / 类型改进
- 语义化调整

这部分适合作为一个小 PR 单独同步，不和视觉精简混在一起。

### 再迁移 v6.x

v6 的价值不只是“升级依赖”，而是重新划清模板与用户配置的边界：

- Astro 6
- TypeScript 6
- 统一 `astro-paper.config.ts`
- 内容迁移到 `src/content/posts/`
- Content Layer 使用 `glob()`
- MDX 支持
- 配置化 feature flags
- 新的字体 API
- 一系列布局、SEO、路由和可访问性修复

v6.1 又加入了 callout、图片 lightbox，以及 RSS、标题 view-transition 等修复。

这属于迁移 PR，不应顺手夹带大量个人 UI 改造。

## 4. 推荐的 PR 顺序

### PR A：清理无效本地代码

风险最低。

- 删除首页被注释的 Hero。
- 删除未使用 import。
- 清理明显的模板残留和死代码。
- 不改变现有页面行为。

### PR B：收敛文章页定制

目标不是“删功能”，而是减少 fork surface。

逐项比较 `PostDetails.astro` 与当前上游实现，把已经由上游提供的通用逻辑恢复成上游版本，只留下本站确实需要的差异。

### PR C：同步 v5.5.1

作为 v5 最后的稳定落点，单独验证：

```sh
pnpm install
pnpm lint
pnpm build
```

### PR D：迁移 AstroPaper v6

单独处理 breaking changes：

- 新配置文件
- 内容目录迁移
- collection/content config
- Astro 6 / TS 6
- 本地定制重新套回去

迁移完成后再考虑 v6.1 的 callout、lightbox 是否需要开启。

## 5. 长期跟进上游的方式

不建议频繁把上游 main 直接 merge 到个人博客。

更稳的方式是：

1. 记录当前对应的 AstroPaper release。
2. 只按 release 跟进，不追上游每个 commit。
3. 先读 changelog / migration guide。
4. 通用 bugfix 尽量同步。
5. 新功能默认不接，确实需要再开。
6. 每次升级单独 PR，并跑 build。
7. 个人定制尽量集中在少数文件和配置中。

理想状态是：以后升级 AstroPaper 时，大部分文件可以直接采用上游版本，只需要重新检查配置、首页和文章页三个小区域。

## 本轮不做

这份 PR 只做梳理，不直接执行 v6 升级或大规模删除功能。

原因是当前 v5 → v6 跨越了 Astro 主版本、内容目录和配置系统。先把边界写清楚，再拆成小 PR，会比一次“巨型升级”更容易验证。
