import React from 'react'
import { OptionalConstruct } from '../../utils/construct'

export type Format = 'CODE128' | 'EAN' | 'CODE39' | 'ITF' | 'MSI' | 'Pharmacode' | 'Codabar'

declare class Roulette extends React.PureComponent<Omit<OptionalConstruct, 'container'>, unknow> {}

export default Roulette
