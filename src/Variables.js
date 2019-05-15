import React from "react";
import "./App.scss";
import { AppContext } from "./App";

export default class Variables extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {value => this.renderVariables(value)}
      </AppContext.Consumer>
    );
  }
  renderVariables(value) {
      if(value.keys && value.keys.length > 0) {
        return (
          <div>
            <span className="title d-flex align-self-start">
              Dynamic Elements
              </span>
            <div className="d-flex flex-column">
              {value.keys.map(key => {
                var isSelected = value.selectedVariable ? value.selectedVariable.id === key.id : false;
                return (
                  <div key={key.id} className="d-flex nowrap">
                    <span 
                      onClick={()=>value.onVariableSelected(key)} 
                      className={isSelected || key.dataPath ? "variable-selected" : "variable"}>
                      {key.id}
                    </span>
                    { key.dataPath &&
                      <span className="variable-tagged">
                        {key.dataPath}
                      </span>
                    }
                  </div>
                );
              })}
            </div>
          </div>
        )
      } else {
        return (
          <span className="error">
            No dynamic elements found. Please provide Id's for dynamic elements
          </span>
        )
      }
  }
}
