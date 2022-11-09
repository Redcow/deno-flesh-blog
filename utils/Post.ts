import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  id: string;
  title: string;
  publishedAt: Date;
  snippet: string;
  content: string;
}

export async function load(id: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return null;
    }
    return error;
  }

  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishedAt = new Date(params.publish_at);

  return {
    id,
    title: params.title,
    publishedAt,
    snippet: params.snippet,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const loadJobs = [];

  for await (const entry of Deno.readDir("./data/posts")) {
    const id = entry.name.slice(0, -3);
    loadJobs.push(load(id));
  }

  const posts = await Promise.all(loadJobs) as Post[];

  return posts.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}
