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
