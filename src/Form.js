import React from "react";
import Button from "react-bootstrap/Button";
import "./App.scss";  

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value,
      error: false,
      errorMessage: ""
    };
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <span className="title">{this.props.title}</span>
        <textarea
          className="text-area"
          placeholder={this.props.description}
          defaultValue={this.props.value}
          onChange={event => {
            this.setState({
              content: event.target.value
            });
          }}
        />
        <Button
          className="mt-3 mb-3"
          as="input"
          type="button"
          value="Submit"
          onClick={this.onSubmit}
        />
        {this.state.error && <span className="error">{this.state.errorMessage}</span>}
      </div>
    );
  }

  onSubmit = () => {
    try {
        var json = JSON.parse(this.state.content);
        this.setState({
            error:false,
            errorMessage:""
        })
        if (this.props.onSubmit) {
            this.props.onSubmit(json, true);
        }
    } catch (e) {
        this.setState({
            error:true,
            errorMessage:"Unable to parse, Please enter valid Json"
        })
        if (this.props.onSubmit) {
            this.props.onSubmit(json, false);
        }
    }
  };
}
