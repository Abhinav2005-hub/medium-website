import { Link } from "react-router-dom";
import { useState } from "react";

export const Auth = ({ type }) => {
  const [postInputs, setPostInputs] = useState({
    name: "",
    username: "",
    password: "",
  });

  return (
    <div className="px-10">
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="flex flex-col items-center mb-4">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="text-slate-400">
                  {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                  <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                      {type === "signin" ? "Sign up" : "Sign in"}
                  </Link>
              </div>
            </div>

            <LabelledInput
              label="Name"
              placeholder="Abhinav Saini..."
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }))
              }
            />
            <LabelledInput
              label="Username"
              placeholder="abhinav@gmail.com"
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  username: e.target.value,
                }))
              }
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }))
              }
            />
            <button type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>

          </div>
        </div>
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-black font-semibold">{label}</label>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
