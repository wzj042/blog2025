import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tagMap = new Map<string, { tagName: string; count: number }>();
  posts.filter(postFilter).forEach(post => {
    post.data.tags.forEach((tag: string) => {
      const slug = slugifyStr(tag);
      if (tagMap.has(slug)) {
        tagMap.get(slug)!.count++;
      } else {
        tagMap.set(slug, { tagName: tag, count: 1 });
      }
    });
  });
  const tags: Tag[] = Array.from(tagMap.entries()).map(
    ([tag, { tagName, count }]) => ({ tag, tagName, count })
  );
  return tags.sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
};

export default getUniqueTags;
