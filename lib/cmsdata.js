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
      "image_urls": images[].asset->url
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

  extra_footer_links: `
  *[_type == "extra_footer_links" && link_group_name == $groupname]{
    "links": links[]{text,url}
  }.links[]`
}

async function fetchQuery(query, params={}) {
  try {
    const data = await client.fetch(
      query,
      params,
      {next: {
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
  const pictures = await fetchQuery(queries.gallery_photos);
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
  const meetups = await fetchQuery(queries.meetup_posts);

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
  const team = await fetchQuery(queries.uhc_members);
  await parseTeamImg(team, 800);

  return team;
}


export async function getNonUHCTeams() {
  const teams = await fetchQuery(queries.non_uhc_teams);
  for (const team of teams) {
    await parseTeamImg(team, 400);
  }

  return teams;
}


export async function getFeaturedPhotos() {
  const photos = await fetchQuery(queries.featured_photos);

  return photos.image_urls;
}


export async function getCommunityCards({imgDimensions=false}) {
  const cards = await fetchQuery(queries.community_cards);
  
  for (const card of cards) {
    const img = {};

    if (card.image) {
      img.src = urlFor(card.image).width(600).height(600).fit("max").url();
      img.overlay_src = urlFor(card.image).fit("max").url();
    } else {
      img.src = PLACEHOLDER_IMAGE_URL;
      img.overlay_src= PLACEHOLDER_IMAGE_URL;
    }

    card.img = {
      ...img,
      ...await imgPlaceholderAttr(
        urlFor(card.image).width(10).height(10).fit("max").url()
        || PLACEHOLDER_IMAGE_URL,
        { dimensions: imgDimensions })
    };
  }

  return cards;
}


export async function getExtraFooterLinks() {
  const extra_footer_links = {
    extra_contact_links: await fetchQuery(queries.extra_footer_links, {
      "groupname": "contacts",
    }),
    extra_quick_links: await fetchQuery(queries.extra_footer_links, {
      "groupname": "quick_links",
    }),
    extra_useful_links: await fetchQuery(queries.extra_footer_links, {
      "groupname": "other_useful_links",
    }),
  }

  return extra_footer_links;
}