import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client";

const CARDS_QUERY = `
  *[_type == "community_cards"] | order(_createdAt asc) {
    title,
    description,
    href,
    "img_src": image.asset->url,
  }
`

export default async function CommunitiesSection(
  className = ""
) {
  const communities_section_id = "communities_section_id"
  const cards_data = await client.fetch(CARDS_QUERY, {})

  return <>
    <div
      id={communities_section_id}
      className={className + " " +
        "flex justify-center items-center p-1"
      }>
      <div
        className="
          bg-neutral-dark-glass rounded-lg text-neutral-light lg:px-[5rem]
          lg:py-[4rem] md:px-[3rem] md:py-[2rem] px-[1rem] py-[2rem] grid
          grid-cols-1 grid-rows-[1fr_4fr] items-center gap-[1rem] lg:gap-[3rem]
           w-full md:w-8/10 backdrop-blur-sm max-md:h-full h-8/10
          overflow-clip max-md:items-start
        "
      >
        <h2 className="text-center self-center md:self-end">Our Communities</h2>
        <div className="
          grid grid-flow-row md:grid-flow-col gap-[2rem] h-full p-[2rem]
          md:max-h-[50dvh] md:justify-around
        ">
          {cards_data.map(card => <CommunityCard
            title={card["title"]}
            description={card["description"]}
            img_src={card["img_src"]}
            href={card["href"]}
            key={cards_data.indexOf(card)}
          />)}
        </div>
      </div>
    </div>
  </>
}

function CommunityCard({
  img_src = "https://placehold.co/400/111/222/png",
  title = "",
  description = "",
  className = "",
  ...props
}) {
  return <Link {...props} className={className + " " +
    "relative rounded-xl overflow-hidden flex flex-col justify-end \
    items-center p-[1rem] md:px-[2rem] max-h-full hover:[&_p]:h-full \
    text-neutral-light hover:[&_div.blackdiv]:bg-black/50 md:aspect-square"
  }>
    <Image
      src={img_src}
      alt="Community Poster"
      fill
      className="object-cover -z-1"
    />
    <div className="
      bg-black/25 absolute top-0 left-0 right-0 bottom-0 blackdiv
      duration-200 -z-1
    "></div>
    <h3>{title}</h3>
    <p className="
      max-md:hidden h-0 translate-y-[1rem] duration-500 ease-out
    ">
      {description}
    </p>
  </Link>
}