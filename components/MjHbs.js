import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-hero': ['mj-hbs'],
  'mj-column': ['mj-hbs'],
  // Tell the validator which tags are allowed as our component's children
  'mj-hbs': [],
})

export default class MjHbs extends BodyComponent {
  static allowedAttributes = {
    'helper': 'string',
    'args': 'string',
  }
  static rawElement = true;
  static endingTag = true;

  render() {
    return `{{${this.getAttribute('helper')} ${this.getAttribute('args')}}}`
  }
}
