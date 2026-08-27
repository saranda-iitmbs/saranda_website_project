import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { getCommunityCards } from "@/lib/cmsdata";
import Button from "../Button";
import wooden_plank_img from "@/public/images/wooden_plank2.png";

export default async function CommunitiesSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const communities_section_id = "communities_section_id";
  const cards = await getCommunityCards();

  return (
    <section
      id={communities_section_id}
      className={twJoin(
        "flex justify-center items-center px-2 py-4 sm:py-6 min-h-screen",
        className
      )}
      {...props}
    >
      <div
        className={twJoin(
          `
          green-glass-container
          relative
          w-full
          lg:w-8/10
          min-h-[75vh]
          px-4 py-10
          sm:px-5 sm:py-12
          md:px-8 md:py-14
          rounded-2xl
          overflow-hidden
          `,
          innerClassName
        )}
        {...innerProps}
      >
        {/* Background */}
        <Image
          src={wooden_plank_img}
          alt=""
          placeholder="blur"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-redwood text-white">
            Our Communities
          </h2>
        </div>

        {/* Community Cards */}
        <div className="mx-auto w-full max-w-[110ch] space-y-4 sm:space-y-6">
          {cards.map((card, index) => (
            <CommunityCard
              card={card}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCard({
  card,
  className = "",
  ...props
}) {
  return (
    <article
      className={twJoin(
        `
        group
        grid
        grid-cols-1
        sm:grid-cols-[14rem_auto]
        md:grid-cols-[16rem_auto]

        gap-4
        sm:gap-5
        md:gap-7

        p-3
        sm:p-4
        md:p-5

        rounded-xl
        sm:rounded-2xl

        border
        border-white/20

        bg-white/10
        backdrop-blur-sm

        transition-all
        duration-300

        hover:bg-white/20
        hover:border-secondary
        hover:-translate-y-0.5
        hover:shadow-lg
        `,
        className
      )}
      {...props}
    >
      {/* Poster */}
      <div
        className="
          relative
          w-full
          aspect-[4/3]
          sm:aspect-square
          rounded-lg
          sm:rounded-xl
          overflow-hidden
          bg-black/10
        "
      >
        <Image
          {...card.img.cropped}
          alt={`${card.title} poster`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 224px, 256px"
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.03]
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center py-1 sm:py-2">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-redwood text-white">
            {card.title}
          </h3>

          {/* Divider */}
          <div className="w-8 sm:w-10 h-px bg-white/60 mt-2 mb-3" />

          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-white/80 max-w-2xl">
            {card.description}
          </p>
        </div>

        {/* Button */}
        <div className="mt-4 sm:mt-5">
          <Button href={`/community/${card.slug}`}>
            Explore Community →
          </Button>
        </div>
      </div>
    </article>
  );
}