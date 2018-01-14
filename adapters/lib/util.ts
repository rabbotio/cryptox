class Util {
  static getPairInfo(pair, from, to) {
    // Rate
    let rate = pair[(`${from}_${to}`)]
    if (rate) return rate

    // Swap?
    const _swapped = pair[`${to}_${from}`]
    if (!_swapped) throw new Error(`Pair not exist : ${from}_${to}`)
    const swapped = Object.assign({}, _swapped)

    // Swap from normal rate
    swapped.last = 1 / swapped.last
    swapped.pair = `${from}_${to}`
    return swapped
  }
}

export default Util