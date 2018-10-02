import React from 'react';


const Section = (props) => {
    return(<div style={{ display: "flex", justifyContent: "center" }} className="container">
        <div className="card mt-20 ml-50" style={{ width: "800px" }}>
          <div class="card-header">{props.header}</div>
          {props.children}
        </div>
    </div>)
}

export default Section;