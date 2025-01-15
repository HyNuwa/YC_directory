import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({searchParams}: {
  searchParams: { query?: string };
}) {
  const query = (await searchParams).query ?? '';
  const params = { search: query || null };
  const { data : posts } = await sanityFetch( {query: STARTUPS_QUERY, params} ); 

  // const posts = [{ 
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id : 1, name: 'Adrian' },
  //   decription: 'This is a description',
  //   image: 'https://plus.unsplash.com/premium_photo-1661878091370-4ccb8763756a?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   category: 'Japan',
  //   title: 'Mt. Fuji'
  //  }];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br/> 
                                Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl ">
          Submit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/> //KEY={POST?._ID}
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
