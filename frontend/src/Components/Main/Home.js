import React from "react";
import bg from "../../assets/bgstart1.jpg";
import bg2 from "../../assets/food2.jpg";
import donationFact from "../../assets/abc.jpg";
import g1 from "../../assets/donation/g1.jpg";
import g2 from "../../assets/donation/g2.jpg";
import g3 from "../../assets/donation/g3.jpg";
import g4 from "../../assets/donation/g4.jpg";
const Home = () => {
  const temp = [
    {
      food: "Non-Perishable Food",
      type: "Rice,flour,Salt,spices,cooking oil,etc",
    },
    {
      food: "Perishable Food",
      type: "Fruits, vegetables,Milk, cheese,Bread,etc",
    },
    {
      food: "Prepared Food",
      type: "Restaurant Leftovers,Homemade Dishes,Catered Meals,etc",
    },
    {
      food: "Baby Food and Formula",
      type: "Infant cereals fortified with iron and other nutrients.",
    },
    {
      food: "Snacks and Beverages",
      type: "Nuts, dried fruits, crackers, chips,sports drinks,etc",
    },
  ];
  const temp2 = [
    { title: "Registration", img: g1 },
    { title: "Seeing", img: g2 },
    { title: "Donation", img: g3 },
    { title: "Save Life", img: g4 },
  ];
  return (
    <div className="dark:text-white-900">
      <img
        src={bg}
        alt=""
        style={{ marginLeft: "50px", textAlign: "center" }}
      />
      <div className="grid grid-cols-2 place-items-center mt-6 px-52">
        <div>
          <img
            draggable={false}
            src={bg2}
            width="100%"
            alt=""
            style={{ borderRadius: "30px" }}
          />
        </div>
        <div>
          <p className="text-center font-bold text-4xl text-gray-dark dark:text-white-900">
            "Hunger is not an issue of charity.It is an issue of justice."{" "}
            <br />- Jacques Diouf
          </p>
        </div>
      </div>
      <h1 className="font-bold text-center text-blood my-4 text-lg underline">
        Know About Donation
      </h1>
      <div className="flex px-20">
        <div>
          <img
            src={donationFact}
            width="90%"
            alt=""
            style={{ borderRadius: "30px" }}
          />
          <p className="text-center">
            <code>
              No adjective in the dictionary can define the feeling after you
              donate food to the needy. The food donating activities is a way to
              express your gratitude to the Almighty for making you fortunate to
              have your plates full every day.
            </code>
          </p>
        </div>
        <div>
          <table className="w-max" cellPadding={5}>
            <tr>
              <td
                colSpan={2}
                className="border bg-blood text-white-900 text-center font-bold"
              >
                Compatible Food Type You can Donate
              </td>
            </tr>
            <tr>
              <th className="border w-max text-lg">Food Types </th>
              <th className="border w-max text-lg">Contents</th>
            </tr>
            {temp.map((e) => {
              return (
                <tr>
                  <td className="border w-max text-lg">{e.food}</td>
                  <td className="border w-max text-lg">{e.type}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <p className="text-xl underline font-bold text-blood text-center mt-5 mb-5">
        Food Donation Process
      </p>
      <div className="grid grid-cols-2 place-items-center">
        {temp2.map((e, i) => (
          <div className="border-metal shadow-md rounded-lg overflow-hidden max-w-[90%] select-none grid grid-cols-2">
            <div>
              <img src={e.img} draggable={false} width="100%" alt="" />
            </div>
            <div className="m-4">
              <h1 className="font-bold text-lg text-midnight dark:text-white-900">
                {i + 1} - {e.title}
              </h1>
              <p className="text-justify">
                Food donation quotes evoke emotions and sentiments that resonate
                with readers. They have the potential to touch the heart and
                awaken a sense of empathy and compassion. By connecting
                emotionally, these quotes inspire people to take action and make
                a positive impact in the lives of others.
              </p>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="w-full bg-blood text-white-900 h-max text-sm text-center font-bold">
        <code>FoodLink @ {new Date().getFullYear()} Made by Team Adika</code>
      </div>
    </div>
  );
};

export default Home;
