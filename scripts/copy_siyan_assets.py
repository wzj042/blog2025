"""
复制思源工作空间的笔记图片到博客 public/assets/cs-course/
建立 cnblogs URL -> 新路径 映射，用于后续批量替换。
"""

from __future__ import annotations

import re
import shutil
from pathlib import Path

SRC = Path(r"C:\XQH\SiYuan\data\assets")
DST = Path(r"C:\Users\XQH\Downloads\blog2025\public\assets\cs-course")
MAP_OUT = Path(r"C:\Users\XQH\Downloads\blog2025\scripts\image_map.tsv")


def main() -> None:
    DST.mkdir(parents=True, exist_ok=True)
    # cnblogs URL -> (时间戳, hash) -> 新文件名
    # 原 URL 形式: https://img2022.cnblogs.com/blog/1674552/202208/1674552-20220809195539067-1810979611.png
    # 文件名形式: network-asset-1674552-20220809195539067-1810979611-20250820071013-osxwqi6.png
    # 通过中间 20220809195539067-1810979611 部分做关联
    pattern_url = re.compile(r"1674552-(\d+)-(\d+)-\d+\.png")

    files = sorted(SRC.glob("network-asset-1674552-*.png"))
    files += sorted(SRC.glob("network-asset-1674552-*.jpg"))
    files += sorted(SRC.glob("network-asset-1674552-*.jpeg"))
    files += sorted(SRC.glob("network-asset-1674552-*.gif"))
    files += sorted(SRC.glob("network-asset-1674552-*.webp"))
    # 一些早期图片命名格式不同
    files += sorted(SRC.glob("network-asset-v2-*.jpg"))
    files += sorted(SRC.glob("network-asset-v2-*.webp"))
    files += sorted(SRC.glob("network-asset-v2-*.png"))
    files += sorted(SRC.glob("network-asset-20200721141323_*.jpg"))
    files += sorted(SRC.glob("network-asset-04f11665*.gif"))
    files += sorted(SRC.glob("network-asset-20190601221021727-*.png"))
    files += sorted(SRC.glob("network-asset-592fd0b0*.jpeg"))

    # 去重（按文件名）
    seen: set[str] = set()
    unique = []
    for f in files:
        if f.name in seen:
            continue
        seen.add(f.name)
        unique.append(f)

    print(f"候选图片 {len(unique)} 张")
    copied = 0
    skipped = 0
    with MAP_OUT.open("w", encoding="utf-8") as out:
        out.write("original_url_or_ref\tnew_path\n")
        for src in unique:
            dst = DST / src.name
            try:
                shutil.copy2(src, dst)
                copied += 1
            except OSError as exc:
                skipped += 1
                print(f"复制失败 {src.name}: {exc}")
                continue
            rel = f"/assets/cs-course/{src.name}"
            # 同时构造可能的 cnblogs URL（用于替换时回查）
            out.write(f"{src.name}\t{rel}\n")
    print(f"已复制 {copied} 张，跳过 {skipped} 张")
    print(f"映射已写入 {MAP_OUT}")


if __name__ == "__main__":
    main()