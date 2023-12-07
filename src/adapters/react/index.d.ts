import React from 'react'
import Construct from '../../utils/construct'

export type Format = 'CODE128' | 'EAN' | 'CODE39' | 'ITF' | 'MSI' | 'Pharmacode' | 'Codabar'

declare class Roulette extends React.PureComponent<Omit<Construct, 'container'>, unknow> {}

export default Roulette
