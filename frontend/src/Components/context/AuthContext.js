//This code snippet defines an AuthContext and its provider component (AuthContextProvider) using React's context API.
import axios from "axios"; //axios: A popular library for making HTTP requests from the browser.
import React, { createContext, useEffect, useState } from "react"; //React hooks and functions for managing state and effects.

//Creates a new context object. This context will be used to share the state (loggedIn, user, getLoggedIn function) across React components.
const AuthContext = createContext(); //this is a functional component that serves as the provider for the AuthContext.

function AuthContextProvider(props) {
  //Initializes the loggedIn state variable using the useState hook. Initially set to undefined.
  const [loggedIn, setLoggedIn] = useState(undefined);
  //Initializes the user state variable as an empty array using the useState hook.
  const [user, setUser] = useState([]);

  async function getLoggedIn() {
    //This asynchronous function makes an HTTP GET request to http://localhost:3177/auth/loggedIn using axios.
    const loggedInRes = await axios.get("http://localhost:3177/auth/loggedIn", {
      withCredentials: true,
    }); //The request is made with credentials ({ withCredentials: true }), which allows sending cookies for authentication.
    //Upon receiving a response (loggedInRes), it updates the loggedIn and user states based on the data received from the server.
    setLoggedIn(loggedInRes.data.auth);
    setUser(loggedInRes.data.user);
  }
  //Runs the getLoggedIn function when the component (AuthContextProvider) mounts for the first time ([] dependency array ensures it runs only once).
  //This ensures that the initial authentication state (loggedIn and user) is fetched and set correctly when the component is first rendered.
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    //Returns the AuthContext.Provider component, which wraps around props.children.
    //Provides the context value ({ loggedIn, user, getLoggedIn }) to all descendant components that are consumers of AuthContext.
    <AuthContext.Provider value={{ loggedIn, user, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
//Exports the AuthContext object itself.
//Exports the AuthContextProvider component so that it can be imported and used in other parts of the application.
export default AuthContext;
export { AuthContextProvider };
