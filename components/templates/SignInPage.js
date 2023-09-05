import React from "react";

import { useRouter } from "next/router";

import { useSession, signIn } from "next-auth/react";

import { toast } from "react-toastify";

import Form from "../modules/Form";

function SignInPage() {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const { status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") window.location.href = "/";
  }, [status]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signIn("credentials", {
      email: inputs.email,
      password: inputs.password,
      redirect: false,
    });

    console.log(error);

    if (!error) {
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.replace("/");
    } else {
      toast.error(error, {
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
        signUp={false}
        values={inputs}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </section>
  );
}

export default SignInPage;
