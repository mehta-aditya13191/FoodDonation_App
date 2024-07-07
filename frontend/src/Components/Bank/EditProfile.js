import React, { useState, useEffect, useContext } from "react";
import data from "../../assets/data.json";
import { useParams } from "react-router-dom";
import axios from "../Api";
import AuthContext from "../context/AuthContext";
import mapboxgl from "mapbox-gl";

const EditProfile = () => {
  const { handle } = useParams();
  const { getLoggedIn, user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(0);
  const [district, setDistrict] = useState(0);
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(true);
  const [hospital, setHospital] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("Private");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    setName(user.name);
    setHospital(user.hospital);
    setContactPerson(user.contactPerson);
    setCategory(user.category);
    setWebsite(user.website);
    setMail(user.email);
    setPhone(user.phone);
    // data.states.map((e, i) => {
    //     if (e.state === user.state) {
    //         setState(i);
    //         setDistrict(e.districts.indexOf(user.district));
    //     }
    // });

    data.states.forEach((e, i) => {
      if (e.state === user.state) {
        setState(i);
        setDistrict(e.districts.indexOf(user.district));
      }
    });
    setPassword("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
    setAddress(user.address);
    setLatitude(user.latitude);
    setLongitude(user.longitude);
  }, []);

  //Ensures the map and marker reflect the latest coordinates whenever the latitude or longitude changes
  useEffect(() => {
    //Checks if longitude is equal to 0. If true, it immediately returns, preventing the execution of the rest of the code inside the effect function.
    if (longitude === 0) return;
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 10.7,
    });
    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  }, [latitude, longitude]); //Specifies [latitude, longitude] as the dependency array for the useEffect. This means the effect will run whenever latitude or longitude changes.

  const update = async (e) => {
    //Creates a formData object that collects values from form inputs
    const formData = {
      name: name,
      email: mail,
      phone: phone,
      state: data.states[state].state,
      district: data.states[state].districts[district],
      address: address,
      latitude: latitude,
      longitude: longitude,
      hospital: hospital,
      contactPerson: contactPerson,
      website: website,
      category: category,
    };

    //axios.put to send an HTTP PUT request to the server at the /bank endpoint with the formData object.
    await axios
      .put(`/bank`, formData) //If the request is successful (.then):
      //Toggles the edit state variable using setEdit(!edit).
      //Calls the getLoggedIn function to refresh the authentication status or user data.
      //Displays a success alert saying "Blood Bank updated successfully".
      .then(
        async (response) => {
          setEdit(!edit);
          //By calling getLoggedIn, any changes made to the blood bank details are immediately fetched and displayed in the application, keeping the user interface in sync with the latest data
          // here edit becomes false after this database data gets updated and edit is made true(line 45 of CampsCheck resolves put request and at last line after updation makes it true to be aditable again)
          await getLoggedIn();
          alert("Food Bank updated successfully");
        },
        (error) => {
          alert("Something went wrong in Bank Editprofile.js");
        }
      );
  };
  //updating longitude and latitude if it got changes while updation
  const fetchGeo = async () => {
    //if no change in latitude and longitude no need to do anything
    if (latitude === user.latitude && longitude === user.longitude) return;
    await navigator.geolocation.getCurrentPosition(
      (p) => {
        //on success It updates the state variables latitude and longitude with the coordinates obtained from the p.coords object.
        setLatitude(p.coords.latitude);
        setLongitude(p.coords.longitude);
      },
      () => {
        //on failure, this callback is executed.
        //t resets the state variables latitude and longitude to the user's saved values.
        alert("Please allow location access");
        setLatitude(user.latitude);
        setLongitude(user.longitude);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
        //Prevents the use of cached location data.
      }
    );
  };

  //The fetchGeo function ensures that the current geographical coordinates of the user are fetched and updated in the state.
  // It handles both success and error scenarios and ensures that the coordinates are only fetched if they have changed
  //from the user's saved values. If the user denies location access, it alerts them and resets the coordinates to the saved values.

  return (
    <div>
      <section className="flex justify-center items-center">
        <form
          className="space-y-2"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <p className=""></p>
          <table className="w-full" cellPadding={15}>
            <tr>
              <td>
                <label className="font-semibold  leading-8">
                  Food Bank Name:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  required
                  disabled={edit}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </td>
              <td>
                <label className="font-semibold  leading-8">
                  Parent FoodBank Name:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  required
                  disabled={edit}
                  value={hospital}
                  onChange={(e) => {
                    setHospital(e.target.value);
                  }}
                />
              </td>
              <td>
                {" "}
                <label className="font-semibold  leading-8">
                  Contact Person:
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  value={contactPerson}
                  disabled={edit}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="category" className="font-semibold  leading-8">
                  Category:<font color="red">*</font>
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  disabled={edit}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  <option value="Private">Private</option>
                  <option value="Govt.">Govt.</option>
                  <option value="Red Cross">Red Cross</option>
                </select>
              </td>

              <td>
                <label className="font-semibold leading-8">
                  Mobile:<font color="red">*</font>
                </label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="number"
                  placeholder="Enter your mobile"
                  required
                  disabled={edit}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold  leading-8">Password:</label>
                <font color="red">*</font>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="password"
                  placeholder="Enter your password"
                  required
                  disabled
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td>
                <label className="font-semibold  leading-8">Email:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="email"
                  placeholder="Enter your email"
                  disabled={edit}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </td>
              <td>
                <label className="font-semibold  leading-8">Website:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  value={website}
                  disabled={edit}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </td>
              <td className="absolute">
                <button
                  type="button"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                  className="w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom"
                >
                  {edit ? "Edit" : "Cancel"}
                </button>
                <br />
                <button
                  type="submit"
                  className={`w-44 mt-8 px-7 py-2 bg-blood text-white-900 hover:bg-gray-darkest rounded-full text-lg font-bold align-bottom ${
                    edit && "hidden"
                  }`}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <label for="state" className="font-semibold  leading-8">
                  State:<font color="red">*</font>
                </label>
                <select
                  name="state"
                  id="state"
                  disabled={edit}
                  onChange={(e) => {
                    setState(e.target.value);
                    setDistrict(0);
                  }}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states.map((e, i) => (
                    <option value={i} selected={state === i}>
                      {e.state}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <label for="district" className="font-semibold  leading-8">
                  District:<font color="red">*</font>
                </label>
                <select
                  name="district"
                  id="district"
                  disabled={edit}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-3 text-md border border-silver rounded"
                >
                  {data.states[state].districts.map((e, i) => (
                    <option value={i} selected={district === i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <label className="font-semibold  leading-8">Address:</label>
                <input
                  className="w-full p-3 text-md border border-silver rounded"
                  type="text"
                  placeholder="Enter your address"
                  disabled={edit}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
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
                      disabled={edit}
                      className="bg-purple text-center text-white-900 rounded-lg mt-4 px-4 py-2"
                      onClick={() => fetchGeo()}
                    >
                      Update Geocode
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
