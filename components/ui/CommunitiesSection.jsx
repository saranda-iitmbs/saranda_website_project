import Image from "next/image"
import Link from "next/link"
import { twJoin } from "tailwind-merge";
import { getCommunityCards } from "@/lib/cmsdata";

const CARDS_QUERY = `
  *[_type == "community_card"] | order(_createdAt asc) {
    title,
    description,
    href,
    "img_src": image.asset->url,
  }
`


export default async function CommunitiesSection({
  className = "",
  innerClassName = "",
  innerProps = {},
  ...props
}) {
  const communities_section_id = "communities_section_id"
  const cards_data = await getCommunityCards({imgDimensions: false});

  return <>
    <div
      id={communities_section_id}
      className={twJoin(
        "flex justify-center items-center p-1",
        className
      )}
      {...props}
    >
      <div
        className={twJoin(
          `green-glass-container w-full md:w-8/10 max-md:h-full h-8/10 grid
          grid-rows-[1fr_4fr]`,
          innerClassName
        )}
        {...innerProps}
      >
        <h2 className="text-center self-center">
          Our Communities
        </h2>
        <div className="
          md:flex md:flex-row w-full justify-center items-center md:gap-[5rem]
          flex-wrap max-md:grid max-md:grid-flow-row gap-[2rem]
        ">
          {cards_data.map(card => <CommunityCard
            title={card["title"]}
            description={card["description"]}
            img_src={card["img_src"]}
            href={card["href"]}
            card={card}
            key={cards_data.indexOf(card)}
          />)}
        </div>
      </div>
    </div>
  </>
}


function CommunityCard({
  img_src = "https://placehold.co/10/gray/gray/png",
  card,
  className = "",
  ...props
}) {
  return <Link
    className={twJoin(
      `relative flex aspect-square w-[calc(10rem+6dvw)] p-[1rem] box-content
      rounded-xl overflow-clip items-center flex-col justify-end
      hover:[&_p]:h-full hover:[&_div.blackdiv]:bg-black/50`,
      className
    )}
    {...props}
  >
    <Image
      // src={img_src}
      {...card.img}
      alt="Community Poster"
      fill
      sizes="(max-width: 768px) 100vw, 40vw"
      className="object-cover -z-1"
    />
    <div className="
      bg-black/25 absolute top-0 left-0 right-0 bottom-0 blackdiv
      duration-200
    "></div>
    <h3 className="text-center z-1">{card.title}</h3>
    <p className="h-0 overflow-clip z-1 duration-500 ease-out">
      {card.description}
    </p>
  </Link>
}