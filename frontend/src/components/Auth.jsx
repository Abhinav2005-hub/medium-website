import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Live postInputs:", postInputs);
  }, [postInputs]);

  async function sendRequest() {
    setError("");

    if (!postInputs.email || !postInputs.password) {
      setError("Email and password are required");
      return;
    }
  
    if (type === "signup" && (!postInputs.name || !postInputs.username)) {
      setError("Name and username are required for signup");
      return;
    }
  
    try {
      const dataToSend =
        type === "signup"
          ? postInputs
          : {
              email: postInputs.email,
              password: postInputs.password
            };
  
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
      console.log("Auth error:", e.response?.data || e.message);
    }
  }
  
  
  return (
    <div className="px-10">
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="flex flex-col items-center mb-4">
              <div className="text-3xl font-extrabold">{
                type === "signup" ? "Create an account" : "Welcome back"
              }</div>

              <div className="text-slate-400">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                  {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
              </div>
            </div>

            {type === "signup" && (
              <>
                <LabelledInput
                  label="Name"
                  placeholder="Abhinav Saini"
                  value={postInputs.name}
                  onChange={(e) =>
                    setPostInputs((c) => ({ ...c, name: e.target.value }))
                  }
                />
                <LabelledInput
                  label="Username"
                  placeholder="abhinav123"
                  value={postInputs.username}
                  onChange={(e) =>
                    setPostInputs((c) => ({ ...c, username: e.target.value }))
                  }
                />
              </>
            )}

            <LabelledInput
              label="Email"
              placeholder="abhinav@gmail.com"
              value={postInputs.email}
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, email: e.target.value }))
              }
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="123456"
              value={postInputs.password}
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, password: e.target.value }))
              }
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              onClick={sendRequest}
              type="button"
              className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 
              focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium 
              rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange, value, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-black font-semibold">{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
