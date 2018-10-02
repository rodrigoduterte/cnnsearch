import React from 'react';
import Collection from '../Collection';
import API from '../../utils/API';

class Saved extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            saved : []
        }
    }

    componentDidMount() {
        API.getArticles()
        .then(res => 
          this.setState({ saved: res.data })
        )
      }    

    render(){
        return (
            <Collection header="Saved Articles" saved={true} items={this.state.saved}/>
        )
    }
    
}

export default Saved;