import React from "react";
import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <h1 className=" text-2xl text-slate-200 hover:text-white underline">
      <Link to={ `/posts/${post.id}` }>{ post.title }</Link>
    </h1>
  );
}

export default PostItem;
