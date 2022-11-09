import { Head } from "$fresh/runtime.ts";
import { Post } from "../../utils/Post.ts";

const post: Post = {
  id: "hello",
  title: "Hello World",
  publishedAt: new Date(),
  snippet: "test",
  content: "le contenu"
}

export default function PostPage() {
  return (
    <>
      <Head>
        <title>Ma Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="mt-12">{post.publishedAt.toLocaleDateString()}</p>
        <h1 class="font-bold text-blue-600"> {post.title} </h1>
        <div>
          {post.content}
        </div>
      </div>
    </>
  );
}
