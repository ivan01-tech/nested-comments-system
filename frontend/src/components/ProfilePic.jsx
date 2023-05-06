import React from "react";
// import profile from "../assets/mee2.jpg"

function ProfilePic() {
  return (
    <section className="w-full mx-auto flex flex-col justify-center items-center ">
      <img
        src="/mee2.jpg"
        alt="Ivan01-tech picture "
        className="border-4 border-slate-500 rounded-full  object-cover drop-shadow-xl mx-auto mt-8"
        width={ 200 }
        height={ 200 }
      />
      <p className="text-2xl text-center">
        Hello and Welcome 👋, i&apos;m <span className="font-bold">Ivan</span>
      </p>
    </section>
  );
}
export default ProfilePic;
