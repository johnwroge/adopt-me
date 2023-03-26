import { useState, useEffect } from "react";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./Results";

/*smaller components are easier to understand, check to see what thing can be removed and 
added to a separate component, even if its not reusable and helps readability it is better*/

const SearchParams = () => {
  //this is shorthand
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  //written out useState returns an array
  // const locationHook = useState("");
  // const location = locationHook[0];
  // const setLocation = locationHook[1];

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res =
      await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}
  &breed=${breed}`);

    const json = await res.json();
    setPets(json.pets);
  }

  return (
    //classname comes from name of js api
    <div className="search-params">
      <form
        //e is a react syntetic event, not an actual dom event
        onSubmit={(e) => {
          //prevents form from submitting
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
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
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
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
export default SearchParams;
