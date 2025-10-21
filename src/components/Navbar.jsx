import { Link, NavLink } from "react-router";
import logo from "../assets/firebase-logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./Mylink";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
// import MyContainer from "./MyContainer";
// import MyLink from "./MyLink";
// import MyLink from "./MyLink";

const Navbar = () => {
  const { user, setUser, signOutUserFunc, loading} = useContext(AuthContext);
  
  // SignOut firebase function
  const handleSignOut = () => {
    signOutUserFunc()
      .then(() => {
        toast("Sign-out successful.");
        // jokhon sign out hobe tokhon ami chai login tahole setuser(null) kore dile false hoye login input gulo dekhabe
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex justify-between items-center">
        <figure>
          <img src={logo} className="w-[55px]" />
        </figure>
        <ul className="flex items-center gap-2">
          <li>
            <MyLink to={"/"} className="">
              Home
            </MyLink>
          </li>

          <li>
            <MyLink to={"/about-us"} className="">
              About us
            </MyLink>
          </li>
          {user && <li>
            <MyLink to={"/profile"} className="">
              Profile
            </MyLink>
          </li>}
        </ul>

        {loading? <ClockLoader color="#e74c3c"/>: user ? (
          <div className="text-center space-y-3">
            <button
              className="cursor-pointer"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
            >
              <img
              className="h-15 w-15 rounded-full mx-auto"
              src={user?.photoURL || "https://via.photonotshow"}
              alt=""
            />
            </button>

            <div
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
              }
            >
              <h2 className="text-xl font-semibold">{user?.displayName}</h2>
            <p className="text-white/80">{user?.email}</p>
            <button onClick={handleSignOut} className="my-btn">
              Sign Out
            </button>
            </div>
          </div>
        ) : (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            <Link to={"/signin"}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
