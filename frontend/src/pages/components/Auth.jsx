import { Link } from "react-router-dom";
import { useState } from "react";

export const Auth = ({ type }) => {
    const [postInputs, setPostInputs] = useState({
        name: "",
        username: "",
        password: "",
    });

    return (
        <div className="h-screen flex justify-center flex-col">
            {JSON.stringify(postInputs)}
           <div className="flex justify-center"> 
              <div className="flex flex-col items-center"> 
                  <div className="text-3xl font-extrabold mb-2"> 
                      Create an account
                  </div>
                  <div className="text-slate-400">
                      Already have an account?
                      <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                  </div>
              </div>
              <LabelledInput
                label=""
                placeholder="Abhinav Saini..."
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value
                  }));
                }}
              />

          </div>
        </div>
    );
};

function LabelledInput({ label, placeholder, onChange }){
    return <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}