import { useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import AdoptedPetContext from './AdoptedPetContext';
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from './fetchPet';
import Carousel from "./Carousel";
import Modal from './Modal';

 function Details() {
    const [showModal, setShowModal] = useState(false)
    //pulls id from context which comes from browser router component in App ie requires browser router 
    const { id } = useParams();
    const region = "zh-ch";
    //navigate used to send user back to home page programatically
    const navigate = useNavigate();
    const [_,setAdoptedPet] = useContext(AdoptedPetContext)
    /*going to give it a query key for what we are requesting (id is going to be used in fetchpet, 
    "detail" is arbitrary). if you don't have anything in cache, run fetchPet. This allows you to cache
    fetch call results!*/
    const results = useQuery(["details", id], fetchPet);
    //this is a loading pane! will show to display to user while loading

   
    //if you want an error handler:
        // if (results.isError){
        //     return (
        //         <h2>ohno</h2>
        //     )
        // }

    if (results.isLoading){
        return (
            <div className="loading-pane"> 
                <h2 className="loader">loading...</h2>
            </div> 
        )
    }

const pet = results.data.pets[0];

console.log(pet.images)
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick = {() => {
                    setAdoptedPet(pet);
                    navigate("/")
                }}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  ) 
}


function DetailsErrorBoundary(props){
    return (
        <ErrorBoundary>
            <Details {...props}/>
        </ErrorBoundary>
    )
}

export default DetailsErrorBoundary; 
