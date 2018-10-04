import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import TableRow from './TableRow';
import DetailsSurvey from './DetailsSurvey';

class SurveyInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ""};
  }

   componentDidMount() {
     axios.get("https://private-5fb3f-surveysmock.apiary-mock.com/api/surveys")
     .then(res =>this.setState({data: res.data.surveys}) )
   }

  render() {
    let survey;
    if (this.state.data) {
       survey = this.state.data.map(survey=>
         <TableRow key={survey.id} survey={survey}/>
       )
   }
    return (
      <div className="container">
          <Switch>
            <Route exact path="/" render={()=>(
              <div>
                <h3 className="text-center header-properties">Different Survey Group</h3>
                <div className="table-responsive">
                <table className="table table-default">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tile</th>
                      <th>Tagline</th>
                      <th>Survey Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {survey}
                  </tbody>
                </table>
                </div>
              </div>
          )}/>
          <Route path="/:postID" render={(props)=> (
              <DetailsSurvey {...this.state} {...props}/>
            )}/>
        </Switch>
      </div>
    );
  }

}

export default SurveyInformation;
