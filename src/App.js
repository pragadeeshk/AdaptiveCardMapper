import React from "react";
import "./App.scss";
import Form from "./Form";
import Variables from "./Variables";
import Tree from "./Tree";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import CardGenerator from "adaptivecardgenerator/cardGenerator";
import AdaptiveCard from 'react-adaptivecards'
import {Template} from './binding/template-engine'
import {EvaluationContext} from './binding/expression-parser'
var context = new EvaluationContext();
// const templateJson = {"type":"AdaptiveCard","body":[{"type":"TextBlock","id":"city","size":"Large","text":"Seattle, WA","isSubtle":true},{"type":"TextBlock","id":"date","spacing":"None","text":"September 18, 7:30 AM"},{"type":"ColumnSet","columns":[{"type":"Column","items":[{"type":"Image","id":"image","url":"http://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png","size":"Small"}],"width":"auto"},{"type":"Column","items":[{"type":"TextBlock","id":"temp","spacing":"None","size":"ExtraLarge","text":"42"}],"width":"auto"},{"type":"Column","items":[{"type":"TextBlock","spacing":"Small","weight":"Bolder","text":"°F"}],"width":"stretch"},{"type":"Column","items":[{"type":"TextBlock","horizontalAlignment":"Left","text":"Hi"},{"type":"TextBlock","id":"max","horizontalAlignment":"Left","text":"51"}],"width":"auto"},{"type":"Column","items":[{"type":"TextBlock","horizontalAlignment":"Left","text":"Lo"},{"type":"TextBlock","id":"min","horizontalAlignment":"Left","text":"41"}],"width":"stretch"}]}],"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","version":"1.0","speak":"<s>The forecast for Seattle January 20 is mostly clear with a High of 51 degrees and Low of 40 degrees</s>"}
// const responseJson = { "data": { "request": [{ "type": "City", "query": "Dublin, Ireland" }], "current_condition": [{ "observation_time": "10:46 AM", "temp_C": "14", "temp_F": "57", "weatherCode": "116", "weatherIconUrl": [{ "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png" }], "weatherDesc": [{ "value": "Partly cloudy" }], "windspeedMiles": "6", "windspeedKmph": "9", "winddirDegree": "190", "winddir16Point": "S", "precipMM": "0.1", "humidity": "77", "visibility": "10", "pressure": "996", "cloudcover": "75", "FeelsLikeC": "14", "FeelsLikeF": "56", "uvIndex": 4 }], "weather": [{ "date": "21st April 2019", "astronomy": [{ "sunrise": "05:53 AM", "sunset": "08:07 PM", "moonrise": "10:42 PM", "moonset": "07:18 AM", "moon_phase": "Waxing Gibbous", "moon_illumination": "81" }], "maxtempC": "24", "maxtempF": "76", "mintempC": "15", "mintempF": "59", "totalSnow_cm": "0.0", "sunHour": "14.5", "uvIndex": "5", "hourly": [{ "time": "24", "tempC": "24", "tempF": "76", "windspeedMiles": "6", "windspeedKmph": "9", "winddirDegree": "74", "winddir16Point": "ENE", "weatherCode": "113", "weatherIconUrl": [{ "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png" }], "weatherDesc": [{ "value": "Sunny" }], "precipMM": "0.0", "humidity": "49", "visibility": "10", "pressure": "1021", "cloudcover": "0", "HeatIndexC": "20", "HeatIndexF": "68", "DewPointC": "8", "DewPointF": "47", "WindChillC": "20", "WindChillF": "67", "WindGustMiles": "6", "WindGustKmph": "10", "FeelsLikeC": "20", "FeelsLikeF": "67", "chanceofrain": "0", "chanceofremdry": "85", "chanceofwindy": "0", "chanceofovercast": "0", "chanceofsunshine": "100", "chanceoffrost": "0", "chanceofhightemp": "3", "chanceoffog": "0", "chanceofsnow": "0", "chanceofthunder": "0", "uvIndex": "0" }] }] } }
const AppContext = React.createContext();

class App extends React.Component {

