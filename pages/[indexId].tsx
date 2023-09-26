import store, { type Blog } from "./store";
export async function getServerSideProps(context: { params: { indexId: number } }) {
    const { params } = context;
    const { indexId } = params;
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${indexId}`);
    const singleBlog = await resp.json();
    return {
      props: {
        singleBlog
      },
    };
  }

const getPost = ({ singleBlog }: { singleBlog: Blog }) => (
    <div>
            <h2>{singleBlog.id} {singleBlog.title}</h2>
            <p>{singleBlog.body}</p>
        </div>
)


export default getPost

