import { graphCms } from "../lib/graphCms";
import Post from "../components/post";
import Head from "next/head";

const index = ({posts}) => {
    return (
    <>
      <Head>
        <title>Travel Blog | Join our trip! </title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="container">
          <div className="grid">
              {
                  posts.reverse().map(post=> <Post key={post.slug} post={post} />)
              }
          </div>
      </div>
    </>
    );
}
 
export default index;
export async function getStaticProps() {
    const {posts} = await graphCms.request
    (`
    query MyQuery {
        posts{
          title
          slug
          thumbnail {
            url
          }
          categories{
            name
            color{
              css
            }
          }
        }
      }
    `);
    return {
        props:{
            posts
        },
    revalidate:10
    }
}