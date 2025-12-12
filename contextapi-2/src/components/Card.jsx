import React from 'react'
import useTheme from "../context/ThemeContext";

function Card() {

  const { themeMode, lightTheme, darkTheme } = useTheme();

  const ChangeBtn = (e) => { 
    const darkModestatus = e.target.checked;
    if(darkModestatus){
      darkTheme();
    } else {
      lightTheme();
    }
  }

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Toggle Card</h2>
          <p>
            Here is a simple card that uses UseContext to toggle between light
            and dark theme
          </p>
          <div className="card-actions">
            {/*START Toggle button ui*/}
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
              <legend className="fieldset-legend w-auto">Login options</legend>
              <label className="label text-3xl">
                <input
                  type="checkbox"
                  className="toggle toggle-lg"
                  checked={themeMode === "dark"}
                  onChange={ChangeBtn}
                />
                ThemeMode
              </label>
            </fieldset>
            {/*END Toggle button ui */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card