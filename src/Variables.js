import React from "react";
import "./App.scss";
import CardGenerator from "adaptivecardgenerator/cardGenerator";

export default class Variables extends React.Component {
  render() {
    var cardGenerator = new CardGenerator(this.props.template);
    var keys = cardGenerator.fetchKeys();
    if (keys && keys.length > 0) {
      return (
        <div>
          <span className="title d-flex align-self-start">
            Dynamic Elements
          </span>
          <div className="d-flex flex-column">
            {keys.map(key => {
              return <span key={key.id} className="variable">{key.id}</span>;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <span className="error">
          No dynamic elements found. Please provide Id's for dynamic elements
        </span>
      );
    }
  }
}
