import { Head } from "$fresh/runtime.ts";
import { Post, listPosts } from "../utils/Post.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<Post[]> = {
  async GET(req, ctx) {
    const posts = await listPosts();

    if (posts.length === 0) return new Response("No Post found", { status: 404 });

    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <Head>
        <title>Ma Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="font-bold text-blue-600">François's blog</h1>
        <ul>
         {posts.map(post => <PostEntry post={post} />)}
        </ul>
      </div>
    </>
  );
}

function PostEntry( props: {post: Post})
{
  const post = props.post;

  return <li class="border-t">
    <a href={`/blog/${post.id}`} class="py-2 flex gap-4">
      <div>
        {post.publishedAt.toLocaleDateString()}
      </div>
      <div>
        <h2 class="font-bold hover:underline">{post.title}</h2>
        <p>{post.snippet}</p>
      </div>
      
      </a>
    </li>;
}
