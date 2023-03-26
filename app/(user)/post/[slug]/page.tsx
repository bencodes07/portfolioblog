import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Post({ params: { slug } }: Props) {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
      ...,
      author->,
      categories[]->
    }
  `;

  let post: any = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border-[#6295ca] text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className="p-5 bg-[#6295ca] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div></div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText
        value={post.body}
        components={{
          types: {
            image: ({ value }: any) => {
              return (
                <div className="relative w-full h-96 m-10 mx-auto">
                  <Image
                    className="object-contain"
                    src={urlFor(value).url()}
                    alt="Blog Post Image"
                    fill
                  />
                </div>
              );
            },
          },
          list: {
            bullet: ({ children }: any) => (
              <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
            ),
            number: ({ children }: any) => (
              <ol className="mt-lg list-decimal">{children}</ol>
            ),
          },
          block: {
            h1: ({ children }: any) => (
              <h1 className="text-5xl py-10 font-bold">{children}</h1>
            ),
            h2: ({ children }: any) => (
              <h2 className="text-4xl py-10 font-bold">{children}</h2>
            ),
            h3: ({ children }: any) => (
              <h3 className="text-3xl py-10 font-bold">{children}</h3>
            ),
            h4: ({ children }: any) => (
              <h4 className="text-2xl py-10 font-bold">{children}</h4>
            ),
            blockquote: ({ children }: any) => (
              <blockquote className="border-l-[#6295ca] border-l-4 pl-5 py-5 my-5">
                {children}
              </blockquote>
            ),
          },
          marks: {
            link: ({ children, value }: any) => {
              const rel = !value.href.startsWith("/")
                ? "noreferrer noopener"
                : undefined;

              return (
                <Link
                  href={value.href}
                  rel={rel}
                  className="underline decoration-[#6295ca] hover:decoration-black"
                >
                  {children}
                </Link>
              );
            },
          },
        }}
      />
    </article>
  );
}
