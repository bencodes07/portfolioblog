import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import { PreviewSuspense } from "next-sanity/preview";
import PreviewBlogList from "../../components/PreviewBlogList";
import BlogList from "../../components/BlogList";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export default async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="tex-center text-large animate-pulse text-[#6295ca]">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        {/* Preview-Bloglist */}
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);
  return <BlogList posts={posts} />;
}
