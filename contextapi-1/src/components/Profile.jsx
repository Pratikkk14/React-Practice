import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
    const {user} = useContext(UserContext)
  
    if(!user) return <h1>Please login to view profile</h1>
    return (
        <div className="card card-side bg-base-100 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">New movie is released!</h2>
                <p>Welcome!!! {user.username}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div>
            </div>
        </div>
    );
     

}

export default Profile