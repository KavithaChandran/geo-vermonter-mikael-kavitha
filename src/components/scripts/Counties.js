//import { Renderer } from "leaflet";
import { useState } from "react";
import InfoBar from "./InfoBar";

function Counties(props) {
  const [chosen, setChosen] = useState(null);
  //this state shows the selected county by the player
  const [countySelected, setCountySelected] = useState("");
  //this is the fetched county and it will be used to compare landed county and selected countya re same
  //const [countyCompare, setCountyCompare] = useState("")
  let countyCompare;
  //const [countyData, setCountyData] = useState({})
  const [data, setData] = useState();
  const [buttonToggle, setToggle] = useState(true);
  const [score, setScore] = useState(props.score);

  

  // Function for changing the counties
  function changeSelection(evt) {
    setCountySelected(evt.target.value);
    RealCountyFetch();
   
  }

  //function for selecting the counties, on submit the selected value is equal to the county chosen
  function SubmitCountyForm(evt) {
    // this makes sure the page is not refreshed once the button is triggered
    evt.preventDefault();
    RealCountyFetch();
    GuessCorrect();
  }
  //Function for users guess
  function GuessCorrect() {
    if (countySelected !== "") {
      if (countySelected !== countyCompare) {
        setScore(score - 10);
        setToggle(true);
        alert("Guess Wrong");
      } else {
        setToggle(false);
        alert("Guess correct");
      }
    } else {
      alert("Choose a county");
    }
  }
  //fetching the data of the county to compare if guess is rite or wrong
  function RealCountyFetch() {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${props.latRandom}&lon=${props.longRandom}&format=json`
    )
      .then((res) => res.json())
      .then((jsonObj) => {
        setData(jsonObj);
      });

    countyCompare = data && data.address.county;
  
    //return true;
  }
  return (
    <>
      {buttonToggle && (
        <InfoBar
          score={score}
          county={"?"}
          town={"?"}
          latitude={"?"}
          longitude={"?"}
        />
      )}

      {!buttonToggle && (
        <InfoBar
          score={score}
          county={countyCompare}
          latitude={props.latRandom}
          longitude={props.longRandom}
          county={data && data.address.county}
          town={
            (data && data.address.city) ||
            (data && data.address.village) ||
            (data && data.address.hamlet) ||
            (data && data.address.town)
          }
        />
      )}

      <div
        style={{
          height: "100px",
          width: "300px",
          border: "1px solid black",
          backgroundColor: "gray",
          position: "absolute",
          float: "left",
          marginLeft: 69,
          zIndex: 500,
        }}
      >
        <div>
          <h5>
            {chosen
              ? `Hello,you guessed ${countySelected}`
              : `Are you ready to Guess the County ?`}
          </h5>

          <form onSubmit={SubmitCountyForm}>
            {/* provides list of all counties and allows the player to choose */}
            <select
              name="County Selection"
              value={countySelected}
              onChange={changeSelection}
            >
              <option value="Choose a County">Please Choose a County</option>
              <option value="Addison County">Addison</option>
              <option value="Bennington County">Bennington</option>
              <option value="Caledonia County">Caledonia</option>
              <option value="Chittenden County">Chittenden</option>
              <option value="Essex County">Essex</option>
              <option value="Franklin County">Franklin</option>
              <option value="Grand Isle County">Grand Isle</option>
              <option value="Lamoille County">Lamoille</option>
              <option value="Orange County">Orange</option>
              <option value="Orlenes County">Orlenes</option>
              <option value="Rutland County">Rutland</option>
              <option value="Washington County">Washington</option>
              <option value="Windham County">Windham</option>
              <option value="Windsor County">Windsor</option>
            </select>
            <input type="submit" value="Guess" />
            <input
              type="submit"
              value="Cancel"
              onClick={(evt) => {
                props.guessBox(false);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}
export default Counties;

