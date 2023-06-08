import Cookies from "js-cookie";
import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/authApi";
import { removeUser } from "../redux/services/authSlice";
import { Loader, ScrollArea } from "@mantine/core";
import "../style/glassmorphic.css";

const UserProfile = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logout, { isLoading }] = useLogoutMutation();

  const nav = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
    console.log(data);
  };
  return (
    // this is user profile details component for profile detail page. Change the color of form for dark-mode yourself.

    <div className=" flex justify-center items-center h-screen">
      <div className=" flex flex-col gap-3 p-3 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded glassmorphic  w-72">
        {/* Back arrow */}
        <Link to={"/"}>
          <button className=" flex flex-col text-gray-600 px-5 pb-5 pt-2 hover:text-gray-400 text-2xl ml-[-20px] ">
            <BsArrowLeftCircle />
          </button>
        </Link>
        {/* inner texts of Form */}
        <div className=" flex flex-col gap-3 rounded-t-xl bg-gray-100 p-5">
          {/* Icon */}
          <div className=" relative mb-2 mt-[-50px] mx-auto w-16 h-16 rounded-[50%] bg-blue-800 text-white outline-double outline-[6px] outline-blue-800">
            <p className=" absolute text-center mt-[6px] ml-[7px] text-5xl font-medium w-12 h-12 rounded-[50%] text-white">
              {user?.name.substring(0, 1).toUpperCase()}
            </p>
          </div>
          {/* name */}
          <ScrollArea w={200} type="never">
            <p className=" text-gray-600 text-lg mt-1 font-medium">{user?.name}</p>
          </ScrollArea>
        </div>
        {/* email */}
        <div className=" flex flex-col rounded-b-xl bg-gray-100 p-5 mt-[-6px]">
          <ScrollArea w={200} type="never">
            <p className=" text-gray-600 text-lg font-medium">{user?.email}</p>
          </ScrollArea>
        </div>
        {/* signout */}
        <button
          onClick={logoutHandler}
          disabled={isLoading && true}
          type="submit"
          className=" bg-red-600 text-white px-4 hover:bg-gray-400 my-3 rounded w-40 h-9 mx-auto block"
        >
          {isLoading ? (
            <Loader
              className=" mx-auto my-auto block"
              color="white"
              size="sm"
            />
          ) : (
            "Sign out"
          )}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
