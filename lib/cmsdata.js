import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/sanityImageURL";
import imgPlaceholderAttr from "@/lib/imgPlaceholderAttr";

const DEFAULT_REVALIDATION_PERIOD = 60*60*24;
const PLACEHOLDER_IMAGE_URL = "https://placehold.co/10/gray/gray/png";

const queries = {
  gallery_photos: `
  *[_type == "photoset" && setname == "art_gallery"][0]{
    images,
  }`,

  current_events: `
  *[_type == "event" && enddate > now()] | order(enddate desc) {
    _id,
    eventname,
    description,
    "links": links[]{text,url,_key},
    poster,
  }`,

  past_events: `
  *[_type == "event" && enddate <= now()] | order(enddate desc){
    _id,
    eventname,
    description,
    "links": links[]{text,url,_key},
    poster,
  }`,

  meetup_posts: `
  *[_type == "meetup"] | order(date desc){
    _id,
    meetupname,
    description,
    date,
    photos,
  }`,

  uhc_members: `
  *[_type == "team" && teamname == "uhc"][0]{
    "name": longname,
    "members": members[]{
      _key,
      fullname,
      email,
      position,
      image,
    }
  }`,

  non_uhc_teams: `
  *[_type == "team" && teamname != "uhc"] | order(index asc) {
    _id,
    "name": longname,
    "members": members[]{
      _key,
      fullname,
      email,
      position,
      image,
    }
  }`,

  featured_photos: `
    *[_type == "photoset" && setname == "featured_photos"][0]{
      images,
    }
  `,

  community_cards: `
    *[_type == "community_card"] | order(_createdAt asc) {
      title,
      description,
      href,
      image,
      "img_src": image.asset->url,
    }
  `,

  allcommunities: `
    *[_type == "community"]{
      _id,
      title,
      description,
      "slug": slug.current,
      banner,
    }`,

  community: `
    *[_type == "community" && slug.current == $slug][0]{
      _id,
      title,
      description,
      "slug": slug.current,
      joining_form,
      banner,
      events[]{
        _key,
        title,
        description,
        poster
      }
    }`,

  extra_footer_links: `
  *[_type == "extra_footer_links" && link_group_name == $groupname]{
    "links": links[]{text,url}
  }.links[]`
}


export const tags = {
  gallery_photos: ["/art_gallery", "photoset", "photos_arts"],
  current_events: ["/events", "event", "current_events"],
  past_events: ["events/past", "event", "past_events"],
  meetup_posts: ["/meetups", "meetup"],
  uhc_members: ["/know_us", "team", "uhc_team"],
  non_uhc_teams: ["/know_us", "team", "nonuhc_teams"],
  featured_photos: ["/", "photoset", "featured_photos"],
  community_cards: ["/", "community", "community_cards"],
  community: ["/community/[slug]", "community"],
  extra_footer_links: ["/", "extra_footer_links"],
};

async function fetchQuery(query, params={}, tags) {
  try {
    const data = await client.fetch(
      query,
      params,
      {next: {
        tags: tags || [],
        revalidate:
          parseInt(process.env.REVALIDATION_PERIOD)
          || DEFAULT_REVALIDATION_PERIOD,
      }}
    ) || [];

    return data;
  }
  catch(e) {
    return [];
  }
}


export async function getGalleryPictures() {
  const pictures = await fetchQuery(
    queries.gallery_photos, {}, tags.gallery_photos
  );
  pictures.images = pictures.images || [];

  pictures.img = [];
  for (const image of pictures.images) {
    pictures.img.push({
      src: urlFor(image).url(),
      ...(await imgPlaceholderAttr(urlFor(image).width(10).url(), {w:400})),
    });
  }

  return pictures;
}


export async function getEventPosts(isPast = false) {
  const events = await fetchQuery(
    isPast ? queries.past_events : queries.current_events,
    {},
    isPast ? tags.past_events : tags.current_events,
  );

  for (const event of events) {
    if (event.poster) {
      event.img = {
        src: urlFor(event.poster).url(),
        ...(await imgPlaceholderAttr(
          urlFor(event.poster).width(10).url(),
          {w:400}
        )),
      };
    }
    else {
      event.img = {
        src: PLACEHOLDER_IMAGE_URL,
        ...(await imgPlaceholderAttr( PLACEHOLDER_IMAGE_URL, {w:400} )),
      };
    }
  }

  return events;
}


