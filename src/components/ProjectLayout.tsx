import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { neighbours, type Project } from "@/data/projects";

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
  <p className="mt-5 text-[16.5px] leading-[1.65] text-foreground/85">{children}</p>
);

export const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-14 font-serif-display text-[1.5rem] leading-tight tracking-[-0.01em]">
    {children}
  </h2>
);

/** one row of the fact block */
const Fact = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 border-t border-border py-3 first:border-t-0 sm:flex-row sm:gap-6 sm:py-2.5">
    <dt className="font-mono-label shrink-0 sm:w-[104px] sm:pt-[3px]">{label}</dt>
    <dd className="text-[15px] leading-snug text-foreground/85">{children}</dd>
  </div>
);

const ProjectLayout = ({
  project,
  links,
  lead,
  highlights,
  children,
}: {
  project: Project;
  links?: React.ReactNode;
  /** the opening paragraph, set larger than body copy */
  lead: React.ReactNode;
  /** three numbers worth seeing before reading anything */
  highlights?: { value: string; label: string }[];
  children: React.ReactNode;
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { prev, next } = neighbours(project.slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="link-underline inline-flex items-center gap-2 font-serif-italic text-[15px]"
          >
            <ArrowLeft className="h-3.5 w-3.5 opacity-60" aria-hidden />
            Selin Karaca
          </Link>
          <span className="font-mono-label">
            {project.group} · {project.name.toLowerCase()}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-6">
        {/* ---------------------------------------------------------- title */}
        <div className="pb-10 pt-14 md:pt-20">
          <h1 className="font-serif-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.98] tracking-[-0.025em]">
            {project.name}
          </h1>
          <p className="mt-5 max-w-[46ch] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.35] text-foreground/70">
            {project.descriptor}
          </p>
        </div>

        {/* ----------------------------------------------------- fact block */}
        <dl className="surface grid gap-x-12 rounded-[3px] px-6 py-5 sm:px-8 sm:py-6 md:grid-cols-2">
          <Fact label="role">{project.role}</Fact>
          <Fact label="where">{project.org}</Fact>
          <Fact label="when">{project.period}</Fact>
          {project.headline && <Fact label="scale">{project.headline}</Fact>}
          {project.status && <Fact label="status">{project.status}</Fact>}
          <Fact label="stack">{project.stack.join(" · ")}</Fact>
          {(links || project.artifact) && (
            <div className="border-t border-border pt-3 md:col-span-2">
              <div className="flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
                {project.artifact && (
                  <ExtLink href={project.artifact.href}>{project.artifact.label}</ExtLink>
                )}
                {links}
              </div>
            </div>
          )}
        </dl>

        {/* -------------------------------------------------- highlights */}
        {highlights && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.label} className="surface rounded-[3px] px-6 py-5">
                <p className="stat-num text-[1.9rem]">{h.value}</p>
                <p className="font-mono-label mt-2">{h.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ---------------------------------------------------------- body */}
        <div className="max-w-[68ch] pb-6 pt-14">
          <p className="font-serif-display text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.3] tracking-[-0.01em]">
            {lead}
          </p>
          {children}
        </div>

        {/* ----------------------------------------------------------- nav */}
        <nav className="grid gap-3 border-t border-border py-10 sm:grid-cols-2">
          {prev && (
            <Link to={prev.slug} className="surface surface-link rounded-[3px] px-5 py-4">
              <span className="font-mono-label flex items-center gap-1.5">
                <ArrowLeft className="h-3 w-3" aria-hidden /> previous
              </span>
              <span className="mt-1.5 block font-serif-display text-[1.15rem]">{prev.name}</span>
            </Link>
          )}
          {next && (
            <Link
              to={next.slug}
              className="surface surface-link rounded-[3px] px-5 py-4 sm:text-right"
            >
              <span className="font-mono-label flex items-center gap-1.5 sm:justify-end">
                next <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
              <span className="mt-1.5 block font-serif-display text-[1.15rem]">{next.name}</span>
            </Link>
          )}
        </nav>
      </div>

      <footer className="mx-auto flex max-w-[1080px] items-center justify-between border-t border-border px-6 py-6 text-xs lowercase tracking-wider text-muted-foreground">
        <span>© {new Date().getFullYear()} Selin Karaca</span>
        <Link to="/" className="link-underline font-serif-italic">
          back to everything
        </Link>
      </footer>
    </main>
  );
};

export default ProjectLayout;
