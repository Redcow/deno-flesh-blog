import { Head } from "$fresh/runtime.ts";
import { load, Post } from "../../utils/Post.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

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

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="mt-12">{post.publishedAt.toLocaleDateString()}</p>
        <h1 class="font-bold text-blue-600">{post.title}</h1>
        <div>
          {post.content}
        </div>
      </div>
    </>
  );
}
