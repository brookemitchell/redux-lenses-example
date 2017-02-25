import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setState} from '../redux/modules/state'


class Works extends Component {
  componentDidMount () {
    this.props.getWorks()
  }

  render () {
    return (
        <div>Works</div>
    )}

}

const mapStateToProps =  state => {}
const mapDispatchToProps = {setState, getWorks }

export default connect(null, mapDispatchToProps)(Works)
