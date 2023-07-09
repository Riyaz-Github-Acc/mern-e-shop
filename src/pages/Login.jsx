/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUserAction } from "../redux/slices/usersSlice";

import Button from "../components/Button";
import ErrorMsg from "../components/messages/ErrorMsg";
import CircularLoading from "../components/loaders/CircularLoading";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "customer@gmail.com",
    password: "Customer@123",
  });
  //---Destructuring---
  const { email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  // Get the Data from Store
  const { loading, error, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  // Redirect after Login
  if (userInfo?.token) {
    window.location.href = "/";
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-gray-100 overflow-x-hidden">
        <div className="relative container px-4 py-16 mx-auto">
          <div className="absolute inset-0 bg-blue-200 my-24 ml-4" />
          <div className="relative flex flex-wrap bg-white">
            <div className="w-full lg:w-4/6 xl:px-2">
              <div className="lg:max-w-3xl mx-auto py-16 px-4 md:px-10 lg:px-10">
                <h3 className="mb-8 text-2xl md:text-3xl lg:text-4xl xl:5xl font-bold font-heading">
                  Login to your account
                </h3>
                <p className="mb-10 font-semibold font-heading">
                  Happy to see you again
                </p>

                {error && <ErrorMsg message={error?.message} />}

                <form
                  className="flex flex-wrap -mx-4"
                  onSubmit={onSubmitHandler}
                >
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-900 uppercase font-bold font-heading">
                        Your Email
                      </h4>
                      <input
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="w-full md:w-1/2 px-4 mb-12">
                    <label>
                      <h4 className="mb-5 text-gray-900 uppercase font-bold font-heading">
                        Password
                      </h4>
                      <input
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                        className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                        type="password"
                      />
                    </label>
                  </div>

                  <div className="flex flex-row gap-10 items-center w-full px-4">
                    {loading ? (
                      <Button type="primaryBtn" disabled>
                        <div className="flex items-center gap-2">
                          <div>Loading...</div>
                          <CircularLoading />
                        </div>
                      </Button>
                    ) : (
                      <Button type="primaryBtn">Login</Button>
                    )}

                    <div>
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/register"
                        className="text-red-500 underline decoration-red-300"
                      >
                        Register
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

export default Login;