export async function getMeetupPosts() {
  const meetups = await fetchQuery(
    queries.meetup_posts, {}, tags.meetup_posts
  );

  for (const meetup of meetups) {
    meetup.img = []
    for (const photo of meetup.photos) {
      meetup.img.push({
        src: urlFor(photo).url(),
        ...(await imgPlaceholderAttr(urlFor(photo).width(10).url(), {w:400})),
      });
    }
  }

  return meetups;
}


const parseTeamImg = async (team, length=400) => {
  if (!team.members) return

  for (const member of team.members) {
    const img = {};
    let plaiceholder = {};
    
    if (member.image) {
      img.src = urlFor(member.image).width(length).height(length).fit("max")
                .url();
      img.overlay_src = urlFor(member.image).fit("max").url();
      plaiceholder = await imgPlaceholderAttr(
        urlFor(member.image).width(10).height(10).fit("max").url(),
        { dimensions: false }
      );
    } else {
      img.src = PLACEHOLDER_IMAGE_URL;
      img.overlay_src= PLACEHOLDER_IMAGE_URL;
      plaiceholder = await imgPlaceholderAttr(img.src, { dimensions: false });
    }

    member.img = { ...img, ...plaiceholder };
  }
}


export async function getUHCTeam() {
  const team = await fetchQuery(queries.uhc_members, {}, tags.uhc_members);
  await parseTeamImg(team, 800);

  return team;
}


export async function getNonUHCTeams() {
  const teams = await fetchQuery(
    queries.non_uhc_teams, {}, tags.non_uhc_teams
  );

  for (const team of teams) {
    await parseTeamImg(team, 400);
  }

  return teams;
}


export async function getFeaturedPhotos() {
  const photos = await fetchQuery(
    queries.featured_photos, {}, tags.featured_photos
  );
  photos.images = photos.images || [];

  photos.img = [];
  for (const image of photos.images) {
    photos.img.push({
      src: urlFor(image).url(),
      ...(await imgPlaceholderAttr(urlFor(image).width(10).url(), {w:400})),
    });
  }


  return photos;
}


export async function getAllCommunities({imgDimensions=false}) {
  const communities = await fetchQuery(
    queries.allcommunities, {}, tags.allcommunities
  );
  
  for (const community of communities) {
    const img = {};

    if (community.banner) {
      img.src = urlFor(community.banner).width(600).height(600).fit("max").url();
      img.overlay_src = urlFor(community.banner).fit("max").url();
    } else {
      img.src = PLACEHOLDER_IMAGE_URL;
      img.overlay_src= PLACEHOLDER_IMAGE_URL;
    }

    community.img = {
      ...img,
      ...await imgPlaceholderAttr(
        urlFor(community.banner).width(10).height(10).fit("max").url()
        || PLACEHOLDER_IMAGE_URL,
        { dimensions: imgDimensions })
    };
  }

  return communities;
}


export async function getCommunity(slug="") {
  const community = await fetchQuery(
    queries.community, {slug: slug}, tags.community
  );
  
  if (Array.isArray(community) && community.length === 0)
    return null;
  
  const img = {};

  if (community.banner) {
    img.src = urlFor(community.banner).width(1440).height(800).fit("max").url();
    img.overlay_src = urlFor(community.banner).fit("max").url();
  } else {
    img.src = PLACEHOLDER_IMAGE_URL;
    img.overlay_src= PLACEHOLDER_IMAGE_URL;
  }

  community.img = {
    ...img,
    ...await imgPlaceholderAttr(
      urlFor(community.banner).width(10).height(5).fit("max").url()
      || PLACEHOLDER_IMAGE_URL,
      { w: 1200 }
    )
  };

  for (const event of community.events) {
    const img2 = {};

    if (event.poster) {
      img2.src = urlFor(event.poster).width(400).height(400).fit("max").url();
      img2.overlay_src = urlFor(event.poster).fit("max").url();
    } else {
      img2.src = PLACEHOLDER_IMAGE_URL;
      img2.overlay_src= PLACEHOLDER_IMAGE_URL;
    }

    event.img = {
      ...img2,
      ...await imgPlaceholderAttr(
        urlFor(event.poster).width(10).height(5).fit("max").url()
        || PLACEHOLDER_IMAGE_URL,
        { w: 400 })
    };
  }

  return community;
}


export async function getExtraFooterLinks() {
  const extra_footer_links = {
    extra_contact_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "contacts", },
      tags.extra_footer_links
    ),

    extra_quick_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "quick_links", },
      tags.extra_footer_links
    ),

    extra_useful_links: await fetchQuery(
      queries.extra_footer_links,
      { "groupname": "other_useful_links", },
      tags.extra_footer_links
    ),
  }

  return extra_footer_links;
}