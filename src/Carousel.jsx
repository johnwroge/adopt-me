import { Component } from "react";

//syntax required
class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // Lifecycle methods:describe lifecycle of component. allows fine tuning of rendering conditions

  //gets run once when mounted to DOM, like with useEffect and []
  // componentDidMount(){

  // }
  // //gets run every time state updates
  // componentDidUpdate(){

  // }

  //1.)this needs to be an arrow function to have correct this parameter, otherwise this is undefined.
  //arrow functions don't create new scope. arrow function captures scope where it is written in
  //Carousel (what we want this to refer to)
  //2.) e.target.dataset.index actually returns a string so we use unary plus (+) to change to number!
  //3.) if you want to use functional tools (hooks or query) create a separate parent function compoent
  //on this page and render this component, pass the necessary things there and into carousel
  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  //render function is required
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}



export default Carousel;
