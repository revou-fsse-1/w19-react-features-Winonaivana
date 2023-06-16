import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import { PuzzlePieceIcon } from "@heroicons/react/24/solid";

type FormData = {
  name: string;
  password: string;
  email: string;
};
const inputStyle = `mt-4 w-full border rounded-xl border-black px-5 py-2 placeholder-gray`;
const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        "https://mock-api.arikmpt.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        console.log("registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogin = () => {
    navigate("/");
  };
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <section className="flex h-full justify-center bg-gray-20">
      {isAboveMediumScreens && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="mr-20 mt-20 h-[500px] w-[500px] pr-20 pt-16">
            <PuzzlePieceIcon className="text-white"></PuzzlePieceIcon>
          </div>
        </motion.div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.3 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        className="flex min-h-screen flex-col items-center justify-center bg-gray-20"
      >
        <p className="pb-8 text-3xl">Welcome to Twodo</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              id="name"
              className={inputStyle}
              placeholder="name"
              {...register("name", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && (
              <p className="text-sm">
                {errors.name.type === "required" && "This field is required"}{" "}
                {errors.name.type === "maxLength" && "Max length is 100 char"}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              id="email"
              className={inputStyle}
              placeholder="email"
              {...register("email", {
                required: true,
                maxLength: 50,
              })}
            />
            {errors.email && (
              <p className="text-sm">
                {errors.email.type === "required" && "This field is required"}{" "}
                {errors.email.type === "maxLength" && "Max length is 50 char"}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              className={inputStyle}
              placeholder="password"
              {...register("password", {
                required: true,
                maxLength: 8,
              })}
            />
            {errors.password && (
              <p className="text-sm">
                {errors.password.type === "required" &&
                  "This field is required"}{" "}
                {errors.password.type === "maxLength" && "Max length is 8 char"}
              </p>
            )}
          </div>
          <div className="flex">
            <p className="pt-6">Already have an account?</p>
            <button className=" pt-6 hover:underline" onClick={handleLogin}>
              Login
            </button>
          </div>
          <button className="pt-8 hover:underline" type="submit">
            Register
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default RegisterForm;
