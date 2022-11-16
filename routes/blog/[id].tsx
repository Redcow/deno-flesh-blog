import { Head } from "$fresh/runtime.ts";
import { load, Post } from "../../utils/Post.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as gfm from "$x/gfm@0.1.26/mod.ts";

export const handler: Handlers<Post> = {
  async GET(req, ctx) {
    const id: string = ctx.params.id;
    const post = await load(id);

    if (!post) return new Response("Post not found", { status: 404 });

    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  const html = gfm.render(post.content);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="mt-12">{post.publishedAt.toLocaleDateString()}</p>
        <h1 class="font-bold text-blue-600">{post.title}</h1>
        <style dangerouslySetInnerHTML={{__html: gfm.CSS}} />
        <div class="markdown-body" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </>
  );
}
