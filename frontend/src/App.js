// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useContext } from "react";
// import AuthContext from "./Components/context/AuthContext";
// import Home from "./Components/Main/Home";
// import Navbar from "./Components/Main/Navbar";
// import About from "./Components/Main/About";
// import Camps from "./Components/Main/Camps";
// import Contact from "./Components/Main/Contact";
// import Banks from "./Components/Main/Banks";
// import AboutDonation from "./Components/Main/AboutDonation";
// import Auth from "./Components/Auth/Auth";
// import User from "./Components/User/User";
// import Bank from "./Components/Bank/Bank";
// import "./App.css";

// export default function App() {
//   // eslint-disable-next-line
//   {
//     /*Context in React allows you to pass data through the component tree without having to pass props down manually at every level.

// 		useContext(AuthContext) accesses the current context value provided by AuthContext.
//       It extracts two properties from this context value: loggedIn and user.
//       These two properties are now available as variables in the component.
//    eg:-
// 	  const authContext= {
//   loggedIn: true, // or false, depending on the user's authentication status
//   user: {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     hospital: false, // or true if the user is associated with a hospital
//     latitude: 40.7128, // Example latitude for location-based features
//     longitude: -74.0060 // Example longitude for location-based features
//   }
// };

//    */
//   }

//   const { loggedIn, user } = useContext(AuthContext);
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/*First, it checks if the user is logged in (loggedIn is true).
//             Second, it checks if the user object has a latitude property (which might indicate that the user is a bank user, as bank users are likely to have a location specified).

// 			If both conditions are true (loggedIn is true and user.latitude is truthy), the value of the user prop will be "bank".
//             If either condition is false, the value of the user prop will be "user". it have different navbar for bank and user so it is needed*/}
//           <Route
//             path="/"
//             element={
//               <Navbar
//                 logIn={loggedIn}
//                 user={loggedIn && user.latitude ? "bank" : "user"}
//               />
//             }
//           >
//             <Route index element={<Home />} />
//             {/* When the user is not logged in:
//            Any dynamicroute matching /:type/:handle (e.g., /login/1234) will render the Auth component. */}
//             {!loggedIn && (
//               <>
//                 <Route
//                   path="/:type/:handle"
//                   element={<Auth logIn={loggedIn} />}
//                 />
//               </>
//             )}
//             {/*When the user is logged in:
//           If the user is associated with a hospital (user.hospital is true)
// 		   means it is bloodbank login, dynamic routes matching /bank/:handle? will render the Bank component.
//             If the user is a regular user (user.hospital is false) means it is normal user, dynamic routes matching /user/:handle? will render the User component. */}
//             {loggedIn &&
//               (user.hospital ? (
//                 <Route
//                   path="/bank/:handle?"
//                   element={
//                     <div>
//                       <Bank />
//                     </div>
//                   }
//                 />
//               ) : (
//                 <Route
//                   path="/user/:handle?"
//                   element={
//                     <div>
//                       <User />
//                     </div>
//                   }
//                 />
//               ))}
//             <Route path="about" element={<About />} />
//             <Route path="aboutBloodDonation" element={<AboutDonation />} />
//             <Route path="bloodDirect" element={<Banks />} />
//             <Route path="bloodCamps" element={<Camps />} />
//             <Route path="contactUs" element={<Contact />} />
//             <Route path="*" element={<div>404</div>} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./Components/context/AuthContext";
import Home from "./Components/Main/Home";
import Navbar from "./Components/Main/Navbar";
import About from "./Components/Main/About";
import Camps from "./Components/Main/Camps";
import Contact from "./Components/Main/Contact";
import Banks from "./Components/Main/Banks";
import AboutDonation from "./Components/Main/AboutDonation";
import Auth from "./Components/Auth/Auth";
import User from "./Components/User/User";
import Bank from "./Components/Bank/Bank";
import "./App.css";

export default function App() {
  const { loggedIn, user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar
                logIn={loggedIn}
                user={loggedIn && user.latitude ? "bank" : "user"}
              />
            }
          >
            <Route index element={<Home />} />
            {!loggedIn && (
              <>
                <Route
                  path="/:type/:handle"
                  element={<Auth logIn={loggedIn} />}
                />
              </>
            )}
            {loggedIn &&
              (user.hospital ? (
                <Route
                  path="/bank/:handle?"
                  element={
                    <div>
                      <Bank />
                    </div>
                  }
                />
              ) : (
                <Route
                  path="/user/:handle?"
                  element={
                    <div>
                      <User />
                    </div>
                  }
                />
              ))}
            <Route path="about" element={<About />} />
            <Route path="aboutBloodDonation" element={<AboutDonation />} />
            <Route path="bloodDirect" element={<Banks />} />
            <Route path="bloodCamps" element={<Camps />} />
            <Route path="contactUs" element={<Contact />} />
            <Route path="*" element={<div>404</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
