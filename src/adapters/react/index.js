import React from 'react'
import JSRoulette from '../../index'
import PropTypes from 'prop-types'

export default class Roulette extends React.PureComponent {
  static PropTypes = {
    props: PropTypes.object.isRequired,
    roulette: PropTypes.object,
    container: PropTypes.object,
  }

  static defaultProps = {
    roulette: {},
    container: {},
  }

  constructor(props) {
    super(props)
    this.props = props
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    this.container = document.getElementById('blindhawk_roulette')
    this.roulette = new JSRoulette({
      props: this.props,
      container: this.container,
    })
  }

  render() {
    this.update()
    return <div id="blindhawk_roulette" />
  }
}
