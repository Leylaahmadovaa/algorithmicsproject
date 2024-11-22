import { Component } from "react";

class Wine extends Component {
  render() {
    return (
      <div>
        <h1>Title: {this.props.title}</h1>
        <h2>Description: {this.props.description}</h2>
        <p>Ratong: {this.props.rating}</p>
      </div>
    );
  }
}
export default Wine;
