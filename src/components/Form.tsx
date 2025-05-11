// import { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import InputField from "../components/InputField";
// import { KeyValueProps } from "../interfaces";
// import { apiPost } from "../utils/UseAuth";
import { Link, useLocation } from "react-router-dom";


function Form({ title, children, onSubmit, loading }) {
  const { pathname } = useLocation();

  return (
    (<div className="flex flex-col w-full h-dvh">

      {/* Main Navbar */}
      <Navbar />

      <div className="grid grid-cols-2 w-full flex-1">
        <div className="flex flex-col items-center justify-center bg-red-400 rounded-tr-4xl">
          <h1 className="font-bold text-4xl text-white">Telecon</h1>
          <p className="text-sm text-white">Getting you connected...</p>
        </div>
        <div className="flex-1 flex items-center w-full p-2">
          <form className="border rounded-xl flex flex-col gap-2 p-2 w-3/4 mx-auto" onSubmit={onSubmit}>
            <div className="text-red-500 font-bold text-3xl text-center">{title}</div>

            {children}

            {
              pathname === '/register' ? (<Button loading={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>) :
                (<Button loading={loading}>
                  {loading ? "Logging..." : "Login"}
                </Button>)
            }

            <p className="text-sm m-0 text-center">{
              pathname === '/register'
                ? <>Already have an account? <Link to='/login' className="text-xs underline cursor-pointer text-blue-500" >Login</Link></>
                : <>Don't have an account? <Link to='/register' className="text-xs underline cursor-pointer text-blue-500" >Register</Link></>}</p>
          </form>
        </div>
      </div>
  
    </div>)
  )
}

export default Form

function Button({ children,loading }) {
  return <button className="border cursor-pointer h-10 rounded-sm mt-4 bg-red-400 hover:bg-red-500 font-semibold text-white" disabled={loading}>{children}</button>
}
