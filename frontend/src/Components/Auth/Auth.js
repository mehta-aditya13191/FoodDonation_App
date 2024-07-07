import React, { useState, useEffect, useContext } from "react";
//Importing React and specific hooks (useState for state management,
// useEffect for side effects, useContext for accessing context).
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//Importing components and hooks from react-router-dom for routing (Outlet for nested routes,
// useNavigate for navigation, useParams for URL parameters).
import data from "../../assets/data.json"; //Importing JSON data from a local file.
import AuthContext from "../context/AuthContext"; //Importing the custom authentication context.
import axios from "../Api"; //Importing an Axios instance for making HTTP requests.
import mapboxgl from "mapbox-gl"; //Importing the Mapbox GL library for maps.
import "./map.css"; //Importing CSS for map styling.

const Auth = (props) => {
  axios.defaults.withCredentials = true;

  const { type, handle } = useParams();
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("Private");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [mail, setMail] = useState("");
  const [bankmail, setBankMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [food, setFood] = useState(0);
  const [auth, setAuth] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  //Using useContext to access the AuthContext.
  //Destructuring getLoggedIn from the context. getLoggedIn is likely a function provided by AuthContext to check or update the logged-in status of the user.

  const { getLoggedIn } = useContext(AuthContext);

  const foodGroups = [
    "Non-Perishable Food",
    "Perishable Food",
    "Prepared Food",
    "Baby Food and Formula",
    "Snacks and Beverages",
  ];
  //Here, navigate becomes a function you can call to redirect the user to a different route.
  //useNavigate() is a hook provided by react-router-dom.Navigate programmatically to different pages in your application.
  const navigate = useNavigate();
  const s1 =
    "mx-2 px-9 py-2 font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";
  //If the type parameter is not "register" (could be something like "login" or "forgot-password"), setAuth(1) will be called, setting auth to 1.
  //useEffect is a React Hook that runs side effects after rendering.
  //In this case, it runs whenever type changes (which is a parameter extracted from the URL using useParams() earlier in your component).
  //This ensures that the side effect (setAuth(...)) is applied whenever type changes.
  useEffect(() => {
    setAuth(type === "register" ? 0 : 1);
  }, [type]);
  //useEffect is a React Hook used for performing side effects in functional components.
  //It runs after the component mounts and whenever any of its dependencies change (latitude or longitude in this case).

  useEffect(() => {
    //if longitude is 0. If it is, the function returns early and does not proceed with creating the map.
    //This prevents creating a map with an invalid or default location
    if (longitude === 0) return;
    //Sets the Mapbox access token required to use Mapbox services. This token is essential for authenticating and authorizing access to Mapbox APIs.
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";

    //container: Specifies the ID of the HTML element ('map') where the map should be rendered.
    //style: Specifies the map style using a Mapbox style URL ('mapbox://styles/mapbox/streets-v12').center: Sets the initial center of the map using [longitude, latitude].
    //zoom: Sets the initial zoom level of the map (here, 10.7).
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 10.7,
    });
    //Creates a new Mapbox marker and sets its longitude (longitude) and latitude (latitude) using setLngLat.
    //Adds the marker to the map instance (map) created earlier using addTo.
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }, [latitude, longitude]);

  const signUp = async (e) => {
    //you can control what happens after a user submits a form without letting the browser refresh the page or navigate to a new one automatically
    //allowing for actions like validation or sending data to a server asynchronously without reloading the page.
    e.preventDefault();
    var formData;
    if (handle === "bank") {
      formData = {
        //These are variables holding various details about the bank
        name: name,
        hospital: hospital,
        contactPerson: contactPerson,
        category: category,
        website: website,
        phone: phone,
        email: bankmail,
        password: password,
        state: data.states[state].state,
        district: data.states[state].districts[district],
        address: address,
        latitude: latitude,
        longitude: longitude,
        // This property is an object with keys representing different categories of stock and values initialized to 0
        stock: {
          "Non-Perishable Food": 0,
          "Perishable Food": 0,
          "Prepared Food": 0,
          "Baby Food and Formula": 0,
          "Snacks and Beverages": 0,
        },
      };
    } else {
      formData = {
        name: name,
        age: age,
        gender: gender,
        foodGroup: foodGroups[food],
        email: mail,
        password: password,
        phone: phone,
        state: data.states[state].state,
        district: data.states[state].districts[district],
        address: address,
      };
    }

    // sends a POST request to the server./auth/${handle}: The URL endpoint for authentication, dynamically determined by the value of handle.
    //The data object containing form data to be sent to the server.
    //Ensures that cookies and other credentials are included in the request, useful for maintaining a user session.
    //async (res) => { ... }: Code to handle the successful response from the server.
    //rest error manage

    await axios
      .post(`/auth/${handle}`, formData, { withCredentials: true })
      .then(
        async (res) => {},
        (err) => alert(err.response.data.errorMessage)
      );
    //await getLoggedIn();: This function call presumably updates the user's logged-in status or retrieves updated user information after the POST request completes. It's awaited to ensure it finishes before proceeding to the next step.
    await getLoggedIn();
    //navigate(/${handle == "bank" ? handle : "user"}/profile): Redirects the user to their profile page after the authentication and login process completes depending upon it is bank or user
    navigate(`/${handle === "bank" ? handle : "user"}/profile`);
  };

  const logIn = async (e) => {
    e.preventDefault();
    //login is asynchronous operations as server and client is involved in it so try catch used to save from crash due tonetwork issue
    //signup is synchronous as client works only on info and error can be displayed to it at client side only,no need of try and catch
    try {
      const formData = {
        phone: phone,
        password: password,
      };
      await axios
        .post(`/auth/login/${handle}`, formData, { withCredentials: true })
        .then(async (res) => {});
      await getLoggedIn();

      navigate(`/${handle === "bank" ? handle : "user"}/profile`);
    } catch (err) {
      alert(err.response.data.errorMessage);
    }
  };

  const fetchGeo = async () => {
    // Using navigator.geolocation to get the current position
    await navigator.geolocation.getCurrentPosition(
      // Success callback function when position is obtained
      (position) => {
        // Set latitude and longitude using position data
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      // Error callback function when position retrieval fails
      () => {
        // Alert the user to allow location access
        alert("Please allow location access");
        // Set latitude and longitude to 0 as fallback values
        setLatitude(0);
        setLongitude(0);
      },
      // Options for geolocation request
      {
        //When set to true, the browser attempts to provide the most accurate location information possible using methods such as GPS.
        enableHighAccuracy: true, // Prefer high accuracy location results
        timeout: 5000, // Timeout after 5 seconds if location request takes too long
        maximumAge: 0, // Don't use cached location data
      }
    );
  };

  return (
    <div className="dark:bg-gray-bg">
      <section className="flex justify-center items-center">
        {/*Dynamically sets the width of the element based on the auth variable:
                   If auth is 0, sets the width to 10/12 of its container.
                   Otherwise, sets the width to 4/12 of its container */}
        <div
          className={`bg-white-900 rounded-xl p-6 w-${
            auth === 0 ? "10/12" : "4/12"
          } mt-5 drop-shadow-2xl pb-10 dark:drop-shadow-dark-2xl`}
        >
          <form
            className="space-y-7"
            action=""
            onSubmit={auth === 0 ? signUp : logIn}
          >
            <fieldset className="border border-solid border-gray-300 px-12 py-5">
              {/*&nbsp:Represents a non-breaking space in HTML, used here for spacing around the text. */}
              <legend
                className={`text-2xl font-bold mb-1 ${
                  auth === 1 && "text-center"
                }`}
              >
                &nbsp;
                {handle === "bank"
                  ? auth === 1
                    ? "Food Bank Log In"
                    : "Add Your Foodbank"
                  : handle === "donor"
                  ? "Donor"
                  : "Patient"}{" "}
                {handle !== "bank" && (auth === 0 ? "Sign Up" : "Log In")}&nbsp;
              </legend>
              <legend align="right">
                <input
                  type="button"
                  formAction=""
                  onClick={() => {
                    navigate(`/${auth === 0 ? "login" : "register"}/${handle}`);
                    setAuth(auth === 0 ? 1 : 0);
                  }}
                  className={s1}
                  value={auth !== 0 ? "Sign Up" : "Log In"}
                />
              </legend>
              <p></p>
              {auth === 0 ? (
                <>
                  <fieldset className="border border-solid border-gray-300 px-7 py-5 pb-7">
                    <legend className="text-2xl font-bold">
                      &nbsp;{handle === "bank" ? "Food Bank" : "User"}{" "}
                      Details&nbsp;
                    </legend>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="font-semibold leading-8">
                          {handle === "bank" && "Food Bank "}Name:
                          <font color="red">*</font>
                        </label>
                        <input
                          className="w-full p-3 text-md border border-silver rounded"
                          type="text"
                          //When handle is not equal to "bank", the placeholder text "Enter your full name" will be displayed.If handle is "bank", the placeholder attribute will not be set (or set to undefined), and therefore no placeholder text will appear.

                          placeholder={
                            handle !== "bank" && "Enter your full name"
                          }
                          required
                          onChange={(e) => setName(e.target.value)}
                          //setting value of name from input
                        />
                      </div>
                      {handle === "bank" ? (
                        <>
                          <div>
                            <label className="font-semibold leading-8">
                              Parent FoodBank Name:<font color="red">*</font>
                            </label>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="text"
                              required
                              onChange={(e) => setHospital(e.target.value)}
                              ś
                            />
                          </div>
                          <div>
                            <label className="font-semibold  leading-8">
                              Contact Person:
                            </label>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="text"
                              onChange={(e) => setContactPerson(e.target.value)}
                            />
                          </div>
                          <div>
                            <label
                              for="category"
                              className="font-semibold  leading-8"
                            >
                              Category:<font color="red">*</font>
                            </label>
                            <select
                              name="category"
                              id="category"
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full p-3 text-md border border-silver rounded"
                            >
                              <option value="Private">Private</option>
                              <option value="Govt.">Govt.</option>
                              <option value="Red Cross">Red Cross</option>
                            </select>
                          </div>
                          <div>
                            <label className="font-semibold  leading-8">
                              Website:
                            </label>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="text"
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {handle !== "bank" && (
                        <>
                          <div>
                            <label className="font-semibold  leading-8">
                              Age:<font color="red">*</font>
                            </label>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="number"
                              placeholder="Enter your age"
                              required
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                          <div>
                            <label
                              for="gender"
                              className="font-semibold  leading-8"
                            >
                              Gender:<font color="red">*</font>
                            </label>
                            <select
                              name="gender"
                              id="gender"
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full p-3 text-md border border-silver rounded"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div>
                            <label
                              for="food"
                              className="font-semibold  leading-8"
                            >
                              Food Group:<font color="red">*</font>
                            </label>
                            <select
                              name="food"
                              id="state"
                              onChange={(e) => setFood(e.target.value)}
                              className="w-full p-3 text-md border border-silver rounded"
                            >
                              {foodGroups.map((e, i) => (
                                <option value={i}>{e}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="font-semibold  leading-8">
                              Email:
                            </label>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="email"
                              placeholder="Enter your email"
                              onChange={(e) => setMail(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      {/*using mobile  when login and username when signup*/}
                      <div>
                        <label className="font-semibold  leading-8">
                          {auth === 0 ? "Mobile:" : "Username:"}
                          <font color="red">*</font>
                        </label>
                        <input
                          // for bank getting bank mail as it is only for bank so up handle==bank is added in condition
                          className="w-full p-3 text-md border border-silver rounded"
                          type="number"
                          placeholder={handle !== "bank" && "Enter your mobile"}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      {handle === "bank" && (
                        <div>
                          <label className="font-semibold  leading-8">
                            Email:
                          </label>
                          <font color="red">*</font>
                          <input
                            className="w-full p-3 text-md border border-silver rounded"
                            type="email"
                            required
                            onChange={(e) => setBankMail(e.target.value)}
                          />
                        </div>
                      )}
                      <div>
                        <label className="font-semibold  leading-8">
                          Password:
                        </label>
                        <font color="red">*</font>
                        <input
                          className="w-full p-3 text-md border border-silver rounded"
                          type="password"
                          placeholder={
                            handle !== "bank" && "Enter your password"
                          }
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <br />
                  <fieldset className="border border-solid border-gray-300 px-7 py-5 pb-7">
                    <legend className="text-2xl font-bold">
                      {/*adding "Food Bank" if handle equals "bank".to address else keep address as it iss */}
                      &nbsp;{handle === "bank" && "Food Bank "}Address&nbsp;
                    </legend>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label for="state" className="font-semibold  leading-8">
                          State:<font color="red">*</font>
                        </label>
                        <select
                          name="state"
                          id="state"
                          onChange={(e) => {
                            setState(e.target.value);
                            setDistrict(0);
                          }}
                          className="w-full p-3 text-md border border-silver rounded"
                        >
                          {data.states.map((e, i) => (
                            <option value={i}>{e.state}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          for="district"
                          className="font-semibold  leading-8"
                        >
                          District:<font color="red">*</font>
                        </label>
                        <select
                          name="district"
                          id="district"
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full p-3 text-md border border-silver rounded"
                        >
                          {data.states[state].districts.map((e, i) => (
                            <option value={i}>{e}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="font-semibold  leading-8">
                          Address:<font color="red">*</font>
                        </label>
                        <input
                          className="w-full p-3 text-md border border-silver rounded"
                          type="text"
                          placeholder="Enter your complete address"
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {handle === "bank" && (
                      <>
                        <br />
                        <div>
                          <label className="font-semibold leading-7">
                            Location:<font color="red">*</font>
                          </label>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gap: "1rem",
                          }}
                        >
                          <div
                            className="w-full"
                            style={{ gridColumn: "2/4", gridRow: "1/3" }}
                          >
                            <div id="map" className="w-full h-[200px]"></div>
                          </div>
                          <div style={{ gridColumn: "1", gridRow: "1/2" }}>
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="number"
                              step="0.01"
                              placeholder="Latitude"
                              disabled
                              value={latitude}
                              onChange={(e) => setLatitude(e.target.value)}
                              required
                            />
                            <br />
                            <br />
                            <input
                              className="w-full p-3 text-md border border-silver rounded"
                              type="number"
                              step="0.01"
                              placeholder="Longitude"
                              disabled
                              value={longitude}
                              onChange={(e) => setLongitude(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="bg-purple text-center text-white-900 rounded-lg mt-4 px-4 py-2"
                              onClick={() => fetchGeo()}
                            >
                              Fetch Geocode
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </fieldset>
                </>
              ) : (
                <>
                  <div>
                    <label className="font-semibold  leading-8">
                      Username:<font color="red">*</font>
                    </label>
                    <input
                      className="w-full p-3 text-md border border-silver rounded"
                      type="number"
                      placeholder="Enter your mobile"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="font-semibold  leading-8">
                      Password:
                    </label>
                    <font color="red">*</font>
                    <input
                      className="w-full p-3 text-md border border-silver rounded"
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              <br />
              <center>
                <input
                  type="submit"
                  className={s1 + (auth === 0 && " w-4/12")}
                  disabled={handle === "bank" && auth === 0 && longitude === 0}
                  value={auth === 0 ? "Sign Up" : "Log In"}
                />
              </center>
            </fieldset>
          </form>
        </div>
      </section>
      <br />
      <br />
      <br />
      <Outlet />
    </div>
  );
};

export default Auth;
