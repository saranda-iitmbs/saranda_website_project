import { client } from "../../lib/sanity/client";
import { queries } from "../../lib/sanity/queries";

export const metadata = {
  title: "Newsletter | Saranda IITM BS",
};

export default async function NewsletterPage() {
  const newsletters = await client.fetch(queries.newsletters.query);

  const sortedNewsletters = [...newsletters].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const latest = sortedNewsletters[0];
  const previous = sortedNewsletters.slice(1);

  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/mist_forest1.png')",
      }}
    >
      <div className="absolute inset-0 bg-neutral-light/40 backdrop-blur-sm" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-redwood text-primary">
            Newsletter
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-primary/70 text-lg">
            Stay updated with the latest newsletters, announcements, and
            community updates.
          </p>
        </div>

        {/* Latest */}
        {latest && (
          <section className="mb-16">
            <p className="text-sm uppercase tracking-widest text-primary/60 mb-3">
              Latest Newsletter
            </p>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-redwood text-primary">
                {latest.title}
              </h2>

              <p className="mt-2 text-primary/60">
                {latest.date}
              </p>

              <p className="mt-5 max-w-2xl text-primary/80">
                {latest.description}
              </p>

              <a
                href={latest.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 rounded-xl bg-primary text-white hover:opacity-90 transition"
              >
                Read Newsletter →
              </a>
            </div>
          </section>
        )}

        {/* Previous */}
        {previous.length > 0 && (
          <section>
            <h2 className="text-3xl font-redwood text-primary mb-8">
              Previous Newsletters
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previous.map((newsletter) => (
                <article
                  key={newsletter._id}
                  className="bg-white/75 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-xl transition"
                >
                  <h3 className="text-2xl font-redwood text-primary">
                    {newsletter.title}
                  </h3>

                  <p className="mt-2 text-sm text-primary/60">
                    {newsletter.date}
                  </p>

                  <p className="mt-4 text-primary/70 line-clamp-3">
                    {newsletter.description}
                  </p>

                  <a
                    href={newsletter.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-primary font-semibold hover:underline"
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