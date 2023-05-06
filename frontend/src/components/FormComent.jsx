import React, { useEffect, useState } from "react";
import { usePostContext } from "../context/postContext";

function FormComent({ onSubmit, initialValue, error, loading, autoFocus }) {
  const [message, setMessage] = useState((initialValue && initialValue) || "");

  const SubmitHandler = async function (e) {
    e.preventDefault();
    try {
      // TODO type it with parameters
      const res = await onSubmit({ message });
      setMessage("");
    } catch (err) {
      return;
    }
  };

  return (
    <form onSubmit={ SubmitHandler } className="">
      <div className="flex items-center gap-1">
        <textarea
          className="bg-slate-500 p-2 text-black"
          id="message"
          value={ message }
          onChange={ (e) => setMessage(e.target.value) }
          autoFocus={ autoFocus }
        ></textarea>
        <button disabled={ loading } type="submit" className="px-2 border">
          { loading ? "Loading..." : "Post" }
        </button>
      </div>
      <div className="error">{ error }</div>
    </form>
  );
}

export default FormComent;
