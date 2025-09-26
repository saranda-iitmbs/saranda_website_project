import Image from "next/image"

export default function Team({team}) {
  return <div className="
    w-9/10 max-w-[120ch] mx-auto bg-neutral-dark-glass rounded-xl 
    p-[1rem] *:px-[1rem] text-neutral-light mb-[2rem] overflow-clip
    grid lg:grid-cols-[40ch_1fr] max-lg:grid-flow-row
  ">
    <h3 className="
      sticky h-fit lg:top-[1rem] top-0 max-lg:m-[-1rem] max-lg:mb-0
      max-lg:pt-[1rem] max-lg:bg-neutral-dark/60 z-2
    ">{team.name}</h3>
    <div className="
      max-lg:border-t-2 lg:border-l-1 border-neutral-light grid gap-[1rem]
      max-lg:py-[1rem] grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]
    ">
      {team.members?.map(mem => <Member member={mem} key={mem._key}/>)}
    </div>
  </div>
}

function Member({member}) {
  return <div className="
    grid grid-rows-[10rem_1fr] rounded-lg overflow-clip text-center
    text-primary bg-[#FCFAED] p-[0.5rem]
  ">
    
    <div className="relative">
      <Image
        src={member.image_url || "https://placehold.co/400/gray/gray/png"}
        alt=""
        fill
        className="object-cover rounded-lg"
      />
    </div>
    <div>
      <p className="font-bold mb-[-0.5ch]">{member.fullname}</p>
      <p>[{member.position || ""}]</p>
    </div>
  </div>
}