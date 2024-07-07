import React, { useState, useEffect } from "react";
import axios from "../Api";
import CampEdit from "./CampEdit";

//adding new camp from a particular bank

const Camps = () => {
  const [data, setData] = useState([]);
  //initializes a state variable data with an empty array []. This state will hold the data fetched from the API.
  const [popup, setPopup] = useState(-1);
  //Initializes another state variable popup with an initial value of -1. This state will control whether a popup window is displayed and which specific item's details are shown in the popup
  // This hook is used to perform side effects in function components. In this case, it runs once (due to the empty dependency array []),
  //right after the component mounts (component created newly).
  useEffect(() => {
    //Sends a GET request to the /camps endpoint. Upon successful response (then block), it updates the data state with the
    //fetched data (res.data). If there's an error (catch block), it alerts the user with a message saying "Something went wrong".
    //The useEffect hook fetches data from the /camps endpoint using Axios. This HTTP request is initiated as soon as the component mounts.
    //Once the data is fetched successfully (then block), it updates the component's state (setData(res.data)) with the retrieved camp data.
    axios
      .get("/camps")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("Something went wrong in Bank camps.js");
      });
  }, []);
  return (
    <div className="mt-5 ml-5">
      <table className="rounded-md text-center">
        <thead>
          <th className="border p-4 px-4">Date</th>
          <th className="border p-4 px-4">Camp Name</th>
          <th className="border p-4 px-4">Address</th>
          <th className="border p-4 px-4">State</th>
          <th className="border p-4 px-4">District</th>
          <th className="border p-4 px-4">Organizer</th>
          <th className="border p-4 px-4">Contact</th>
          <th className="border p-4 px-4">Time</th>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr>
              <td className="border p-3">
                {new Date(e.date).toLocaleDateString()}
              </td>
              <td className="border p-3">{e.name}</td>
              <td className="border p-3">{e.address}</td>
              <td className="border p-3">{e.state}</td>
              <td className="border p-3">{e.district}</td>
              <td className="border p-3">{e.organizer}</td>
              <td className="border p-3">{e.contact}</td>
              <td className="border p-3">
                <large>
                  <code>{e.startTime + "-" + e.endTime}</code>
                </large>
              </td>
              {/*setting popup(i) here i is not -1 means adding popup */}
              <td className="border p-3">
                <span
                  className="text-purple cursor-pointer"
                  onClick={() => setPopup(i)}
                >
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*it is button present in each camp and its props are written in it */}
      <CampEdit popup={popup} setPopup={setPopup} data={data[popup]} />
    </div>
  );
};

export default Camps;
