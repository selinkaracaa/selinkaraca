import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="link-underline inline-flex items-baseline gap-0.5"
  >
    {children}
    <ArrowUpRight className="h-3 w-3 translate-y-[1px] opacity-60" aria-hidden />
  </a>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-6 text-[17px] leading-[1.7] text-foreground/85">{children}</p>
);

export const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-16 font-serif-italic text-[1.55rem] leading-tight text-foreground">
    {children}
  </h2>
);

export const Pull = ({ children }: { children: React.ReactNode }) => (
  <p className="my-12 border-l-2 pl-6 font-serif-display text-[clamp(1.3rem,2.4vw,1.75rem)] leading-[1.16] text-foreground/90"
     style={{ borderColor: "hsl(var(--ink))" }}>
    {children}
  </p>
);

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="tag">{children}</span>
);

const ArticleLayout = ({
  kicker,
  title,
  meta,
  tools,
  links,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  meta: string;
  tools?: string[];
  links?: React.ReactNode;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="link-underline inline-flex items-center gap-2 font-serif-italic text-[15px]"
          >
            <ArrowLeft className="h-3.5 w-3.5 opacity-60" aria-hidden />
            Selin Karaca
          </Link>
          <span className="marker">{kicker}</span>
        </div>
      </header>

      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[900px] px-6 pb-24 pt-14 md:pt-20"
      >
        <h1 className="max-w-[22ch] font-serif-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.04]">
          {title}
        </h1>
        <p className="mt-5 font-mono-label">{meta}</p>

        {(tools || links) && (
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-border py-5">
            {tools && (
              <div className="flex flex-wrap gap-[5px]">
                {tools.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}
            {links && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-foreground/85">
                {links}
              </div>
            )}
          </div>
        )}

        <div className="max-w-[68ch]">{children}</div>

        <div className="mt-20 border-t border-border pt-8">
          <Link to="/" className="link-underline font-serif-italic text-[17px]">
            ← back to everything else
          </Link>
        </div>
      </motion.article>
    </main>
  );
};

export default ArticleLayout;
