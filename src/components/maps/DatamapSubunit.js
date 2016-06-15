import React, { Component, PropTypes } from 'react'
import d3 from 'd3'

export default class DatamapSubunit extends Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.state = {
      active: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const should = 
      //nextState.svgResized ||
      nextState.active !== this.state.active ||
      nextProps.fillColor !== this.props.fillColor ||
      nextProps.borderColor !== this.props.borderColor ||
      nextProps.path !== this.props.path
      console.log(should, this.props, nextProps);
    return should;
  }

  handleMouseEnter() {
    this.setState({ active: true })

    const { name, value, index } = this.props
    this.props.mouseEnterOnSubunit(name, value, index)
  }

  handleMouseLeave() {
    this.setState({ active: false })
  }

  render() {
    console.log('renderSubunit');
    const subutniStyle = {
      fill: this.state.active ? '#FFCCBC' : this.props.fillColor,
      stroke: this.state.active ? '#FF5722' : this.props.borderColor,
      strokeWidth: this.state.active ? 2 : 0.5,
    }
    return (
      <path
        className="datamap-subunit"
        style={subutniStyle}
        d={this.props.path()}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    )
  }
}

DatamapSubunit.propTypes = {
  path: PropTypes.func.isRequired,
  mouseEnterOnSubunit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fillColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}
