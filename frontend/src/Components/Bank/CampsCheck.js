import React, { useState, useEffect } from "react";
import axios from "../Api";

//donation details whether it is pending or done when it is donated in camp also to update donation data like donor name,units of blood donated,etc
//CampsCheck effectively manages the display and interaction with donation details,
// providing functionalities to view, edit, and update donation units and status within a camp setting.

const CampsCheck = (props) => {
  const [edit, setEdit] = useState(true); //Manages whether the donation details are in edit mode (true or false).
  const [units, setUnits] = useState(props.data.units); //Keeps track of the number of units donated, initialized with props.data.units.
  const [status, setStatus] = useState(props.data.status); //Tracks the donation status (props.data.status), where 0 indicates "Pending" and 1 indicates "Donated".
  (() => {
    // updates props.data._id.units and props.data._id.status based on initial props. This seems intended to directly update the props.data._id object, but
    //it's important to note that directly mutating props like this is not a recommended practice in React due to potential side effects and can lead to unexpected behavior.
    props.data._id.units = props.data.units;
    props.data._id.status = props.data.status === 0 ? "Pending" : "Donated";
  })();
  return (
    <div className="border border-blood border-2 shadow-md p-4 text-lg w-max rounded-xl">
      <table>
        <tr>
          <td>{props.data._id.name}</td>
          <td className="pl-4">
            {
              //Displays the donation units (props.data.units when edit mode is active).
              edit ? (
                <>{props.data.units}</>
              ) : (
                <input
                  type="number"
                  min={1}
                  max={250}
                  className="w-12"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                />
              )
            }
            mL
          </td>
        </tr>
        <tr>
          {/*displaying bloodgroup and age */}
          <td>
            {props.data._id.bloodGroup} | {props.data._id.age}yrs
          </td>
          <td className="text-right">
            &nbsp;&nbsp;&nbsp;
            {edit ? ( //id edit is true. On clicking if popup id -1 then The toggle mechanism ensures that the popup appears when the user wants to see more information and disappears when they are done, maintaining a clean and user-friendly interface. basically because during updation popup removed so that diff user cant see old popup data
              //Sets the props.sent state with props.data._id, presumably to send data related to the clicked item to the popup for further action or display.
              <>
                <i
                  class="fa-solid text-metal fa-circle-info"
                  onClick={() => {
                    props.setPopup(props.popup === -1 ? 1 : -1);
                    props.setSent(props.data._id);
                  }}
                ></i>{" "}
                &nbsp;
                {/*Only displayed when edit is true and status is 0 (Pending). Clicking this icon sets edit state to false (setEdit(false)), allowing users to edit the number of units donated (units). */}
                {status === 0 && (
                  <i
                    class="fa-solid text-green fa-pen-to-square"
                    onClick={() => setEdit(false)}
                  ></i>
                )}
              </>
            ) : (
              //Shown when edit is false. Clicking this icon initiates an asynchronous operation (async () => { ... }) to update the donation units via a PUT request to the server (axios.put).
              <>
                <i
                  class="fa-solid text-green fa-check"
                  onClick={async () => {
                    //Submitting Changes (edit === false):
                    //This PUT request typically updates the backend database with the new units value for the specific donation (props.data._id). The units value is sent in the request body.
                    await axios
                      .put(
                        `/camps/${props.camp}/${props.data._id._id}`,
                        { units: units },
                        { withCredentials: true }
                      )
                      .then((r) => {
                        //Updates local state (props.data.units, props.data.status, setUnits, setStatus) to reflect the updated values.
                        //Resets edit mode to true (setEdit(true)), allowing further edits or viewing.
                        alert("Updated");
                        props.data.units = units;
                        props.data.status = 1;
                        setUnits(units);
                        setStatus(1);
                        setEdit(true);
                      })
                      .catch((e) => {
                        alert("Something went wrong in Bank CampsCheck.js");
                      });
                  }}
                ></i>{" "}
                &nbsp;
                <i
                  class="fa-solid fa-xmark text-blood"
                  onClick={() => setEdit(true)}
                ></i>
              </>
            )}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default CampsCheck;
