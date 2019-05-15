import React from "react";
import "./App.scss";
import Form from "./Form";
import Variables from "./Variables";
import Tree from "./Tree";

import CardGenerator from "adaptivecardgenerator/cardGenerator";

const templateJson = {"type":"AdaptiveCard","body":[{"type":"TextBlock","id":"city","size":"Large","text":"Seattle, WA","isSubtle":true},{"type":"TextBlock","id":"date","spacing":"None","text":"September 18, 7:30 AM"},{"type":"ColumnSet","columns":[{"type":"Column","items":[{"type":"Image","id":"image","url":"http://messagecardplayground.azurewebsites.net/assets/Mostly%20Cloudy-Square.png","size":"Small"}],"width":"auto"},{"type":"Column","items":[{"type":"TextBlock","id":"temp","spacing":"None","size":"ExtraLarge","text":"42"}],"width":"auto"},{"type":"Column","items":[{"type":"TextBlock","spacing":"Small","weight":"Bolder","text":"°F"}],"width":"stretch"},{"type":"Column","items":[{"type":"TextBlock","id":"max","horizontalAlignment":"Left","text":"Hi 51","pattern":"Hi {value}"},{"type":"TextBlock","id":"min","horizontalAlignment":"Left","spacing":"None","text":"Lo 40","pattern":"Lo {value}"}],"width":"stretch"}]}],"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","version":"1.0","speak":"<s>The forecast for Seattle January 20 is mostly clear with a High of 51 degrees and Low of 40 degrees</s>"};
const responseJson = { "data": { "request": [{ "type": "City", "query": "New York, United Kingdom" }], "current_condition": [{ "observation_time": "10:46 AM", "temp_C": "14", "temp_F": "57", "weatherCode": "116", "weatherIconUrl": [{ "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png" }], "weatherDesc": [{ "value": "Partly cloudy" }], "windspeedMiles": "6", "windspeedKmph": "9", "winddirDegree": "190", "winddir16Point": "S", "precipMM": "0.1", "humidity": "77", "visibility": "10", "pressure": "996", "cloudcover": "75", "FeelsLikeC": "14", "FeelsLikeF": "56", "uvIndex": 4 }], "weather": [{ "date": "2019-04-21", "astronomy": [{ "sunrise": "05:53 AM", "sunset": "08:07 PM", "moonrise": "10:42 PM", "moonset": "07:18 AM", "moon_phase": "Waxing Gibbous", "moon_illumination": "81" }], "maxtempC": "24", "maxtempF": "76", "mintempC": "15", "mintempF": "59", "totalSnow_cm": "0.0", "sunHour": "14.5", "uvIndex": "5", "hourly": [{ "time": "24", "tempC": "24", "tempF": "76", "windspeedMiles": "6", "windspeedKmph": "9", "winddirDegree": "74", "winddir16Point": "ENE", "weatherCode": "113", "weatherIconUrl": [{ "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png" }], "weatherDesc": [{ "value": "Sunny" }], "precipMM": "0.0", "humidity": "49", "visibility": "10", "pressure": "1021", "cloudcover": "0", "HeatIndexC": "20", "HeatIndexF": "68", "DewPointC": "8", "DewPointF": "47", "WindChillC": "20", "WindChillF": "67", "WindGustMiles": "6", "WindGustKmph": "10", "FeelsLikeC": "20", "FeelsLikeF": "67", "chanceofrain": "0", "chanceofremdry": "85", "chanceofwindy": "0", "chanceofovercast": "0", "chanceofsunshine": "100", "chanceoffrost": "0", "chanceofhightemp": "3", "chanceoffog": "0", "chanceofsnow": "0", "chanceofthunder": "0", "uvIndex": "0" }] }] } };

const AppContext = React.createContext();

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      showVariables: false,
      showDataSchema: false,
      template: {},
      dataSchema: {},
      selectedVariable: null,

      onDataSelected: this.bindSelectedData,
      onVariableSelected: this.updatedSelectedVariable
    }
  }

  updatedSelectedVariable = (variable) => {
    this.setState({
      selectedVariable: variable
    })
  }

  bindSelectedData = (data) => {
    if(this.state.selectedVariable) {
      var keys = [...this.state.keys]
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (this.state.selectedVariable.id === key.id) {
          key.dataPath = data;
          break;
        }
      }
      this.setState({
        keys : keys
      })
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App frame">
          <header className="App-header" />
          <div className="container d-flex justify-content-start">
            <div className="d-flex flex-column col-6 align-self-stretch">
              <Form
                title={"Adaptive Card Layout Template"}
                value={JSON.stringify(templateJson)}
                description={"Enter Adaptive Card Layout Template"}
                onSubmit={(value, success) => {
                  var cardGenerator = new CardGenerator(value);
                  var keys = cardGenerator.fetchKeys();
                  this.setState({
                    keys: keys,
                    template: value,
                    showVariables: success
                  })
                }} />
              {
                this.state.showVariables &&
                <Variables template={this.state.template}/>
              }
            </div>
            <div className="d-flex flex-column col-6 align-self-stretch">
              <Form
                title={"Data Schema"}
                value={JSON.stringify(responseJson)}
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
        </div>
      </AppContext.Provider>
    );
  }
}

export {
  App,
  AppContext
}