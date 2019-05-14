import React from "react";
import "./App.scss";
import JSONTree from "react-json-tree";

export default class Tree extends React.Component {
  render() {
    return (
      <div>
        <span className="title d-flex align-self-start">Tree</span>
        <JSONTree
          data={this.props.json}
          getItemString={() => null}
          hideRoot={true}
          theme={{
            valueLabel: {
              backgroundColor:'purple',
              color: 'aliceblue',
              borderRadius: 20,
              paddingLeft:20,
              paddingRight:15,
              border: '1px solid aliceblue'
            }
          }}
          labelRenderer={(keyPath, nodeType) => {
            return <span onClick={()=>this.onNodeClick(nodeType, keyPath)}>{keyPath[0]}</span>
          }}
        />
      </div>
    );
  }

  onNodeClick = (nodeType, keyPath) => {
    if(nodeType === "Object" || nodeType === "Array") return;
    if(keyPath) {
      var path = "";
      for(var i = 0; i < keyPath.length; i++) {
        path = keyPath[i] + "/" + path;
      }
      console.log("path = " + path);
    }
  }
}
