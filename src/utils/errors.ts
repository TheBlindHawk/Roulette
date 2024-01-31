const errors = {
  invalidContainer: (container: string) => 'Invalid container "' + container + '". Please provide a valid container',
  invalidSection: (index: number) => 'Error tryi ' + index + '. Please provide a valid section',
  index_out_of_bounds: (index: number) => 'Index ' + index + ' is out of bounds. Please provide a valid index',
  probability_mismatch: 'Probability array lenght does not match Rolls array lenght',
  roulette_is_rolling: 'Roulette is still rolling. Please wait for the roulette to stop before re-rolling',
  roulette_no_such_value:
    'Roulette could not find the value you requested. Please use rollByIndex if you wish to roll by index number',
}
export default errors
