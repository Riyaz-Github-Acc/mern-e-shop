import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import ErrorMsg from "./messages/ErrorMsg";
import SuccessMsg from "./messages/SuccessMsg";
import CircularLoading from "./loaders/CircularLoading";

import { createReviewAction } from "../redux/slices/reviewsSlice";

export default function AddReview() {
  // Dispatch
  const dispatch = useDispatch();

  // Get Params
  const { id } = useParams();

  // Navigate
  const navigate = useNavigate();

  //---form data---
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  // onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReviewAction({
        id,
        comment: formData?.comment,
        rating: formData?.rating,
      })
    );

    // Reset Form Data
    setFormData({
      rating: "",
      comment: "",
    });

    // Redirect to product page
    navigate(`/products/${id}`);
  };

  // Get Data from Store
  const { loading, error, isAdded } = useSelector((state) => state?.reviews);

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Thanks for the review" />}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
            Add Your Review
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <select
                  value={formData?.rating}
                  onChange={handleOnChange}
                  name="rating"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 border-2 focus:outline-none focus:ring-gray-500 sm:text-sm"
                >
                  {/* Review Rating */}
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 </option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="comment"
                    value={formData.comment}
                    onChange={handleOnChange}
                    className="block w-full rounded-md p-2 border-gray-300 border shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <Button type="fullLengthBtn" disabled>
                    <div className="flex items-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="fullLengthBtn">Add New Review</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
