import React from 'react'
import { useLoaderData } from 'react-router-dom';

const Github = () => {
    const { data } = useLoaderData();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto mb-16">
        <h1 className="text-black text-2xl font-bold mb-6 mt-10 ">Github Component</h1>
        <div className="grid grid-cols-2 gap-8 bg-gray-100 p-8 rounded-lg">
          <div className="flex items-center justify-center">
            <img className="h-64 w-64 rounded shadow-xl" src={data.avatar_url} alt="" />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-black text-lg">Name: {data.name}</h2>
            <h2 className="text-black text-lg">
              Public repo count : {data.public_repos}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Github

export async function githubLoader({ signal }) {
  const res = await fetch("https://api.github.com/users/Pratikkk14", {
    signal,
  });

  if (!res.ok)
    throw new Response("GIthub User Not Found", { status: res.status });

  const data = await res.json();
  return { data };
}