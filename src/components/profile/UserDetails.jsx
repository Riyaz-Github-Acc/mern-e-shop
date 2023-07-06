import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfileAction } from "../../redux/slices/usersSlice";
import SpinLoading from "../loaders/SpinLoading";
import Button from "../Button";
import CircularLoading from "../loaders/CircularLoading";
import {
  AccountCircleOutlined,
  AlternateEmail,
  DeleteOutlineOutlined,
  EditOutlined,
  Event,
  LocationOnOutlined,
  Person,
  PhoneInTalkOutlined,
} from "@mui/icons-material";
import NoDataFound from "../messages/NoDataFound";
import { Link } from "react-router-dom";

export default function UserDetails() {
  // Get User from Store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const {
    profile: { user },
    loading,
    error,
  } = useSelector((state) => state?.users);

  return (
    <>
      {loading ? (
        <SpinLoading />
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          <div className="flex flex-row items-center justify-between ml-5 sm:ml-0">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-48 h-48">
                <img
                  src={user?.image}
                  alt="profile-image"
                  className="w-[100%] h-[100%] rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Basic Details</h2>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-3">
                    <span className="font-bold text-cyan-800">
                      <Person />
                    </span>
                    {user?.userName}
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <span className="font-bold text-cyan-800">
                      <AlternateEmail />
                    </span>
                    {user?.email}
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <span className="font-bold text-cyan-800">
                      <Event />
                    </span>
                    {new Date(user?.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-3">
              <div>
                {loading ? (
                  <Button type="editDeleteBtn" disabled>
                    <div className="flex items-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="editDeleteBtn">
                    <div className="flex items-center gap-1">
                      <EditOutlined fontSize="small" />
                      <div className="text-[16px]">Edit</div>
                    </div>
                  </Button>
                )}
              </div>

              <div>
                {loading ? (
                  <Button type="editDeleteBtn" btnType="delete" disabled>
                    <div className="flex items-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="editDeleteBtn" btnType="delete">
                    <div className="flex items-center gap-1">
                      <DeleteOutlineOutlined fontSize="small" />
                      <div className="text-[16px]">Delete</div>
                    </div>
                  </Button>
                )}
              </div>
            </div> */}
          </div>

          <div className="my-6 border-t border-gray-500"></div>

          <div className="flex flex-col gap-4 ml-5 sm:ml-0">
            <h2 className="text-xl font-semibold ">Shipping Address</h2>

            {user?.shippingAddress ? (
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      <AccountCircleOutlined />
                    </span>
                    {user?.shippingAddress?.firstName}{" "}
                    {user?.shippingAddress?.lastName}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      <PhoneInTalkOutlined />
                    </span>
                    {user?.shippingAddress?.phone}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      <LocationOnOutlined />
                    </span>
                    {user?.shippingAddress?.address},{" "}
                    {user?.shippingAddress?.city} -{" "}
                    {user?.shippingAddress?.postalCode},{" "}
                    {user?.shippingAddress?.state},{" "}
                    {user?.shippingAddress?.country}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    {loading ? (
                      <Button type="editDeleteBtn" disabled>
                        <div className="flex items-center gap-2">
                          <div>Loading...</div>
                          <CircularLoading />
                        </div>
                      </Button>
                    ) : (
                      <Link to="/edit-shippingAddress">
                        <Button type="editDeleteBtn">
                          <div className="flex items-center gap-1">
                            <EditOutlined fontSize="small" />
                            <div className="text-[16px]">Edit</div>
                          </div>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </>
      )}
    </>
  );
}
