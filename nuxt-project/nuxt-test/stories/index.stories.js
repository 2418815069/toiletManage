/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action,withActions, decorate } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import MyButton from './MyButton';
import Welcome from './Welcome';
import { withOptions } from '@storybook/addon-options';
import { withKnobs, text, number, boolean, array, select, color, date, button } from '@storybook/addon-knobs';

const logger = console;
import centered from '@storybook/addon-centered/html';

storiesOf('Addons|Centered', module)
  .addDecorator(centered)
  .add('button in center', () => '<button>I am a Button !</button>');

storiesOf('Addon|Knobs', module)
  .addDecorator(withKnobs)
  .add('Simple', () => ({
    props: {
      name: {
        type: String,
        default: text('Name', 'John Doe'),
      },
    },

    template: `<div @click="age++">I am {{ name }} and I'm {{ age }} years old.</div>`,

    data() {
      return { age: 40 };
    },

    created() {
      logger.log('created');
    },
    destroyed() {
      logger.log('destroyed');
    },
  }))
  .add('All knobs', () => {
    const name = text('Name', 'Jane');
    const stock = number('Stock', 20, {
      range: true,
      min: 0,
      max: 30,
      step: 5,
    });
    const fruits = {
      Apple: 'apples',
      Banana: 'bananas',
      Cherry: 'cherries',
    };
    const fruit = select('Fruit', fruits, 'apples');
    const price = number('Price', 2.25);

    const colour = color('Border', 'deeppink');
    const today = date('Today', new Date('Jan 20 2017 GMT+0'));
    const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
    const nice = boolean('Nice', true);

    const stockMessage = stock
      ? `I have a stock of ${stock} ${fruit}, costing &dollar;${price} each.`
      : `I'm out of ${fruit}${nice ? ', Sorry!' : '.'}`;
    const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    button('Arbitrary action', action('You clicked it!'));

    return {
      template: `
          <div style="border:2px dotted ${colour}; padding: 8px 22px; border-radius: 8px">
            <h1>My name is ${name},</h1>
            <h3>today is ${new Date(today).toLocaleDateString('en-US', dateOptions)}</h3>
            <p>${stockMessage}</p>
            <p>Also, I have:</p>
            <ul>
              ${items.map(item => `<li key=${item}>${item}</li>`).join('')}
            </ul>
            <p>${salutation}</p>
          </div>
        `,
    };
  })
  .add('XSS safety', () => ({
    template: `
      <div>
        ${text('Rendered string', '<img src=x onerror="alert(\'XSS Attack\')" >')}
      </div>
    `,
  }));
storiesOf('Welcome', module).add('to Storybook', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}));

  storiesOf('Addon|Notes', module)
  .addDecorator(withNotes)
  .add(
    'Simple note',
    () => ({
      template:
        '<p><strong>Etiam vulputate elit eu venenatis eleifend. Duis nec lectus augue. Morbi egestas diam sed vulputate mollis. Fusce egestas pretium vehicula. Integer sed neque diam. Donec consectetur velit vitae enim varius, ut placerat arcu imperdiet. Praesent sed faucibus arcu. Nullam sit amet nibh a enim eleifend rhoncus. Donec pretium elementum leo at fermentum. Nulla sollicitudin, mauris quis semper tempus, sem metus tristique diam, efficitur pulvinar mi urna id urna.</strong></p>',
    }),
    { notes: 'My notes on some bold text' }
  )
  .add(
    'Note with HTML',
    () => ({
      template: '<p>🤔😳😯😮<br/>😄😩😓😱<br/>🤓😑😶😊</p>',
    }),
    {
      notes: `
      <h2>My notes on emojies</h2>

      <em>It's not all that important to be honest, but..</em>

      Emojis are great, I love emojis, in fact I like using them in my Component notes too! 😇
    `,
    }
  );
/* eslint-enable react/react-in-jsx-scope */
