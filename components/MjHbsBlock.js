import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-hero': ['mj-hbs-block'],
  'mj-column': ['mj-hbs-block'],
  // Tell the validator which tags are allowed as our component's children
  'mj-hbs-block': [
    'mj-accordion',
    'mj-button',
    'mj-carousel',
    'mj-divider',
    'mj-html',
    'mj-image',
    'mj-raw',
    'mj-social',
    'mj-spacer',
    'mj-table',
    'mj-text',
    'mj-navbar'
  ],
})

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class MjHbsBlock extends BodyComponent {
  static allowedAttributes = {
    'helper': 'string',
    'args': 'string',
  }

  render() {
    return `
      {{#${this.getAttribute('helper')} ${this.getAttribute('args')}}}
        ${this.renderChildren(
          this.props.children,
          {
            /* The rawXML option prevents processing on children : we already call this.renderMJML on the whole block so we don't want the children to be processed twice */
            rawXML: true,
            /* The renderer option allows to use a specific rendering function, or wrap each child if needed. Below is the default, see mj-column code for an example of this. */
            renderer: component => component.render,
          }
        )}
      {{/${this.getAttribute('helper')}}}
		`
  }
}
