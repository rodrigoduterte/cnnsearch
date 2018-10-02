import React from "react";
import ResultItem from "../../components/ResultItem";
import Section from "../../components/Section";
import moment from "moment";
import API from "../../utils/API";

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  saveItem = (e,headline,url,date) => {
    var id = e.target.getAttribute('dataid');
    
    API.getArticle(id).then((res)=>{
        if(res.data === null) {
            API.saveArticles({
                _id: id, 
                headline: headline,
                url: url,
                date: date
            }).then((res) => {
                this.props.onCollectionClick(this.props.items.filter(obj => {return obj._id !== id}), res.data);
            }).catch(err => console.log(err));
        } else {
            this.props.onCollectionClick(this.props.items.filter(obj => {return obj._id !== id}), '');
        }
    });
  };
  
  removeItem = (e, id) => {
    API.deleteArticles(id)
    .then(res => {
        this.props.onCollectionClick(this.props.items.filter(obj => {return obj._id !== res.data._id}), res.data);
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <Section header={this.props.header}>
        <div className="pl-20 pr-20 pb-10 pt-10">
          {(typeof this.props.items !== 'undefined') ? this.props.items.map((item, idx) => {
            if (this.props.saved) {
                return <ResultItem key={idx} headline={item.headline} url={item.url}
                        saved={this.props.saved}>
                            <p className="ml-50">Date published: { moment(item.date,"YYYY-MM-DD HH:mm:ss").format('MMMM DD YYYY') }</p>
                            <button className="m1-80 bg-red" onClick={((e) => {this.removeItem(e, item._id)})} dataid={item._id}>Remove</button>
                        </ResultItem>
            } else {
                return <ResultItem key={idx} headline={item.headline}
                        url={item.url} saved={this.props.saved}>
                            <button 
                            className="m1-80 bg-green" 
                            onClick={((e) => {this.saveItem(e, item.headline, item.url, item.date)})} 
                            dataid={item._id}>Save</button>
                        </ResultItem>
            }
          }) : null}
        </div>
      </Section>
    );
  }
}

export default Collection;
