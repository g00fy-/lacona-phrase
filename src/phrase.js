import inherits from 'inherits'
import {version} from '../package'

export function createElement(Constructor, props, ...children) {

  return {
    Constructor: Constructor,
    props: props,
    children: children,
    version: version
  }
}

export function createFactory(constructor) {
  return createElement.bind(null, constructor)
}

export class Phrase {}

export function createPhrase(options) {
  const Constructor = options.onCreate || function () {}

  inherits(Constructor, Phrase)

  Constructor.translations = options.translations
  Constructor.supplements = options.supplements
  Constructor.overrides = options.overrides
  Constructor.defaultProps = options.defaultProps
  Constructor.initialState = options.initialState

  for (let key in options) {
    if (typeof options[key] === 'function') {
      Constructor.prototype[key] = options[key]
    }
  }
  return Constructor
}

export const choice = createFactory('choice')
export const content = createFactory('content')
export const literal = createFactory('literal')
export const separator = createFactory('separator')
export const sequence = createFactory('sequence')
export const value = createFactory('value')
