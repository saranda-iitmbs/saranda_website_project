import Form from 'next/form';
import "./style.scss";
import { getAllTagsAndRoutes } from '@/lib/sanityqueries';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';


export default async function Refresh({ searchParams }) {
  const { next } = await searchParams;

  return <main className='refreshpage'>
    <header>
      <h1>Invalidate Server Cache</h1>
      <p>Note: This dashboard is mostly for testing and debugging purposes.</p>
    </header>
    
    {
      next
      ? <AuthForm next={next}/>
      : <RevalidationForm/>
    }

    <ExtraInfo/>
  </main>
}


async function RevalidationForm() {
  const {alltags, allroutes} = getAllTagsAndRoutes();
  const handleSumbit = async (formdata) => {
    "use server"

    const password = formdata.get("password");
    if (password !== process.env.REVALIDATION_KEY) {
      console.warn("FAILED revalidation attempt:", `{Password: ${password}}`);
      return {
        starus: "failure",
      };
    }

    const tags = [];
    const routes = [];
    for (const [raw, value] of formdata.entries()) {
      if (value === "on") {
        const entity = raw.replace(/^(tag|route):/, "");
        if (raw.startsWith("tag:")) tags.push(entity);
        if (raw.startsWith("route:")) routes.push(entity);
      }
    }

    tags.forEach(tag => revalidateTag(tag));
    routes.forEach(route => revalidatePath(route));
    
    console.info("Revalidated Tags: ", tags);
    console.info("Revalidated Paths: ", routes);

    return {
      status: "passed",
    };
  }

  return  <Form action={handleSumbit}>
    <div className='fields'>
      <fieldset>
        <legend><h3>Tags</h3></legend>
        {alltags.map(tag => <div key={tag}>
          <input type="checkbox" id={"tag:"+tag} name={"tag:"+tag}/>
          <label htmlFor={"tag:"+tag}>{tag}</label>
        </div>)}
      </fieldset>
      <fieldset>
        <legend><h3>Routes</h3></legend>
        {allroutes.map(route => <div key={route}>
          <input type="checkbox" id={"route:"+route} name={"route:"+route}/>
          <label htmlFor={"route:"+route}>{route}</label>
        </div>)}
      </fieldset>
    </div>

    <input type="password" id="password" name="password" placeholder="password"/>
    <input type="submit" value="Invalidate"></input>
  </Form>
}


async function AuthForm({next="/"}) {
  const handleSumbit = async (formdata) => {
    "use server"

    const password = formdata.get("password");
    if (password !== process.env.REVALIDATION_KEY) {
      console.warn("FAILED revalidation attempt:", `{Password: ${password}}`);
      return {
        starus: "failure",
      };
    }

    const route = formdata.get("route");
    revalidateTag(route);
    revalidatePath(route);
    console.info("Revalidated Path: ", route);

    return redirect(next);
  }

  return  <Form action={handleSumbit}>
    <div>
      <label htmlFor="route">route: </label>
      <input type="text" id="route" name="route" defaultValue={next}/>
    </div>

    <input type="password" id="password" name="password" placeholder="password"/>
    <input type="submit" value="Invalidate"></input>
  </Form>
}


function ExtraInfo() {
  return <div className='moreinfo'>
      <h3>Want to refresh a specific page only?</h3>
      <ol>
        <li>Go the page you want to refresh</li>
        <li>In the URL, just after the domain name add <code>/refresh</code> and hit enter.</li>
        <li>After that, it may ask you the password depending on the scenario.</li>
      </ol>
      <p>e.g. if the URL of the page is <code>https://saranda.com/know_us</code> then make it <code>https://saranda.com/refresh/know_us</code> and hit enter.</p>
    </div>
}