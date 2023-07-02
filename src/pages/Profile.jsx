import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  PaymentOutlined,
} from "@mui/icons-material";

import { useState } from "react";

import Container from "../components/Container";
import UserDetails from "../components/profile/UserDetails";
import OrderDetails from "../components/profile/OrderDetails";
import ShippingAddress from "../components/profile/ShippingAddress";
import Payment from "../components/profile/Payment";
import Wishlist from "../components/profile/Wishlist";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <div className="flex md:flex-row flex-col justify-between gap-10 my-14">
        <ul className="flex flex-col w-full lg:w-fit text-[18px] bg-zinc-200">
          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-48 border-b border-red-300 cursor-pointer ${
              activeTab === 0 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(0)}
          >
            <AccountCircleOutlined />
            Profile
          </li>

          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 1 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            <Inventory2Outlined />
            Orders
          </li>

          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 2 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            <LocalShippingOutlined />
            Shipping Address
          </li>

          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 3 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            <PaymentOutlined />
            Payment
          </li>

          <li
            className={`flex flex-row gap-5 items-center hover:bg-red-500 hover:text-white py-3 pl-10 pr-24 border-b border-red-300 cursor-pointer ${
              activeTab === 4 ? "bg-red-500 text-white" : ""
            }`}
            onClick={() => handleClick(4)}
          >
            <FavoriteBorderOutlined />
            Wishlist
          </li>
        </ul>

        <div className="w-full md:w-[100%] h-[100%] bg-zinc-200 py-5 px-10 rounded-lg">
          {activeTab === 0 && <UserDetails />}
          {activeTab === 1 && <OrderDetails />}
          {activeTab === 2 && <ShippingAddress />}
          {activeTab === 3 && <Payment />}
          {activeTab === 4 && <Wishlist />}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
