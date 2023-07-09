import Search from "../../components/Search";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

const Header = () => {
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="block md:hidden">
        <Search />
      </div>
    </>
  );
};

export default Header;
