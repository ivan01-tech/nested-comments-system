import React from "react";
import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <h1>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </h1>
  );
}

export default PostItem;
