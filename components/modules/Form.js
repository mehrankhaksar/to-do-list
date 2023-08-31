import React from "react";

import Link from "next/link";

function Form({ signUp, values: { email, password }, onChange, onSubmit }) {
  return (
    <div className="max-w-xs w-full bg-white p-5 rounded-md shadow-md">
      <form
        className="w-full flex flex-col items-center space-y-5"
        autoComplete="off"
        noValidate
        onSubmit={onSubmit}
      >
        <h3 className="text-xl font-bold">{signUp ? "Sign Up" : "Sign In"}</h3>
        <div className="form-input-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button
          className="w-full text-sm font-semibold text-white bg-blue-500 py-1.5 rounded"
          type="submit"
        >
          {signUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-sm font-medium">
          {`${signUp ? "Have" : "Create"} an account?`}
          <Link
            className="font-semibold ml-1 transition-colors hover:text-blue-500"
            href={`/sign-${signUp ? "in" : "up"}`}
          >
            {signUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Form;
