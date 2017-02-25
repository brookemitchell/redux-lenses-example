import R from 'ramda'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getWorks} from '../redux/modules/state'

const divEntry = col => <div key={col.id}> {JSON.stringify(col)} </div>

class Works extends Component {
  componentDidMount () {
    this.props.getWorks()
  }

  render () {
    const entries = R.map(divEntry, this.props.works)
    return <div> {Object.values(entries)} </div>
  }

}

const mapStateToProps =  state => ({
  works: state.works.works
})
const mapDispatchToProps = {getWorks }

export default connect(mapStateToProps, mapDispatchToProps)(Works)
