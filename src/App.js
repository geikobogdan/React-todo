import React, { useState } from "react";
import useDebounce from "./use-debounce";
import { allData, getRandomName } from "./api";
import "./App.scss";

function App() {
  let data = {
    name: "",
    age: "",
    gender: "",
    nationality: [],
  };
  //const Loading = ["NEVER", "IS_LOADING", "LOADED"];
  const [info, setInfo] = useState(data);
  const [inputValue, setInputValue] = useState("");

  const handleGenerateNewInfo = async () => {
    data.name = await getRandomName()
   // console.log(data.name)
    data.name = data.name?.split(" ")[0]
    data = await allData(data.name);
    
   
    setInfo(data);
   
  };

  
  const debouncedOnChangeInput = useDebounce(inputValue, 500);
  async function fetchData(inputValue) {
    //console.log("work")
      data = await allData( inputValue.split(" ")[0] || inputValue);
      setInfo(data);
  }  

  React.useEffect(
     () => {

      if (debouncedOnChangeInput) {
        setInputValue(debouncedOnChangeInput);
       fetchData(inputValue);
       
       
      }
      if(!inputValue){
        setInfo("");
      }
    },
    [debouncedOnChangeInput] 
  );

  return [
    <div className="info" key={1}>
      <div className="header">
        <div className="header__avatar">
          {inputValue ? (
            <img
              src={`https://avatar.oxro.io/avatar.svg?name=${
                inputValue.split(" ")[0] || inputValue
              }+${
                inputValue.split(" ")[1] ? inputValue.split(" ")[1] : ""
              }&background=6ab04c&color=000`}
              alt="AVATARKA"
              className="avatar"
            />
          ) : (
            " "
          )}
        </div>
        <div className="header__name">{info?.name}</div>
      </div>
      <div className="textField">
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            autoComplete="off"
           
            onChange={e => setInputValue(   e.target.value )}
          />
          <label htmlFor="name" className="form__label">
            Enter a new name to generate
          </label>
        </div>
      </div>
      <div className="content--flex">
        <div className="content__age">
          <div className="content__icon"></div>
          <div className="content__title">Age</div>
          <div className="content__info">{info?.age}</div>
        </div>
        <div className="content__gender">
          <div className="content__icon"></div>
          <div className="content__title">Gender</div>
          <div className="content__info">{info?.gender}</div>
        </div>
        <div className="content__nationality">
          <div className="content__icon"></div>
          <div className="content__title">Nationality</div>
          <div className="content__info">{info.nationality?.map(item=>item.country_id + " ")}</div>
        </div>
      </div>
    </div>,
    <div className="generate" key={2}>
      <div className="btn">
        <button onClick={handleGenerateNewInfo} className="button">
          <div className="button__content">
            <p className="button__text">generate</p>
          </div>
        </button>
      </div>
    </div>,
  ];
}

export default App;
