import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserNav from "../User/UserNav";
import EditProfile from "./EditProfile";
import History from "../Util/History";
import RegisterBank from "./RegisterBank";
import Camps from "./Camps";
import Stock from "./Stock";

// Defines a functional component named Bank.
const Bank = (props) => {
  //Imports React and the useContext hook for accessing context.
  //Retrieves the user object from the AuthContext. This contains information about the logged-in user.
  const { user } = useContext(AuthContext);
  //Imports the useParams hook to access URL parameters.
  //Retrieves the handle parameter from the URL. This is used to determine which section of the bank's interface to display.The Bank component shows different parts of a food bank's interface based on the URL.
  //It uses the URL parameter handle to decide which section (profile, stock, donations, requests, camps, or register) to display.
  const { handle } = useParams();
  //here handles are profilr,stock,donations,etc
  //if title "Bank profile " selecyed go to /bank/profile
  const nav = [
    { to: "/bank/profile", icon: "fa-user", title: "Bank Profile" },
    { to: "/bank/stock", icon: "fa-layer-group", title: "Food Stock" },
    {
      to: "/bank/donations",
      icon: "fa-hand-holding-medical",
      title: "Donations",
    },
    { to: "/bank/requests", icon: "fa-clock-rotate-left", title: "Requests" },
    {
      to: "/bank/camps",
      icon: "fa-clock-rotate-left",
      title: "Food Donation Camps",
    },
    { to: "/bank/registerBank", icon: "fa-rotate", title: "Register new Camp" },
  ];
  return (
    <div className="flex w-full h-96">
      <UserNav data={nav} />
      <div className="ml-96 w-full flex justify-center pr-24">
        {handle === "profile" && <EditProfile />}
        {handle === "stock" && <Stock />}
        {/* If handle is "donations", render the History component with user set to "bank" and the current handle.*/}
        {handle === "donations" && <History user="bank" handle={handle} />}
        {handle === "requests" && <History user="bank" handle={handle} />}
        {handle === "camps" && <Camps />}
        {handle === "registerBank" && (
          <RegisterBank todo="register" bank={user} />
        )}
      </div>
    </div>
  );
};

export default Bank;
