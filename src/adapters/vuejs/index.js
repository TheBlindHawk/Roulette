import JSRoulette from '../../index'

export const roulette = {
  props: ['board', 'arrow', 'settings', 'sections', 'audio', 'onstart', 'onstop'],

  setUp(props) {
    this.props = props
  },

  data() {
    return { roulette: {} }
  },

  mounted() {
    // eslint-disable-next-line no-undef
    const container = document.getElementById('blindhawk_roulette')
    this.roulette = new JSRoulette({ ...this.props, container })
  },
  template: `<div id="blindhawk_roulette" />`,
}

export default roulette
