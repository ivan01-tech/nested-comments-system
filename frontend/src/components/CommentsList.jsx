import Comment from "./Comment";

function CommentsList({ comments }) {
  // console.log("roots : ", comments);

  const content = Boolean(comments?.length) ? (
    comments.map((comt) => <Comment comment={comt} key={comt.id} />)
  ) : (
    <></>
  );

  return content;
}
export default CommentsList;
