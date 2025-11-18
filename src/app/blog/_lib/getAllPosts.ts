import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter } from "../_types/post";

const postsDirectory = path.join(process.cwd(), "src/app/blog/_data/posts");

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as PostFrontmatter;

      return {
        ...frontmatter,
        content,
      };
    });

  return allPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
