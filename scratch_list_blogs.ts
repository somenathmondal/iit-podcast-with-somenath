import { blogEntries } from "./src/data/blogs";
blogEntries.forEach((blog, i) => console.log(`${i + 1}. [${blog.id}] ${blog.title}`));
