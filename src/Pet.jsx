


// const Pet = (props) => {
//     return React.createElement("div", {}, [
//       //variable arity -> array isn't required
//       React.createElement("h1", {}, props.name),
//       React.createElement("h2", {}, props.animal),
//       React.createElement("h2", {}, props.breed),
//     ]);
//   };

//these are equivalent
  const Pet = (props) => {
    return (
        <div> 
            <h1> {props.name} </h1>
            <h2> {props.animal} </h2>
            <h2> {props.breed} </h2>
        </div>
    )
  }
//es6 module syntax
  export default Pet;