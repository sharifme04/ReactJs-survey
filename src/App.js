// @flow
import * as React from 'react';
import SurveyInformation from './components/SurveyInformation';
import './App.css';

type State ={/**/};
type Props ={/**/};

class App extends React.Component<Props, State> {
  render() {
    return (
      <div className="container-fluid">
            <SurveyInformation />
      </div>
    );
  }
}

export default App;
