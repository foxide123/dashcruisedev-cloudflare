import { getAllBlogs } from "@/app/actions/admin/articlesActions";

type BlogData = {
  id: number;
  //eslint-disable-next-line
  creation_date: any;
  name: string;
};

function formatDate(creationDate: string){
    const date = new Date(creationDate);
    return date.toLocaleDateString('en-CA');
}

export default async function ArticlesPage() {
  const blogs = await getAllBlogs();
  if (blogs.error) {
    throw new Error(`There was an error fetching blgos: ${blogs.error}`);
  }
  const blogsData = blogs.data;
  return (
    <div className="caret-transparent">
      {blogsData && blogsData.map((blog: BlogData, index:number) => 
      <div key={index} className="cursor-pointer rounded-xl bg-black/50 text-white w-[300px] h-[300px] flex-col flex justify-center items-start gap-4 p-8 flex-wrap">
        <p>Id: <span className="text-xl">{blog.id}</span></p>
        <p>Name: <span className="text-xl">{blog.name}</span></p>
        <p className="break-words">Creation Date: <span className="text-xl">{formatDate(blog.creation_date)}</span></p>
      </div>
      )}
    </div>
  );
}
