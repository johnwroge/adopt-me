import { useState, useContext } from "react";
//usequery replaces useEffect in this component
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from "./useBreedList";
import Results from "./Results";

/*smaller components are easier to understand, check to see what thing can be removed and 
added to a separate component, even if its not reusable and helps readability it is better*/

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  //this is shorthand
  //const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet, _] = useContext(AdoptedPetContext)
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];



  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {
          adoptedPet ? (
            <div className="pet image-container">
              <img src = {adoptedPet.images[0]} alt={adoptedPet.name}/>
               </div>
          ) : null
        }


        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

//classname comes from name of js api
/*<div className="search-params">
      <form
        //e is a react syntetic event, not an actual dom event
        onSubmit={(e) => {
          //prevents form from submitting
          e.preventDefault();
          //browser api that takes form data off form into object
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? ""
          }
          setRequestParams(obj)
        }}
      >
        <label htmlFor="location">
          Location
          <input
            name = "location"
            id="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name = "animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            name = "breed"
            disabled={breeds.length === 0}
        
            
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button> Submit </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};



//written out useState returns an array
  // const locationHook = useState("");
  // const location = locationHook[0];
  // const setLocation = locationHook[1];

  // useEffect(() => {
  //   requestPets();
  // }, []);

  // async function requestPets() {
  //   const res =
  //     await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}
  // &breed=${breed}`);
  //   const json = await res.json();
  //   setPets(json.pets);
  // }*/
