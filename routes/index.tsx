import { Head } from "$fresh/runtime.ts";
import { Post } from "../utils/Post.ts";

const post: Post = {
  id: "hello",
  title: "Hello World",
  publishedAt: new Date(),
  snippet: "test",
  content: "le contenu",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Ma Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        ici le home
      </div>
    </>
  );
}
