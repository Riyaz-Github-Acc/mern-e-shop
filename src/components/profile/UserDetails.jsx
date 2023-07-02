import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfileAction } from "../../redux/slices/usersSlice";
import SpinLoading from "../loaders/SpinLoading";
import Button from "../Button";
import CircularLoading from "../loaders/CircularLoading";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";

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

  console.log(user);

  return (
    <>
      {loading ? (
        <SpinLoading />
      ) : error ? (
        "Something went wrong!"
      ) : (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-8">
              <div className="w-48 h-[100%]">
                <img
                  src={user?.image}
                  alt="profile-image"
                  className="w-[100%] h-[100%] rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold mb-2">Basic Details</h2>
                <div>
                  <span className="font-medium">User Name:</span>{" "}
                  {user?.userName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
