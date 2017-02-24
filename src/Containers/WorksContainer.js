import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setState} from '../redux/modules/state'


class Works extends Component {
  componentDidMount () {

    this.props.setState('loading')

  }

  render () {
    return (
        <div>Works</div>
    )}

}

const mapStateToProps =  state => {}
const mapDispatchToProps = {setState}

export default connect(null, mapDispatchToProps)(Works)
