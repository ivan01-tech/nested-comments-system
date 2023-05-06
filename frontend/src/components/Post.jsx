import { useParams } from "react-router-dom";
import { usePostContext } from "../context/postContext";
import { useEffect } from "react";
import CommentsList from "./CommentsList";
import FormComment from "./FormComent";
import { createComment } from "../services/commentsCrud";
import { useAysncFn } from "../hooks/useAsync";

function Post() {
  const { id } = useParams();
  const {
    execute,
    getPostError,
    post,
    getpostLoading,
    rootComments,
    createCommentLocal,
  } = usePostContext();

  /**
   *  state to manage creation of a comment inside  a post
   */
  const {
    error,
    execute: createCommentsFn,
    loading,
    value: newComment,
  } = useAysncFn(createComment);

  const createCommentsHandler = function ({ message }) {
    return createCommentsFn({ parentId: null, postId: id, message }).then(
      (res) => {
        console.log("res from create : ", res);
        // set the of comment when the resquest is success
        createCommentLocal(res);
      }
    );
  };

  useEffect(() => {
    console.log("execute : ");
    execute(id);
  }, [id]);

  console.log("value : ", newComment);

  if (getpostLoading) return <h1>Loading...</h1>;

  if (getPostError) return <h1>{ getPostError }</h1>;

  return (
    <div className="my-5">
      <h1 className="text-3xl">{ post?.title }</h1>
      <p>{ post?.body }</p>
      <h3 className="text-xl my-4">Comments</h3>
      {/* TODO onSubmit */ }
      <FormComment
        initialValue={ "" }
        error={ error }
        loading={ loading }
        onSubmit={ createCommentsHandler }
        postId={ id }
      />
      { <CommentsList comments={ rootComments } /> }
    </div>
  );
}

export default Post;
