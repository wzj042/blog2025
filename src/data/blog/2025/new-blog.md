---
author: wzj042
pubDatetime: 2025-07-30T10:40:08Z
modDatetime: 2025-07-30T18:59:05Z
title: 改为使用 Astro 发布内容
description: ""
---

> 翻阅了大部分博客后，选择抄 [Velari](https://github.com/LoganQiu/Velari) 的方案。
> 
> *移除了引述块的默认斜体*

- [setting-dates-via-git-hooks](https://astro-paper.pages.dev/posts/setting-dates-via-git-hooks/)
- [integrate-giscus-comments](https://astro-paper.pages.dev/posts/how-to-integrate-giscus-comments/)
- [adding-new-posts](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)

## 代码高亮

```java
public class FastIOTest {
	public static void main(String[] args) throws IOException{
		//建立流标识器的常用方法
		// [!code highlight:1]
		StreamTokenizer in = new StreamTokenizer(new BufferedReader(new InputStreamReader(System.in)));	
	}
}
```

```ts
// ...
// [!code --:5]
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
      // [!code ++:3]
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  // ...
}
```


## 公式渲染

行内 $\LaTeX$ 渲染

块级
$$
\begin{aligned}
	(0.35)_{10}= (0.011)_{2}    \\
	0.375 \times 2 = 0.75 \to 0 \\
	0.75 \times 2 = 1.5 \to 1   \\
	0.5 \times 2 = 1 \to 1
\end{aligned}
$$