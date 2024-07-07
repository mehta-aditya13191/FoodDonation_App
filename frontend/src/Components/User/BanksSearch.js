import React, { useState, useEffect } from "react";
import axios from "../Api";
import mapboxgl from "mapbox-gl";
import Popup from "../Util/Popup";

//selecting foodbank to donate blood by the user .There can be more then one blood banks available at its location,the user can select any one
const BanksSearch = (props) => {
  const [popup, setPopup] = useState(-1);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    axios.post("/bank/user", props, { withCredentials: true }).then(
      async (res) => {
        setData(res.data);
      },
      (error) => {
        setData([]);
      }
    );
  }, [props.state, props.district]);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiY29yb2JvcmkiLCJhIjoiY2s3Y3FyaWx0MDIwbTNpbnc4emxkdndrbiJ9.9KeSiPVeMK0rWvJmTE0lVA";

  return (
    <div className="mx-2 mt-3">
      <table className="border w-full text-center">
        <thead>
          <tr>
            <th className="border">Food Bank</th>
            <th className="border">Parent Organisation</th>
            <th className="border">Category</th>
            <th className="border">Address</th>
          </tr>
        </thead>
        <tbody className="p-3">
          {data.length ? (
            data.map((e, i) => (
              <tr
                key={i}
                className="hover:bg-red hover:text-white-900 p-3 cursor-pointer"
                //onClick handler toggles the selected state (using setSelected) based on whether the row is already selected (selected == i).
                //If selected is currently equal to i (the index of the clicked row), it sets selected to -1, effectively deselecting any previously selected row.
                //If selected is not equal to i (meaning the clicked row is different from the currently selected row), it sets selected to i, indicating that this row is now selected.
                onClick={() => {
                  setSelected(selected === i ? -1 : i);
                  props.setBank(selected === i ? "" : e._id);
                }}
              >
                <td className="py-2 px-4 border">{e.name}</td>
                <td className="py-2 px-4 border">{e.organisation}</td>
                <td className="py-2 px-4 border">{e.category}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-between items-center">
                    <div className="w-full">{e.address}</div>
                    <div className="flex items-center">
                      &nbsp;&nbsp;
                      <i
                        class="fa-solid fa-circle-info fa-lg"
                        onClick={() => setPopup(i)}
                      ></i>
                      &nbsp;&nbsp;&nbsp;
                      {selected === i ? (
                        <i class="fa-regular fa-circle-check fa-lg"></i>
                      ) : (
                        <i class="fa-regular fa-circle fa-lg"></i>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-md font-bold my-6">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/*Popup component, providing a versatile and reusable way to display information or actions related to specific items. */}
      <Popup
        popup={popup}
        setPopup={setPopup}
        data={data[popup]}
        handle="Blood Bank"
      />
    </div>
  );
};

export default BanksSearch;
