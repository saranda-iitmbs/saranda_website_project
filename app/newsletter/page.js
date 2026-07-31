export const metadata = {
  title: "Newsletter | Saranda IITM BS",
};

export default function NewsletterPage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/mist_forest1.png')" }}
    >
      {/* soft overlay for readability */}
      <div className="absolute inset-0 bg-neutral-light/40 backdrop-blur-sm"></div>

      {/* CENTERED HEADING */}
      <section className="relative z-10 min-h-screen flex flex-col items-center pt-24">
  <h1 className="text-5xl font-redwood text-primary text-center">
    Newsletter
  </h1>

  <p className="mt-6 text-center font-redwood text-primary/60 text-lg">
    Newsletter will appear here! <br />
    Stay tuned!!
  </p>
</section>
    </main>
  );
}
