import Form from 'next/form';
import "./style.css";
import revalidate from '@/lib/revalidate';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function Refresh({ searchParams }) {
  const cookieStore = await cookies();
  const KEY_COOKIE_NAME = "REVALIDATION_KEY";
  const revalidation_key = cookieStore.get(KEY_COOKIE_NAME);
  const { status, message, onlyaskpassword, next } = await searchParams;

  const handleSumbit = async (formdata) => {
    "use server"

    const _cookies = await cookies();
    const _revalidation_key_f = formdata.get("revalidation_key");
    const _revalidation_key = _cookies.get(KEY_COOKIE_NAME)?.value;

    if (_revalidation_key_f === process.env.REVALIDATION_KEY) {
      _cookies.set(KEY_COOKIE_NAME, _revalidation_key_f);
    }
    else if (_revalidation_key !== process.env.REVALIDATION_KEY) {
      _cookies.delete(KEY_COOKIE_NAME);
      return redirect("/refresh/dashboard?" + new URLSearchParams({
        status: "failed",
        message: "Verification failed. Please enter the correct password."
      }));
    }

    const tags = [];
    for (const [tag, value] of formdata.entries()) {
      if (value === "on")
        tags.push(tag);
    }

    revalidate(tags, "tag");

    return redirect("/refresh/dashboard?" + new URLSearchParams({
      status: "success",
      message: "Refresh Done"
    }));
  }

  const handlePasswordOnlySubmit = async (formdata) => {
    "use server"

    const _cookies = await cookies();
    const key = formdata.get("revalidation_key");
    const next = formdata.get("next");

    if (!key || key !== process.env.REVALIDATION_KEY) {
      return redirect("?" + new URLSearchParams({
        onlyaskpassword: onlyaskpassword,
        next: next,
        status: "failed",
        message: "Verification failed. Please enter the correct password."
      }));
    }
    
    _cookies.set(KEY_COOKIE_NAME, key);
    return redirect(next);
  }

  return <main className='refreshpage'>
    <h1>Refresh the CMS data</h1>

    { onlyaskpassword === "yes"
      ? <Form action={handlePasswordOnlySubmit}>
        <div>
          <label htmlFor="revalidation_key">Password:</label>
          <input type="password" id="revalidation_key" name="revalidation_key"/>
        </div>

        <div>
          <label htmlFor="next">page to refresh:</label>
          <input type="text" id="next" name="next" defaultValue={next}/>
        </div>

        {Boolean(message) &&
          <p className={status || ""}>{message}</p>
        }

        <input type="submit" value="Refresh"></input>
      </Form>
      : <Form action={handleSumbit}>
        <fieldset>
          <legend><h3>What do you want to refresh?</h3></legend>

          <div>
            <input type="checkbox" id="photos_art" name="photos_art"/>
            <label htmlFor="photos_art">Art Gallery</label>
          </div>

          <div>
            <input type="checkbox" id="current_events" name="current_events"/>
            <label htmlFor="current_events">Current Events</label>
          </div>

          <div>
            <input type="checkbox" id="past_events" name="past_events"/>
            <label htmlFor="past_events">Past Events</label>
          </div>

          <div>
            <input type="checkbox" id="meetup" name="meetup"/>
            <label htmlFor="meetup">Meet Up Posts</label>
          </div>

          <div>
            <input type="checkbox" id="uhc_team" name="uhc_team"/>
            <label htmlFor="uhc_team">Upper House Council</label>
          </div>

          <div>
            <input type="checkbox" id="nonuhc_teams" name="nonuhc_teams"/>
            <label htmlFor="nonuhc_teams">Other Non-UHC teams</label>
          </div>

          <div>
            <input type="checkbox" id="featured_photos" name="featured_photos"/>
            <label htmlFor="featured_photos">Featured Photos</label>
          </div>

          <div>
            <input type="checkbox" id="community_cards" name="community_cards"/>
            <label htmlFor="community_cards">Community Cards</label>
          </div>

          <div>
            <input type="checkbox" id="extra_footer_links" name="extra_footer_links"/>
            <label htmlFor="extra_footer_links">Extra Footer Links</label>
          </div>

          {(!revalidation_key || status == "failed") && <div>
            <label htmlFor="revalidation_key">Password:</label>
            <input type="password" id="revalidation_key" name="revalidation_key"/>
          </div>}

          {Boolean(message) &&
            <p className={status || ""}>{message}</p>
          }

          <input type="submit" value="Refresh"></input>
        </fieldset>
      </Form>
    }

    <div className='moreinfo'>
      <h3>Want to refresh a specific page only?</h3>
      <ol>
        <li>Go the page you want to refresh</li>
        <li>In the URL, just after the domain name add <code>/refresh</code> and hit enter.</li>
        <li>After that, it may ask you the password depending on the scenario.</li>
      </ol>
      <p>e.g. if the URL of the page is <code>https://saranda.com/know_us</code> then make it <code>https://saranda.com/refresh/know_us</code> and hit enter.</p>
    </div>
  </main>
}