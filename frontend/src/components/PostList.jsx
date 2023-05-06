import { usePostContext } from "../context/postContext";
import PostItem from "./PostItem";

function PostList() {
  const { loading, posts, error } = usePostContext();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>{ error }</h1>;

  return (
    <div className="App">
      { posts?.map(function (elt) {
        return <PostItem key={ elt.id } post={ elt } />;
      }) }
    </div>
  );
}

export default PostList;
