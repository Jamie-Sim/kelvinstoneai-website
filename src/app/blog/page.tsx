import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RevealObserver from "@/components/RevealObserver";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Blog — Kelvinstone AI",
  description:
    "Notes on AI, automation and the future of work for UK property maintenance, renovation and improvement firms — written by Jamie Sim.",
};

export const revalidate = 60;

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  hero_image_url: string | null;
  published_at: string;
};

export default async function BlogIndex() {
  const { data: posts } = await supabaseAdmin()
    .from("blog_posts")
    .select("id, slug, title, excerpt, hero_image_url, published_at")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  const published = (posts ?? []) as PostRow[];

  return (
    <>
      <RevealObserver />
      <Navbar />
      <main>
        <section id="resources-intro">
          <div className="wrap-narrow intro-content">
            <div className="section-label reveal">Blog</div>
            <h1 className="intro-h1 reveal rd1">
              Plain-English thinking on
              <br />
              <em>AI for the trades.</em>
            </h1>
            <div className="intro-accent-rule reveal rd2"></div>
            <p className="intro-sub reveal rd2">
              Short, practical pieces on what AI is doing to small businesses
              right now — what&rsquo;s worth your time, what isn&rsquo;t, and how
              property maintenance and improvement firms are putting it to use.
              No hype.
            </p>
          </div>
        </section>

        <div className="section-rule"></div>

        <section id="blog-list">
          <div className="wrap-narrow">
            {published.length === 0 && (
              <p className="blog-empty">
                No posts yet — first piece is on the way.
              </p>
            )}

            <div className="blog-grid">
              {published.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`blog-card${
                    post.hero_image_url ? "" : " blog-card--text"
                  } reveal rd${(i % 4) + 1}`}
                >
                  {post.hero_image_url && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.hero_image_url}
                      alt=""
                      className="blog-card-image"
                      loading="lazy"
                    />
                  )}
                  <div className="blog-card-body">
                    {!post.hero_image_url && (
                      <span className="blog-card-eyebrow">Essay</span>
                    )}
                    <p className="blog-card-meta">
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-link">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
