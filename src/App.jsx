import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";

const App = () => {
  //to change to strict mode, wrap the app in <StrictMode></StrictMode> sends notifications.
  return (
    <BrowserRouter>
      <header>
        <Link to="/"> Adopt Me! </Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
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
