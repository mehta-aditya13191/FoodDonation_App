import React, { useState, useEffect, useContext } from "react";
import logo from "../../assets/logo.jpg";
import { Outlet, Link } from "react-router-dom";
import DropDown from "../Util/DropDown";
import axios from "../Api";
import AuthContext from "../context/AuthContext";

const Navbar = (props) => {
  const s1 =
    "bg-white-900 drop-shadow-lg mx-3 px-7 py-2 rounded-md text-base font-medium hover:drop-shadow-xl hover:px-10 dark:hover:bg-midnight dark:hover:drop-shadow-dark-lg";
  const [theme, setTheme] = useState(0); //set theme

  //useContext(AuthContext) accesses the current value of AuthContext. This value is an object containing loggedIn, user, and getLoggedIn because that's what the AuthContext.Provider is providing.
  //specifically pulls out the getLoggedIn function from the context and makes it available in our component as a local variable named getLoggedIn.
  const { getLoggedIn } = useContext(AuthContext);

  //const doc = document.documentElement.classList; gets the list of CSS classes applied to the <html> element of the current document and assigns it to the variable doc.

  const doc = document.documentElement.classList;

  useEffect((e) => {
    //This line tries to get the value of the "theme" key from localStorage. If it doesn't exist, t will be null.
    let t = localStorage.getItem("theme");
    //If t is null (which means there is no "theme" item in localStorage), set "theme" to 0 in localStorage.
    if (!t) {
      localStorage.setItem("theme", 0);
    }
    //After potentially setting the "theme" to 0, retrieve the "theme" value again from localStorage. This ensures that t now has a valid value (0 or 1).
    t = localStorage.getItem("theme");
    //Update the component state with the theme value (t). This will trigger a re-render if setTheme is a state setter function from useState.
    setTheme(t);
    //f t equals 1, add the "dark" class to the document's <html> element. This likely toggles dark mode styles.
    if (t === 1) {
      doc.add("dark");
    }
    //the empty dependency array [] means that this effect runs only once, when the component mounts, and does not run on subsequent renders.
  }, []);
  return (
    <>
      <nav className="p-3 bg-white-900 sticky top-0 z-10 dark:bg-gray-bg">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center justify-between">
              <img
                className="h-14 w-auto ml-6"
                src={logo}
                draggable={false}
                alt="Your Company"
                style={{ borderRadius: "50px" }}
              />
              <div
                className="text-2xl font-bold ml-2 text"
                style={{ color: "green" }}
              >
                FoodDonation
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <>
              <DropDown
                title="About Us"
                children={["Home", "About Annadata", "Contact Us"]}
                links={["/", "/about", "/contactUs"]}
              ></DropDown>
              {props.logIn ? (
                <>
                  <Link to={`/${props.user}/profile`} className={s1}>
                    <i className="fa-solid fa-user"></i>
                  </Link>
                  <Link
                    to="/"
                    onClick={async () => {
                      await axios
                        .get("/auth/logout", { withCredentials: true })
                        .then((r) => {});
                      await getLoggedIn();
                    }}
                    className={s1}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <DropDown
                    title="Looking For Food"
                    children={["User Login/Register", "Food Bank Directory"]}
                    // links={["/register/consumer", "/bloodDirect"]}
                    links={["/register/patient", "/bloodDirect"]}
                  ></DropDown>
                  <DropDown
                    title="Want To Donate Food"
                    children={[
                      " Food Donor Login/Register",
                      "Food Donation Camps",
                      "About Food Donation",
                    ]}
                    links={[
                      "/register/donor",
                      "/bloodCamps",
                      "/aboutBloodDonation",
                    ]}
                  ></DropDown>
                  <DropDown
                    // title="Blood Bank Login"
                    title="Food Bank Login"
                    // children={["Login", "Add Your Bloodbank"]}
                    children={["Login", "Add Your Foodbank"]}
                    links={["/login/bank", "/register/bank"]}
                  ></DropDown>
                </>
              )}
              <button
                //Setting light/dark mode here on clicking button
                className="mx-2 px-3 py-2 rounded-full bg-green-500 hover:shadow-lg"
                onClick={() => {
                  //setItem sets value of theme
                  localStorage.setItem(
                    "theme",
                    localStorage.getItem("theme") == 1 ? 0 : 1 // localStorage.getItem("theme"): Retrieves the current theme value from localStorage. and if it is 1, set it to 0 and if it is 0, set it to 1
                  );
                  //This line updates the state with the new theme value from localStorage. This is important to trigger a re-render if setTheme is a state setter function from useState.
                  setTheme(localStorage.getItem("theme"));
                  //If theme == 0, it adds the "dark" class to the document's <html> element. This will apply dark mode styles.
                  //Otherwise, it removes the "dark" class from the <html> element, reverting to light mode.
                  if (theme == 0) {
                    doc.add("dark");
                  } else {
                    doc.remove("dark");
                  }
                }}
              >
                <i
                  className={`dark:text-white-900 fa-solid fa-lg fa-${
                    theme == 0 ? "sun" : "moon"
                  }`}
                ></i>
              </button>
            </>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
