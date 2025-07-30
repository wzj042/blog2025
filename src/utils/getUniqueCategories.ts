import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface Category {
  category: string;
  categoryName: string;
  count: number;
}

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  const categoryMap = new Map<
    string,
    { categoryName: string; count: number }
  >();

  posts.filter(postFilter).forEach(post => {
    if (post.data.category) {
      const slug = slugifyStr(post.data.category);
      if (categoryMap.has(slug)) {
        categoryMap.get(slug)!.count++;
      } else {
        categoryMap.set(slug, { categoryName: post.data.category, count: 1 });
      }
    }
  });

  const categories: Category[] = Array.from(categoryMap.entries()).map(
    ([category, { categoryName, count }]) => ({ category, categoryName, count })
  );

  return categories.sort((categoryA, categoryB) =>
    categoryA.category.localeCompare(categoryB.category)
  );
};

export default getUniqueCategories;
