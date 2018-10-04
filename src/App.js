import React, { Component } from 'react';
import SurveyInformation from './components/SurveyInformation';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
            <SurveyInformation />
      </div>
    );
  }
}

export default App;
