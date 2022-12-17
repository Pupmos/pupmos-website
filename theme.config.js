import { useTheme } from "next-themes";

const github = "https://github.com/Pupmos/pupmos-website";

export default {
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  feedbackLabels: "feedback",
  feedbackLink: () => {
    return "Question? Give us feedback →";
  },
  floatTOC: true,
  footerEditLink: `Edit this page on GitHub`,
  footerText: () => (
    <div className="text-current text-sm">
      Pupmos {new Date().getFullYear()} © pupmos.zone
    </div>
  ),
  github,
  head: ({ title, meta }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { systemTheme } = useTheme();
    const description_ =
      meta.description_ ||
      'Pupmos is a four-legged validator who aims to bring lovb and frenzhip to the Cosmos ecosystem. When not rolling in the grass or chasing his tail, he is guarding your values and building the future of Cosmos.';
    const title_ =
      title && !title.startsWith("Pupmøs")
        ? title + " – Pupmos"
        : "Pupmøs: The Goodest Boy in Cosmos";
    return (
      <>
        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <title>{title_}</title>

        {/* SEO */}
        <meta name="description" content={description_} />
        <meta name="og:description" content={description_} />
        <meta name="og:title" content={title_} />
        // TODO: UPDATE THIS WITH ACTUAL WEBSITE URL
        <meta name="og:image" content="https://pupmos.zone/og.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Misc */}
        <meta name="apple-mobile-web-app-title" content="lfg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Dynamic favicon */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicons/favicon.svg"
          key="dynamic-favicon"
        />
      </>
    );
  },
  logo: () => {
    return (
      <>
        <span className="mr-2 font-extrabold">PUPMØS</span>
        <span className="text-gray-600 font-normal hidden md:inline">
          The Goodest Boy in Cosmos
        </span>
      </>
    );
  },
  nextLinks: true,
  nextThemes: {
    defaultTheme: "dark",
  },
  prevLinks: true,
  projectLink: github,
  search: true,
  titleSuffix: " – Pupmos",
  unstable_flexsearch: true,
};
