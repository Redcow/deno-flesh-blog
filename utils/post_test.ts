import { listPosts, load } from "./Post.ts";

import { assert, assertEquals } from "$std/testing/asserts.ts";

Deno.test("load post", async () => {
  const post = await load("hello");
  assert(post);
  assertEquals(post.id, "hello");
});

Deno.test("load post non existant", async () => {
  const post = await load("hello I don't exist");
  assertEquals(post, null);
});

Deno.test("list posts", async () => {
  const posts = await listPosts();
  assert(posts.length >= 1);
  const last = posts.at(-1);
  assert(last);
  assertEquals(last.id, "hello");
});
