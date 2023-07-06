/* eslint-disable no-unused-vars */
import { CloudUploadOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileAction,
  updateUserAction,
} from "../redux/slices/usersSlice";
import Button from "../components/Button";
import ErrorMsg from "../components/messages/ErrorMsg";
import CircularLoading from "../components/loaders/CircularLoading";
import Container from "./Container";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dispatch
  const dispatch = useDispatch();

  // Get User Profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  // Get the Data from Store
  const {
    profile: { user },
    loading,
    error,
  } = useSelector((state) => state.users);

  // Form Data
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        email: user.email,
      });
    }
  }, [user]);

  // Onchange handler
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  // File Handle Change
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    // Image Validation
    if (newFile?.size > 1000000) {
      setFileError(`${newFile?.name} is too large`);
    } else if (!newFile?.type.startsWith("image/")) {
      setFileError(`${newFile?.name} is not an image`);
    } else {
      setFile(newFile);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...formData,
      // file,
      id,
    };

    dispatch(updateUserAction(updatedUser));

    // Reset Form
    setFormData({
      userName: "",
      email: "",
    });
    setFile(null);
  };

  return (
    <>
      {error && <ErrorMsg message={error.message} />}
      {fileError && <ErrorMsg message={fileError} />}

      <Container>
        <form className="flex flex-wrap mt-14" onSubmit={handleSubmit}>
          <div className="w-full md:w-1/3 px-4">
            <input
              name="userName"
              value={formData.userName}
              onChange={handleOnChange}
              className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
              type="text"
              placeholder="User Name"
            />
          </div>

          <div className="w-full md:w-1/3 px-4">
            <input
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
              type="email"
              placeholder="Enter Your Email"
            />
          </div>

          {/* <div className="flex flex-row items-center gap-5 w-full md:w-1/2 px-4 mb-8">
            <img
              src={file ? URL.createObjectURL(file) : user?.image}
              alt="profilePic"
              className="w-24 h-24object-cover rounded-md"
            />

            <label
              htmlFor="profilePic"
              className="flex flex-row items-center gap-3 text-lg cursor-pointer"
            >
              <div>
                <CloudUploadOutlined fontSize="large" />
              </div>
              <p>Update Image</p>
            </label>

            <input
              id="profilePic"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
              hidden
            />
          </div> */}

          <div className="flex sm:flex-row flex-col sm:gap-10 gap-5 items-center w-full md:w-1/3 px-4">
            {loading ? (
              <Button type="primaryBtn" disabled>
                <div className="flex items-center gap-2">
                  <div>Loading...</div>
                  <CircularLoading />
                </div>
              </Button>
            ) : (
              <Button type="primaryBtn">Update</Button>
            )}
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditProfile;
