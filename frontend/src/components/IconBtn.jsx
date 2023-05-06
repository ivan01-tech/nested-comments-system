import React from "react";

function IconBtn({ Icon, color, children, isActive, ...otherprops }) {
  return (
    <button className={ `icons-btn px-2  ${color ? "text-red-400" : ""}` } { ...otherprops }>
      <div className="flex justify-center items-center gap-1">
        { <Icon /> }
        { children }
      </div>
    </button>
  );
}

export default IconBtn;
