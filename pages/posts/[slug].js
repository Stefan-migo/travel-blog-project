import { graphCms } from "../../lib/graphCms";
import style from '../../styles/singlepost.module.css';
import { format } from "date-fns";
import Head from "next/head";

const singlePost = ({ post }) => {
  const { title, createdAt, content } = post;
  return (
    <div className="container">
      <Head>
        <title>Travel Blog | {title}</title>
      </Head>
      <div className={style.single_post}>
        <h1 className={style.title}>{title}</h1>
        <h3 className={style.date}>{format(new Date(createdAt), "EEEE, dd, LLL, yyyy")}</h3>
        <div dangerouslySetInnerHTML={{ __html: content.html }}
          className={style.formatter}></div>
      </div>
    </div>
  );
}

export default singlePost;

//fetching data from database. (single post)
//getStaticPaths is a function that pre-renders paths specified on the function
export async function getStaticPaths() { //asking for paths of each post
  const { posts } = await graphCms.request
    (`
    query MyQuery {
        posts{
          slug
        }
      }      
    `); //it returns an array with the slugs of each post
  //getStaticPaths() returns paths and fallback (parameters)
  const paths = posts.map(({ slug }) => ({ params: { slug } })); // setting paths (parameter) with a map of the array posts
  return {
    paths, //params == slug (each of them)
    fallback: "blocking" //sending the params to the getStaticProps()
  }
  //fallback can be false: returning a 404 error
  //fallback can be true: returning a change of behaviour on getStaticsProps change. it is useful in very large pages where pre-render paths can take too long(just check it again its not ease to understan.)
  //fallback can be blocking: The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
}

//getStaticProps will render to html the paths and data requested with getStatcspaths function.
export async function getStaticProps({ params }) {//params are the data we got from getStaticPaths function, on the request to the databse.
  const { post } = await graphCms.request //now we are asking for a second request, this time a singe post properties.
    (`
    query SinglePost($slug: String!) {
        post(where: {slug: $slug}) {
          title     
          createdAt
          content {
            html
          }
        }
      }
    `, { "slug": params.slug }) //defining the route of each post, in order to get the properties.
  return {
    props: {
      post //it will render the post properties for each slug.
    },
    revalidate: 10 //it will revalidate the data each 10 seconds.
  }
}