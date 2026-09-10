import ArticleLayout, { H, P, Pull } from "@/components/ArticleLayout";

const Efilli = () => (
  <ArticleLayout
    kicker="work · cool digital"
    title={
      <>
        My first code that <span className="font-serif-italic font-light">strangers</span> had to
        use
      </>
    }
    meta="cool digital · efilli · software & product management intern · summer 2025 · izmir"
    tools={["javascript", "vue", "react", "figma", "git", "chrome devtools"]}
  >
    <P>
      Efilli is a cookie-consent platform — the banner that appears on a website asking what you'll
      allow it to track. It is not glamorous software. It is also software that has to work
      correctly on every browser, on someone else's site, under a legal regime that treats getting
      it wrong as a compliance failure, and it was the first thing i built that shipped to people
      who had no idea who i was.
    </P>

    <Pull>
      A bug in a class project costs you a grade. A bug in a consent banner sits on a client's
      homepage.
    </Pull>

    <H>the work</H>
    <P>
      I built consent-banner interfaces in JavaScript, Vue and React that went to production on
      live client sites. Most of my hours, though, went to the unglamorous half: tracing API
      requests, auth token handling, login state, and routing to find the failures before release.
      I got very familiar with the Chrome DevTools network tab and with the particular feeling of
      a bug that only reproduces on someone else's configuration.
    </P>
    <P>
      I also prototyped product concepts in Figma, which is where i learned something i'd only been
      told before: the design and the implementation argue with each other constantly, and the
      argument is productive. A layout that is trivial to draw can be miserable to build, and the
      person who has done both stops proposing the miserable one.
    </P>

    <H>what carried forward</H>
    <P>
      The habit of assuming my code will meet a configuration i didn't anticipate. Before this
      internship i wrote code that worked on my machine and considered that finished. Afterwards i
      didn't, and everything i've built since — Todi especially, where the users are children who
      won't file a bug report — has been better for it.
    </P>
  </ArticleLayout>
);

export default Efilli;
