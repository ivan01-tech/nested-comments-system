import React from "react";

function IconBtn({ Icon, color, children, isActive, ...otherprops }) {
  return (
    <button className={`icons-btn ${color ? "color" : ""}`} {...otherprops}>
      <span>{<Icon />}</span>
      {children}
    </button>
  );
}

export default IconBtn;
