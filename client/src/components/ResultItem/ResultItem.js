import React from "react";

const ResultItem = (props) => {
  return (
    <div class="card">
      <div class="card-content p-2">
        <a href={props.url} className="pr-20" target="_blank">
          {props.headline}
        </a>
        {props.children}
      </div>
    </div>
  );
};

export default ResultItem;
