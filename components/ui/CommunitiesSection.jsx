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
          bg-neutral-dark-glass rounded-lg text-neutral-light w-full
          md:w-8/10 backdrop-blur-sm max-md:h-full h-8/10 grid
          grid-rows-[1fr_4fr]
        "
      >
        <h2 className="text-center self-center">
          Our Communities
        </h2>
        <div className="
          flex flex-col md:flex-row w-full justify-center items-center
          gap-[5rem]
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
  return <Link {...props} className={className + " " + `
    relative flex aspect-square w-[calc(10rem+6dvw)] p-[1rem]
    box-content rounded-xl overflow-clip items-center flex-col justify-end
    hover:[&_p]:h-full hover:[&_div.blackdiv]:bg-black/50
  `}>
    <Image
      src={img_src}
      alt="Community Poster"
      fill
      className="object-cover -z-1"
    />
    <div className="
      bg-black/25 absolute top-0 left-0 right-0 bottom-0 blackdiv
      duration-200
    "></div>
    <h3 className="text-center z-1">{title}</h3>
    <p className="h-0 overflow-clip z-1 duration-500 ease-out">
      {description}
    </p>
  </Link>
}