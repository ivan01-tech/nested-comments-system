import { useAysnc, useAysncFn } from "../hooks/useAsync";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getPosts } from "../services/getPosts";
import getPostById from "../services/getPostById";

// create the context
const PostContext = createContext({});

/**
 * the hook to help us acces the PostContext's values easily
 * @returns
 */
export const usePostContext = function () {
  return useContext(PostContext);
};

/**
 * the postContext provider
 * @param {*} param0
 * @returns
 */
function PostContextProiver({ children }) {
  const { value: posts, error, loading } = useAysnc(getPosts);

  const {
    execute,
    error: getPostError,
    value: post,
    loading: getpostLoading,
  } = useAysncFn(getPostById);

  // to hold all comment related to the current  post
  const [commentsList, setcommentsList] = useState([]);

  useEffect(() => {
    // we change the commentList everytime the post.comments change
    if (!post?.comments) setcommentsList([]);
    else setcommentsList(post?.comments);
  }, [post?.comments]);

  /**
   * to group all post's comment by parent's id
   */
  const grouCommentParentId = useMemo(
    function () {
      if (!commentsList.length) return {};
      const group = {};

      Boolean(commentsList.length) &&
        commentsList?.forEach((comment) => {
          // console.log("com : ", comment);
          group[comment?.parentId] ||= [];
          group[comment?.parentId].push(comment);
        });

      return group;
    },
    [commentsList]
  );

  console.log("grouCommentParentId : ", grouCommentParentId);

  /**
   * to get replies related to a single comment
   * @param {*} id
   * @returns
   */
  const getReplies = function (id) {
    return grouCommentParentId[id];
  };

  /**
   * a function to upadate the list of comment
   * @param {object} comment
   */
  const updateReplyListComment = function (comment) {
    setcommentsList((prev) => [comment, ...prev]);
  };

  const updateCommentLocal = function (comment) {
    setcommentsList((prev) => {
      return prev?.map(function (com) {
        if (com?.id == comment?.id) return comment;
        return com;
      });
    });
  };
  /**
 to update the list of comment
 *  */
  const createCommentLocal = function (comment) {
    setcommentsList((prev) => [comment, ...prev]);
  };

  /**
   * to delete a comment after removing from the server
   * @param {string} commentId
   */
  const deleteCommentLocal = ({ commentId }) => {
    setcommentsList((prev) =>
      prev.filter((comment) => comment?.id != commentId)
    );
  };

  const toogleCommentLocal = function (id, addLike) {
    setcommentsList((prev) => {
      return prev.map(function (params) {
        if (params?.id == id) {
          if (addLike) {
            return {
              ...params,
              likeByMe: true,
              likesCount: params?.likesCount + 1,
            };
          } else {
            return {
              ...params,
              likeByMe: false,
              likesCount: params?.likesCount - 1,
            };
          }
        } else {
          return params;
        }
      });
    });
  };

  const rootComments = grouCommentParentId["null"];

  const value = {
    commentsList,
    updateReplyListComment,
    updateCommentLocal,
    deleteCommentLocal,
    createCommentLocal,
    toogleCommentLocal,
    posts,
    error,
    rootComments,
    getReplies,
    loading,
    execute,
    getPostError,
    post,
    getpostLoading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export default PostContextProiver;
