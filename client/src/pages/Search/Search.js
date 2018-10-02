import React from "react";
import { Form, Text } from "informed";
import YearPicker from "../../components/YearPicker";
import Section from "../../components/Section";
import API from "../../utils/API";
import Scrape from "../../utils/Scrape";
import Collection from "../Collection/Collection";


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default values
      syear: 2000,
      eyear: "",
      disabled: {
        syear: false,
        eyear: true,
        submit: true
      },
      scraped: [],
      saved: []
    };
    this.handleSyearChange = this.handleSyearChange.bind(this);
    this.handleEyearChange = this.handleEyearChange.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.setFormApi = this.setFormApi.bind(this);

    this.savedClick = this.savedClick.bind(this);
    this.scrapedClick = this.scrapedClick.bind(this);
  }

  componentDidMount() {
    API.getArticles().then(res => {
      this.setState({ saved: res.data });
    });
  }

  handleClick() {
    if (this.formApi.getState().values.topic) {
      var topic = this.formApi.getState().values.topic;
      var syear = this.state.syear;
      var eyear = this.state.eyear;

      Scrape(topic, syear, eyear)
        .then(res => {
          if (res.data.response.docs.length > 0) {
            return res.data.response.docs.map(doc => {
              return {
                url: doc.web_url,
                headline: doc.headline.main,
                date: doc.pub_date,
                _id: doc._id
              };
            }).slice(0,5);
          } else {
            alert("Please provide a valid topic");
            this.setState({
              disabled: { syear: false, eyear: false, submit: true },
              scraped: []
            });
            this.formApi.setState("topic", "");
          }
        })
        .then(scraped => {
          this.setState({ disabled: { syear: false, eyear: false, submit: true }, scraped: scraped });
          this.formApi.setState("topic", "");
        });
    } else {
      alert("Please type the topic");
    }
  }

  setFormApi(formApi) {
    this.formApi = formApi;
  }

  handleSyearChange(syear) {
    this.setState({ syear: parseInt(syear) });
    this.setState({ eyear: parseInt(syear) });
    this.setState({ disabled: { syear: true, eyear: false, submit: true } });
  }

  handleEyearChange(eyear) {
    this.setState({ eyear: parseInt(eyear) });
    this.setState({ disabled: { syear: true, eyear: true, submit: false } });
  }

  showEndYear() {
    if (this.state.disabled.syear) {
      return (
        <div>
          <label htmlFor="toyear">End Year</label>
          <YearPicker
            start={false}
            disabled={this.state.disabled.eyear}
            yrselect={this.state.eyear}
            onYearPickerChange={this.handleEyearChange}
            value={this.state.eyear}
            style={{ width: "30px" }}
          />
        </div>
      );
    }
  }

  savedClick(saved,newRemove){
    this.setState({
      saved: saved
    });
  }

  scrapedClick(scraped,newSaved){
    if (newSaved) {
      this.setState({
        scraped: scraped,
        saved: [ ...this.state.saved, newSaved ]
      });
    } else {
      this.setState({ scraped: scraped });
    }  
  }

  render() {
    return (
      <div>
        <Section header="Search">
          <Form id="complex-form" getApi={this.setFormApi} className="pl-20 pr-20 pb-10 pt-10">
            <label htmlFor="topic">Topic</label>
            <Text field="topic" id="topic"
              data-role="input" onChange={console.log("Text")} className="input-control text pl-3"/>
            <label htmlFor="fromyear">Start Year</label>
            <YearPicker
              start={true}
              disabled={this.state.disabled.syear}
              yrselect={this.state.syear}
              onYearPickerChange={this.handleSyearChange}
              value={this.state.syear}
            />
            {this.showEndYear()}

            <button
              disabled={this.state.disabled.submit}
              type="submit"
              className="button primary large rounded"
              onClick={this.handleClick}
            >
              Submit
            </button>
          </Form>
        </Section>
        <Collection header="Scraped Articles" saved={false} items={this.state.scraped} onCollectionClick={this.scrapedClick}/>
        <Collection header="Saved Articles" saved={true} items={this.state.saved} onCollectionClick={this.savedClick}/>  
      </div>
    );
  }
}

export default Search;