  constructor() {
    super();
    this.cardGenerator = null;
    this.state = {
      showVariables: false,
      showDataSchema: false,
      template: null,
      dataSchema: null,
      selectedVariable: null,

      onDataSelected: this.bindSelectedData,
      onVariableSelected: this.updatedSelectedVariable
    }
  }

  updatedSelectedVariable = (variable) => {
    this.setState({
      selectedVariable: variable,
      showCard: false,
    })
  }

  bindSelectedData = (data) => {
    if (this.state.selectedVariable) {
      var keys = [...this.state.keys]
      var hasAllVariablesTagged = true;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (this.state.selectedVariable.id === key.id
          && this.state.selectedVariable.path === key.path) {
          key.dataPath = data;
        }
        if (hasAllVariablesTagged && key.dataPath === undefined) {
          hasAllVariablesTagged = false;
        }
      }
      this.setState({
        keys,
        hasAllVariablesTagged,
        showCard: false,
        selectedVariable: null
      })
    }
  }

  updateTemplate = (value, success) => {
    if (success) {
      this.cardGenerator = new CardGenerator(value);
      var keys = this.cardGenerator.fetchKeys();
      var hasAllVariablesTagged = keys && keys.length > 0;
      for (var i in keys) {
        if (hasAllVariablesTagged && keys[i].dataPath === undefined) {
          hasAllVariablesTagged = false;
        }
      }
      this.setState({
        showCard: false,
        keys: keys,
        template: value,
        showVariables: true,
        hasAllVariablesTagged
      })
    } else {
      this.setState({
        showVariables: false
      });
    }
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App frame">
          <header className="App-header" />
          <div className="container d-flex justify-content-start">
            <div className="d-flex flex-column col-6 align-self-stretch">
              <Form
                title={"Adaptive Card Layout Template"}
                description={"Enter Adaptive Card Layout Template"}
                onSubmit={this.updateTemplate} />
              {
                this.state.showVariables &&
                <Variables template={this.state.template} />
              }
              {
                this.state.hasAllVariablesTagged &&
                this.state.dataSchema &&
                <Button
                  className="mt-5 mb-3"
                  as="input"
                  type="button"
                  value="Verify"
                  onClick={() => {
                    this.setState({
                      showCard: true
                    })
                  }}
                />
              }
              {
                this.state.showCard && this.renderCard()
              }
            </div>
            <div className="d-flex flex-column col-6 align-self-stretch">
              <Form
                title={"Data Schema"}
                description={"Enter Data Schema"}
                onSubmit={(value, success) => {
                  this.setState({
                    dataSchema: value,
                    showDataSchema: success
                  })
                }} />
              {
                this.state.showDataSchema &&
                <Tree json={this.state.dataSchema} />
              }
            </div>
          </div>
          {this.renderModel()}
        </div>
      </AppContext.Provider>
    );
  }

  renderCard = () => {
    var json = this.cardGenerator.bindDataSchema(this.state.keys);
    json.$data = this.state.dataSchema;
    var card = new Template(json).expand(context);
    return (
      <div>
        <AdaptiveCard style={{ border: '1px solid black' }}
          payload={card}>
        </AdaptiveCard>
        <Button
          className="mt-5 mb-3 align-self-stretch"
          as="input"
          type="button"
          value="Finish"
          onClick={() => {
            this.setState({
              showModal: true,
              showCard: false,
              finalSchema: json
            })
          }} />
      </div>
    );
  }

  renderModel = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={() => {
          this.setState({
            showModal: false,
            showCard: true
          })
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader closeButton>
          <ModalTitle id="contained-modal-title-vcenter">
            Adaptive Card Template
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <span>{JSON.stringify(this.state.finalSchema, null, 4)}</span>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => {
            this.setState({
              showModal: false,
              showCard: true
            })
          }}>Close</Button>
          <Button variant="primary" onClick={() => {
            this.copyStringToClipboard(JSON.stringify(this.state.finalSchema));
            this.setState({
              showModal: false,
              showCard: true
            })
          }}>Copy</Button>
        </ModalFooter>
      </Modal>
    );
  }

  copyStringToClipboard = (str) => {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}

export {
  App,
  AppContext
}