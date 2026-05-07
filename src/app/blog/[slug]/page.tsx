import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RevealObserver from "@/components/RevealObserver";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  meta_description: string | null;
  hero_image_url: string | null;
  published_at: string;
  updated_at: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kelvinstone.ai";

async function fetchPost(slug: string): Promise<PostRow | null> {
  const { data } = await supabaseAdmin()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .maybeSingle();
  return (data as PostRow | null) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Post not found — Kelvinstone AI" };
  const description = post.meta_description ?? post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — Kelvinstone AI`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      siteName: "Kelvinstone AI",
      images: post.hero_image_url ? [{ url: post.hero_image_url }] : undefined,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: post.hero_image_url ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: post.hero_image_url ? [post.hero_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  return (
    <>
      <RevealObserver />
      <Navbar />
      <main>
        <article className="blog-article">
          <div className="wrap-narrow">
            <Link href="/blog" className="nav-back">
              ← Back to all posts
            </Link>
            <header className="blog-article-header reveal">
              <p className="blog-card-meta">
                {new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1 className="blog-article-title">{post.title}</h1>
              <p className="blog-article-lede">{post.excerpt}</p>
              <div className="intro-accent-rule"></div>
            </header>

            {post.hero_image_url && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.hero_image_url}
                alt=""
                className="blog-article-hero reveal rd1"
              />
            )}

            <div className="blog-article-body reveal rd2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body_md}
              </ReactMarkdown>
            </div>

            <footer className="blog-article-footer">
              <p className="blog-article-foot-text">
                If any of this is useful and you want to talk through how AI
                might fit your business —{" "}
                <Link href="/#cta">get a free audit</Link>. No pitch, just a
                conversation.
              </p>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
