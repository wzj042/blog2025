export const SITE = {
  website: "https://blog.xqher.cn/", // replace this with your deployed domain
  author: "wzj042",
  profile: "https://blog.xqher.cn/",
  desc: "这些内容怎么会是我发布的呢？\n How could these contents have been posted by me?",
  title: "wzj042",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: false, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/wzj042/blog2025/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
