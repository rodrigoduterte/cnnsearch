import React from "react";

class YearPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.props.onYearPickerChange(parseInt(e.target.value));
  }

  initializeSelect() {
    var addone = [1, 0];
    var yrdiff = new Date().getFullYear() - this.props.yrselect + addone[0];
    if (!this.props.disabled) {
      return (
        <select
          disabled={this.props.disabled}
          onChange={e => this.handleChange(e)}
          className="input-control select pl-3"
        >
          <option>Select a year</option>
          {Array(yrdiff)
            .fill(this.props.yrselect + addone[1])
            .map((val, idx) => (
              <option data-yr={val + idx}> {val + idx} </option>
            ))}
        </select>
      );
    } else {
      return (
        <div className="input-control text pl-3">{this.props.yrselect}</div>
      );
    }
  }

  render() {
    return <div>{this.initializeSelect()}</div>;
  }
}

export default YearPicker;