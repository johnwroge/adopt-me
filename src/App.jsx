
import React from 'react';
import { createRoot } from 'react-dom/client';
// import Pet from './Pet';
import SearchParams from './SearchParams';

const App = () => {

  return (
    <div>
      <h1> Adopt Me! </h1>
      <SearchParams />
      {/* <Pet name = "Luna" animal = "dog" breed = "Havanese"/>
      <Pet name = "Pepper" animal = "bird" breed = "Cockatiel"/>
      <Pet name = "Doink" animal = "cat" breed = "Mixed"/> */}
    </div>
  )

}







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
root.render(React.createElement(App));
