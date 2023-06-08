import React from "react";
import { Menu, Button, Loader } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";
import { BsBoxArrowInRight } from "react-icons/bs";
import "../style/glassmorphic.css";
import { ScrollArea } from "@mantine/core";

const UserMenu = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const nav = useNavigate();
  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
    console.log(data);
  };

  return (
    <div>
      {/* Dropdown menu start here. Please change colors for dark-mode yourself.*/}
      <Menu
        trigger="hover"
        openDelay={100}
        closeDelay={400}
        width={200}
        shadow="md"
        transitionProps={{ transition: "scale-y", duration: 150 }}
      >
        {/* Icon is here. */}
        <Menu.Target>
          <div className=" relative hover:bg-gray-600 w-12 h-12 rounded-[50%] bg-blue-800 text-white hover:outline-gray-600 outline-double outline-[6px] outline-blue-800">
            <p className=" absolute w-12 h-12 rounded-[50%] text-center mt-[3px] text-4xl font-medium">
              {user?.name.substring(0, 1).toUpperCase()}
            </p>
          </div>
        </Menu.Target>

        {/* dropdown is here. */}
        <Menu.Dropdown className=" mt-1 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg">
          <Menu.Item className=" hover:bg-transparent">
            <div className=" flex flex-col">
              <div className=" container mx-auto flex">
                {/* name */}
                <ScrollArea w={160} h={30} type="never">
                  <p className=" text-gray-600 font-medium text-2xl pb-1">
                    {user?.name}
                  </p>
                </ScrollArea>
                {/* Enter arrow */}
                <Link to={"/profile"}>
                  <div className=" relative ml-[-18px] mt-[1px] bg-transparent w-9 h-9 rounded-[50%] items-center hover:bg-gray-400 hover:text-white">
                    <BsBoxArrowInRight className=" absolute mt-[6px] ml-[3px] text-2xl " />
                  </div>
                </Link>
              </div>
              {/* email */}
              <ScrollArea w={170} type="never">
                <p className=" overflow-hidden text-gray-600 mb-[18px] font-medium">
                  {user?.email}
                </p>
              </ScrollArea>
            </div>
            <hr />
          </Menu.Item>
          
          {/* signout start here */}
          <Menu.Item className=" hover:bg-transparent" component="a">
            <button
              onClick={logoutHandler}
              disabled={isLoading && true}
              type="submit"
              className=" bg-red-600 text-white text-[15px] px-4 mb-2 py-1 hover:bg-gray-400 rounded w-25 h-9 mx-auto block"
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
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default UserMenu;
