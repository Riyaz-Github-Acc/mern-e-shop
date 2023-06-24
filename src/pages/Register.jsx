/* eslint-disable no-unused-vars */
import { CloudUploadOutlined } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profilePicUploadPlaceholder from "../assets/images/placeholders/profile-pic-upload-placeholder.png";

import Button from "../components/Button";
import ErrorMsg from "../components/messages/ErrorMsg";
import CircularLoading from "../components/loaders/CircularLoading";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../redux/slices/usersSlice";

const Register = () => {
  //Dispatch
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    // image: "",
  });
  //---Destructuring---
  const { userName, email, password, image } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ userName, email, password }));
  };

  // Get the Data from Store
  const { loading, error, user } = useSelector((state) => state?.users);

  // Redirect After Register
  // useEffect(() => {
  //   if (user) {
  //     window.location.href = "/login";
  //   }
  // }, [user]);

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-gray-100 overflow-x-hidden">
        <div className="relative container px-4 py-12 mx-auto">
          <div className="absolute inset-0 bg-blue-200 my-24 ml-4" />
          <div className="relative flex flex-wrap bg-white">
            <div className="w-full lg:w-4/6 xl:px-2">
              <div className="lg:max-w-3xl mx-auto py-16 px-4 md:px-10 lg:px-10">
                <h3 className="mb-8 text-2xl md:text-3xl lg:text-4xl xl:5xl font-bold font-heading">
                  Sign up for an account
                </h3>

                {error && <ErrorMsg message={error?.message} />}

                <p className="mb-10 font-semibold font-heading">
                  One more step to go
                </p>
                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}
                >
                  <div className="w-full md:w-1/2 px-4 mb-6">
                    <input
                      name="userName"
                      value={userName}
                      onChange={onChangeHandler}
                      className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                      type="text"
                      placeholder="User Name"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-4 mb-6">
                    <input
                      name="email"
                      value={email}
                      onChange={onChangeHandler}
                      className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-4 mb-8">
                    <input
                      name="password"
                      value={password}
                      onChange={onChangeHandler}
                      className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </div>

                  {/* <div className="flex flex-row items-center justify-between w-full md:w-1/2 px-4 mb-8">
                    <img
                      src={profilePicUploadPlaceholder}
                      alt="profilePic"
                      className="w-20 h-20"
                    />

                    <label
                      htmlFor="profilePic"
                      className="flex flex-row items-center gap-3 text-xl cursor-pointer"
                    >
                      <div>
                        <CloudUploadOutlined fontSize="large" />
                      </div>
                      <p>Upload Image</p>
                    </label>
                    <input
                      id="profilePic"
                      name="image"
                      value={image}
                      onChange={onChangeHandler}
                      type="file"
                      hidden
                    />
                  </div> */}

                  <div className="flex sm:flex-row flex-col sm:gap-10 gap-5 items-center w-full px-4">
                    {loading ? (
                      <Button type="primaryBtn" disabled>
                        <div className="flex items-center gap-2">
                          <h3>Loading...</h3>
                          <CircularLoading />
                        </div>
                      </Button>
                    ) : (
                      <Button type="primaryBtn">Register</Button>
                    )}

                    <div>
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-red-500 underline decoration-red-300"
                      >
                        Login
                      </Link>{" "}
                      here
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="w-full lg:w-2/6 hidden lg:flex md:h-auto  items-center lg:items-end px-4 pb-20 bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
