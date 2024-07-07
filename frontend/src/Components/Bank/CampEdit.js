import React, { useState, useContext } from "react";
import RegisterBank from "./RegisterBank";
import AuthContext from "../context/AuthContext";
import Popup from "../Util/Popup";
import CampsCheck from "./CampsCheck";

const CampEdit = (props) => {
  // Extract the user object from the AuthContext
  const { user } = useContext(AuthContext);
  // Declare state variables
  const [flag, setFlag] = useState(true);
  // flag to manage some conditional rendering (currently not used in the component)
  const [popup, setPopup] = useState(-1);
  // Manages the visibility of the popup (-1 means hidden)
  const [sent, setSent] = useState([]);
  // Holds data for sending information (like selected donors)

  const s1 =
    "mx-2 px-9 py-2 w-max font-semibold rounded-full shadow-sm text-white-900 bg-blood hover:drop-shadow-md hover:opacity-80 cursor-pointer";
  return (
    <div>
      {
        // Conditionally render the popup if props.popup is not -1
        props.popup !== -1 && (
          <div className="popup h-[150%] overflow-scroll z-10">
            <div className="popup_inner rounded-lg p-7 overflow-scroll w-fit">
              <div>
                <h1 className="text-2xl font-bold inline-block">Camp Donors</h1>
                <i
                  onClick={() => props.setPopup(-1)}
                  className="fa-solid fa-circle-xmark text-blood fa-xl float-right cursor-pointer hover:opacity-80"
                ></i>
              </div>
              <br />
              <div className="grid grid-cols-3 gap-4 w-max">
                {
                  //The popup contains a title "Camp Donors" and a close button.
                  //It also maps over the donors array from props.data, rendering a CampsCheck component for each donor.

                  //props.data.donors: This is an array containing information about the donors.
                  //.map((k, j) => {...}): The map function loops over each item in the donors array. It executes the code inside the curly braces {...} for each item.
                  // k: Represents the current donor's data in the array.
                  //j: Represents the index (position) of the current donor in the array. Although it is not used in this code, it is available if needed.
                  props.data.donors.map((k, j) => {
                    return (
                      //The Popup component is rendered with props for the current popup state, the setPopup function, data to be displayed, and a handle string.
                      <CampsCheck
                        setSent={setSent}
                        // Allows CampsCheck to update the sent state in the parent component (CampEdit).
                        popup={popup}
                        // Allows CampsCheck to know the current state of the popup (whether it is open or closed).
                        setPopup={setPopup}
                        // Allows CampsCheck to change the popup state (e.g., to open or close the popup).
                        data={k}
                        //Provides CampsCheck with the data it needs about the current donor.
                        camp={props.data._id}
                        // Provides CampsCheck with the ID of the camp, which might be needed for operations related to the camp.
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        )
      }
      <Popup
        popup={popup} // The Popup component uses this value to decide if it should be visible or hidden.
        setPopup={setPopup} //Allows the Popup component to change the popup state. For example, it might call this function to close the popup.
        data={sent} //Provides the Popup component with the data it needs to display. In this case, sent likely contains information relevant to the content of the popup.
        handle="User" //Could be used by the Popup component to determine how to behave or what to display. For example, it might change the UI based on whether the handle is "User" or something else.
      />
    </div>
  );
};

export default CampEdit;
