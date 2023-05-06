import React, { useState } from "react";
import { usePostContext } from "../context/postContext";
import getFormatedDate from "../utils/getFormatedDate";
import CommentsList from "./CommentsList";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import IconBtn from "./IconBtn";
import FormComent from "./FormComent";
import {
  deleteComment,
  replyComment,
  toogleLikeComment,
  updateComment,
} from "../services/commentsCrud";
import { useParams } from "react-router-dom";
import { useAysncFn } from "../hooks/useAsync";

function Comment({ comment }) {
  const { id } = useParams();
  const {
    getReplies,
    updateCommentLocal,
    updateReplyListComment,
    deleteCommentLocal,
    toogleCommentLocal,
  } = usePostContext();

  const [areChidrenShow, setAreChildrenShow] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showReplyorm, setShowReplyorm] = useState(false);

  /**
   *  state to manage replying to a comment inside  a post
   */
  const replyCommentState = useAysncFn(replyComment);

  const replyCommentHnadler = async function ({ message }) {
    return replyCommentState
      .execute({ postId: id, parentId: comment?.id, message })
      .then((res) => {
        console.log("reply res : ", res);
        updateReplyListComment(res);
        ShowReplyFormHandler();
      });
  };

  /**
   *  state to manage updation of a comment inside  a post
   */
  const updateCommentState = useAysncFn(updateComment);
  /**
   * @param {{message:String}} params
   * @returns
   */
  const updateCommentHnadler = async function ({ message }) {
    return updateCommentState
      .execute({
        id: comment?.id,
        message,
      })
      .then((res) => {
        console.log("++++++++++ : ", res);
        updateCommentLocal(res);
        // set it visibility of the form
        ShowUpdateFormHandler();
      });
  };

  /**
   *  state to manage deletion of a comment inside  a post
   */
  const deleteCommentState = useAysncFn(deleteComment);
  /**
   * // TODO check the owner
   * @returns
   */
  const deleteCommentHnadler = async function () {
    return deleteCommentState
      .execute({
        commentId: comment?.id,
        postId: id,
      })
      .then((res) => {
        console.log("++++++++++1 : ", res);
        deleteCommentLocal(res);
      });
  };

  const toogleLikeCommentState = useAysncFn(toogleLikeComment);
  const toogleCommentHandler = function () {
    toogleLikeCommentState
      .execute({ postId: id, commentId: comment?.id })
      .then(function ({ addLike }) {
        console.log("here we go !");
        toogleCommentLocal(comment?.id, addLike);
      });
  };

  const ShowOrHideChildren = function (e) {
    setAreChildrenShow((prev) => !prev);
  };
  const ShowUpdateFormHandler = function (e) {
    setShowUpdateForm((prev) => !prev);
  };
  const ShowReplyFormHandler = function (e) {
    setShowReplyorm((prev) => !prev);
  };
  const date = new Date(comment?.createAt)
  const formatedDate = getFormatedDate(date);
  // all replies to a 
  const replies = getReplies(comment.id);

  return (
    <div className="w-full flex flex-col">
      {/* comment itself */ }
      <div className=" p-2 border border-gray-400 w-full max-w-[500px] mt-1">
        <div className="text-[.8rem] flex justify-between mb-1">
          <span> { comment.user.name }</span>
          <span> { formatedDate }</span>
        </div>

        {/* show the message or the form to update it */ }
        <div>
          { showUpdateForm ? (
            <FormComent
              autoFocus={ true }
              loading={ updateCommentState.loading }
              error={ updateCommentState.error }
              initialValue={ comment?.message }
              onSubmit={ updateCommentHnadler }
            />
          ) : (
            comment.message
          ) }
        </div>

        <div>
          <IconBtn
            disabled={ toogleLikeCommentState.loading }
            Icon={ comment?.likeByMe ? FaHeart : FaRegHeart }
            aria-label={ comment?.likeByMe ? "Unlike" : "Like" }
            onClick={ toogleCommentHandler }
          >
            { comment?.likesCount }
          </IconBtn>

          <IconBtn
            Icon={ FaReply }
            aria-label="Reply"
            isActive={ showReplyorm }
            onClick={ ShowReplyFormHandler }
            title={ "reply to this comment" }
          />
          <IconBtn
            isActive={ showUpdateForm }
            Icon={ FaEdit }
            aria-label="Edit"
            onClick={ ShowUpdateFormHandler }
            title={ "rdit this comment" }
          />
          <IconBtn
            Icon={ FaTrash }
            color={ "red" }
            aria-label="Delete"
            onClick={ deleteCommentHnadler }
            disabled={ deleteCommentState.loading }
          />
        </div>
        {/* show errors messages */ }
        { deleteCommentState?.error ? (
          deleteCommentState?.error?.message ? (
            <div className="error">{ deleteCommentState.error?.message }</div>
          ) : (
            <div className="error">{ deleteCommentState.error }</div>
          )
        ) : (
          ""
        ) }
        {/* show errors messages */ }
        { deleteCommentState.error && (
          <div className="error">{ deleteCommentState.loading }</div>
        ) }
        {/* show errors messages */ }
        { toogleLikeCommentState.error && (
          <div className="error">{ deleteCommentState.loading }</div>
        ) }
      </div>

      {/* form to reply to a comment */ }
      { showReplyorm ? (
        <FormComent
          error={ replyCommentState.error }
          loading={ replyCommentState.loading }
          autoFocus={ true }
          onSubmit={ replyCommentHnadler }
        />
      ) : (
        ""
      ) }

      {/* comments replies */ }
      <section className="">
        <div className={ ` flex gap-1 ${!areChidrenShow ? "" : "hidden"}` }>
          { replies && replies.length && (
            <button
              title="collapse comments"
              className="inline-block border-l w-4 border-gray-400 border-none cursor-pointer bg-none focus:border-slate-400 active:border-slate-400 "
              onClick={ ShowOrHideChildren }
            />
          ) }
          <div className="w-full">
            { <CommentsList comments={ replies } /> }
          </div>
        </div>
        <button className="border border-white p-1" hidden={ !areChidrenShow } onClick={ ShowOrHideChildren }>
          Show replies
        </button>
      </section>
    </div>
  );
}

export default Comment;
