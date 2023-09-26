import { computed, makeObservable, observable } from "mobx";

export interface Blog {
    id: number,
    title: string,
    body: string,
}   

class BlogStore {
    blog: Blog[] = [];
    filter: string = "";
    constructor() {
        makeObservable(this, {
            blog: observable,
            filter: observable,
            filteredBlog: computed,
        })
    }

    setBlog(blog: Blog[]) {
        this.blog = blog;
    }

    get filteredBlog() {
        return this.blog.filter(({ title }) =>
          title.toLowerCase().includes(this.filter.toLowerCase())
        );
      }

    getBlog(id: number) {
    return this.blog.find((blog) => blog.id === id);
  }
}

const store = new BlogStore();

export default store;
