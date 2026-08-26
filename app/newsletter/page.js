import { getNewsletters } from "../../lib/cmsdata";

export const metadata = {
  title: "Newsletter | Saranda IITM BS",
};

export default async function NewsletterPage() {
  const newsletters = await getNewsletters();

  const latest = newsletters[0];
  const previous = newsletters.slice(1);

  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/mist_forest1.png')",
      }}
    >
      <div className="absolute inset-0 bg-neutral-light/40 backdrop-blur-sm" />

      <section className="relative z-10 max-w-6xl mx-auto px-5 py-20">

        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-4xl md:text-5xl font-redwood text-primary">
            Newsletter
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-primary/80 text-sm md:text-base font-semibold uppercase">
            Stay updated with the latest newsletters, announcements, and
            community updates.
          </p>
        </div>

        {/* Latest */}
        {latest && (
          <section className="mb-4">
            <p className="text-sm font-semibold fonr- uppercase tracking-widest text-primary/60 mb-2">
              Latest Newsletter
            </p>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-redwood text-primary">
                {latest.title}
              </h2>

              <p className="mt-1 text-sm">
                {new Date(latest.date).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p className="mt-3 text-sm md:text-base">
                {latest.description}
              </p>

              <a
                href={latest.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-primary text-sm text-white hover:opacity-90 transition"
              >
                Read Newsletter →
              </a>
            </div>
          </section>
        )}

        {/* Previous */}
        {previous.length > 0 && (
          <section>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/60 mb-2">
              Previous Newsletters
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {previous.map((newsletter) => (
                <article
                  key={newsletter._id}
                  className="bg-white/75 backdrop-blur-md rounded-2xl p-5 shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-xl md:text-2xl font-redwood text-primary">
                    {newsletter.title}
                  </h3>

                  <p className="mt-1 text-xs">
                    {new Date(newsletter.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mt-3 text-sm">
                    {newsletter.description}
                  </p>

                  <a
                    href={newsletter.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-5 py-2.5 rounded-lg bg-primary text-sm text-white hover:opacity-90 transition"
                  >
                    Read Newsletter →
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

      </section>
    </main>
  );
}