/* Custom Hook to retrieve a Breed list */

import { useState, useEffect } from 'react';

const localCache = {};

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if (!animal){
            setBreedList([]);
        } else if (localCache[animal]){
            setBreedList(localCache[animal])
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json = await res.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal])
            //this makes this component easily testable, although we aren't testing 
            setStatus("loaded")
        }
        //every time animal changes from dog to cat, we want to request a new breed list
    }, [animal])
    //return tuple methodology 
    return [breedList, status]
}