import React from 'react'

function Card(props) {
  return (
    <div className="relative rounded-sm ">
      <img
        className="h-auto w-64 rounded-sm mb-0.5 relative"
        src="https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg"
        alt=""
      />
      <div className="absolute text-left bottom-4 left-4">
        <h1 className=" text-white font-semibold text-lg">{props.username}</h1>
        <p className=" selection:bg-fuchsia-300 selection:text-fuchsia-900 text-xs text-gray-300 mt-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sed
          odio
        </p>
        <button className="mt-2 text-sm font-semibold text-white items-center inline-flex cursor-pointer bg-gray-600 rounded-lg px-2 py-1 w-auto">
          {props.btntxt || "Click Me!"}
        </button>
      </div>
    </div>
  );
}

export default Card