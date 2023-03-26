import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
//these provide context to display
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import Details from "./Details";
import { useState } from 'react'
//instantiate query client
//once you fetch it, don't refetch again (Infinity)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  //to change to strict mode, wrap the app in <StrictMode></StrictMode> sends notifications.
  //browserrouter and queryclientprovider already use context under hood! adoptedPet is value
  //and function to update value (read and write)
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client = {queryClient}>
        <AdoptedPetContext.Provider value = {adoptedPet}> 
        <header>
          <Link to="/"> Adopt Me! </Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

//built to appease php backend devs,
// Your code is going to go here
// const App = () => {
//   //jsx calls react.createElement for you, this is just shown
//   //so that you don't think it's a black box. if you look at call
//   //stack there are a bunch of these
//   return React.createElement(
//     //type of html element: p, div, h1, etc
//     "div",
//     //attributes like id or classname go here, or null
//     {},
//     //children go here
//     [
//       React.createElement("h1", {}, "Adopt Me!"),
//       React.createElement(Pet, {
//         animal: "Dog",
//         name: "Luna",
//         breed: "Havanese",
//       }),
//       React.createElement(Pet, {
//         animal: "Bird",
//         name: "Pepper",
//         breed: "Cockatiel",
//       }),
//       React.createElement(Pet, {
//         animal: "Dog",
//         name: "Doink",
//         breed: "Mixed",
//       }),
//     ]
//   );
// };

const container = document.getElementById("root");
//old way before 18 ReactDOM.render(container, <App />)
//this is new API to render in R18 with concurrency

//tree shaking live code inclusion is better, eliminates unnecessary code
const root = createRoot(container);
root.render(<App />);
