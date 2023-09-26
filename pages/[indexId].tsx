import store, { type Blog } from "./store";
export async function getServerSideProps(context: { params: { indexId: number } }) {
    const resp = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
    
      store.blog = await resp.json();
    const paraId = context.params.indexId;
    const paramsId = parseInt(paraId.toString());
    const singleBlog = store.getBlog(paramsId);
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

