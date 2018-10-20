// @flow
import * as React from 'react';
import axios from 'axios';
import {RadioGroup, Radio} from 'react-radio-group';
import { Link } from 'react-router-dom';

type State ={
  id: number,
  details: any,
  selectedValue: any,
  fields: Object,
  msg: string,
  alertClass: string,
  isLoaded: boolean
};
type Props ={/**/};

class DetailsSurvey extends React.Component<Props, State> {
  constructor(props:any){
    super(props);
    this.state = {
      id:(this:any).props.match.params.postID,
      details: ""  ,
      selectedValue:'',
      fields: {},
      msg:'',
      alertClass:'',
      isLoaded: false,
    };
    (this:any).handleChange = this.handleChange.bind(this);
    (this:any).handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("https://private-5fb3f-surveysmock.apiary-mock.com/api/surveys/"+this.state.id)
    .then(res =>this.setState({details: res.data.survey}) )
  }

  handleChange(value:any, event:Object) {
    let name = event.target.name;
    let fields = this.state.fields;
        fields[name] = value;
        this.setState({fields});
  }

  handleSubmit(event:Object) {
    event.preventDefault();
    let me = this;
    const fields =this.state.fields;
    if (Object.keys(fields).length !== 0) {
      axios.post("https://private-anon-0a7ac4dfdf-surveysmock.apiary-mock.com/api/surveys/" + this.state.id + "/completions", {fields})
      .then(response=> {
        console.log(response);
        me.setState({
          msg: 'Thanks for answering the survey!',
          alertClass:"alert alert-success text-center",
          isLoaded: true,
          fields:{}
        });
      })
      .catch(response=> console.log(response));

    } else {
      me.setState({
        msg: 'Please complete the field',
        alertClass:"alert alert-danger text-center",
        isLoaded: true
      });
    }
    (this:any).formRef.reset();
  }

  render() {
    let questions;
    if (this.state.isLoaded) {
      setTimeout(() => {
        this.setState({isLoaded:false});
      }, 2000);
    }
    if (this.state.details) {
       questions = this.state.details.questions.map(question =>
         <div  className="col-md-4 col-sm-6 col-xs-12 column-height-set" key={question.id}>
           <h5>{question.title}</h5>
           <RadioGroup  name={question.id} selectedValue={this.state[question.id]} onChange={this.handleChange}>
            { question.options.map((option, value)=>
              <div key={value}><Radio  value={option} />{option}</div>
            )
          }
          </RadioGroup>
         </div>
       )
    }
    return (
      <div>
       {this.state.isLoaded? <div className={this.state.alertClass}>{this.state.msg}</div>:null}
        <h3 className="text-center header-properties">{this.state.details.title}</h3>
         <form onSubmit={this.handleSubmit} ref={(ref) => (this:any).formRef = ref}>
            <div className="row">
            {questions}
            </div>
            <div className="col-md-offset-3 col-md-6 col-sm-9 col-xs-12">
            <button type="submit" className="btn btn-primary custom-button-props">Submit the Survey</button>
            <Link to="/"><button type="button" className="btn btn-default">Go Back to Survey Group</button></Link>
            </div>
          </form>
      </div>
    );
  }

}

export default DetailsSurvey;
