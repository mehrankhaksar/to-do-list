import React from "react";

import { useRouter } from "next/router";

import { toast } from "react-toastify";

import Form from "../modules/Form";

function SignUpPage() {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace("/sign-in");
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="w-full h-full grid justify-items-center content-center">
      <Form
        signUp={true}
        values={inputs}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </section>
  );
}

export default SignUpPage;
