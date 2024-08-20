import { Link } from "react-router-dom";
import Logo from "../SVGs/Logo";
import { useForm } from "react-hook-form";
import loginSchema from "../loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center w-screen pt-[48px] pb-[170px] px-[24px]">
      <Logo />
      <div className="w-full flex flex-col items-center px-[24px] pt-[24px] pb-[32px] bg-blue mt-[59px] rounded-lg md:w-[480px]">
        <div className="flex flex-col items-start w-full">
          <p className="outfit text-[24px] text-white font-light">Login</p>
          <form className="mt-[30px] w-full" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full outfit text-white text-[15px] border border-t-0 border-l-0 border-r-0 border-b-gray-500 bg-blue outline-none px-5 py-2 red-cursor focus:border-b-gray-200"
              type="text"
              placeholder="Email address"
              {...register("email")}
            />
            <br />
            {errors.email ? (
              <p
                className="text-sm pl-5 font-normal text-red mt-2"
                style={{ maxWidth: "300px" }}
              >
                {errors.email.message}
              </p>
            ) : null}
            <input
              className="w-full outfit text-white text-[15px] border border-t-0 border-l-0 border-r-0 border-b-gray-500 bg-blue outline-none px-5 py-2 red-cursor mt-[20px] focus:border-b-gray-200"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password ? (
              <p
                className="text-sm pl-5 font-normal text-red mt-2"
                style={{ maxWidth: "300px" }}
              >
                {errors.password.message}
              </p>
            ) : null}
            <button
              type="submit"
              className="w-full bg-red rounded-md px-[68px] py-[14px] text-white text-[14px] font-light outfit mt-[45px]"
            >
              Login to your account
            </button>
          </form>
        </div>
        <Link to={"/registration"}>
          <p className="mt-6 text-white text-[14px] font-extralight outfit">
            Don't have an account? <span className="text-red">Sign Up</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
