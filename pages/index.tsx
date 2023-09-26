import dynamic from "next/dynamic";
import { useEffect } from "react";
import store, { type Blog } from "./store";
import { observer } from "mobx-react-lite";
import styles from "../styles/Home.module.css";
import Link from "next/link";


export async function getServerSideProps() {
  const resp = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  store.blog = await resp.json();
  return {
    props: {
      initialBlog: store.blog,
    },
  };
}

function Home({ initialBlog }: { initialBlog: Blog[] }) {
  useEffect(() => {
    store.blog = initialBlog
  }, [initialBlog])
  if (typeof window === 'undefined') {
    return <></>;
  }
  return (
    
    <div>
      <div>
            <input
              type="text"
              value={store.filter}
              onChange={(e) => (store.filter = e.target.value)}
            
            />
      </div>
      <div className={styles.container}>
      {store.filteredBlog.map((blog) => (  
        <Link key={blog.id} href={`/${blog.id}`}>{blog.title}</Link>
      ))}
      </div>
    </div>
  )
}

export default dynamic (() => Promise.resolve(observer(Home)), {ssr: false})