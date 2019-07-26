import React from "react";
import "./App.scss";
import JSONTree from "react-json-tree";
import { AppContext } from "./App";

export default class Tree extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {
          value => (
            <div>
              <span className="title d-flex align-self-start">Tree</span>
              <JSONTree
                data={value.dataSchema}
                getItemString={() => null}
                hideRoot={true}
                theme={{
                  valueLabel: {
                    backgroundColor: 'teal',
                    color: 'aliceblue',
                    borderRadius: 20,
                    paddingLeft: 20,
                    paddingRight: 15,
                    border: value.selectedVariable ? '1px solid aliceblue' : "1px solid transparent"
                  }
                }}
                labelRenderer={(keyPath, nodeType) => {
                  return <span onClick={() => this.onNodeClick(value, nodeType, keyPath)}>{keyPath[0]}</span>
                }}
              />
            </div>
          )
        }
      </AppContext.Consumer>
    );
  }

  onNodeClick = (value, nodeType, keyPath) => {
    if (nodeType === "Object" || nodeType === "Array") return;
    if (keyPath) {
      var route = ""
      for (var j = keyPath.length-1; j >= 0; j--) {
        var item = keyPath[j];
        item = Number.isInteger(item) ? "[" + item + "]" : route ? "." + item : item
        route = route + item
      }
      value.onDataSelected("{"+route+"}");
    }
  }
}
