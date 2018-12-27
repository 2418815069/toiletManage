/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';
import { action, actions  } from '@storybook/addon-actions';
import { withActions, decorate } from '@storybook/addon-actions';
//import { withNotes } from '@storybook/addon-notes';
const pickTarget = decorate([args => [args[0].target]]);
import { linkTo } from '@storybook/addon-links';
import { withInfo } from 'storybook-addon-vue-info'

import MyButton from './MyButton';
import Welcome from './Welcome';
import belstar from '../components/belstar'
import test from '../pages/test1'
// import App from '../pages/index'
import MyHeader from '../components/MyHeader'
import MyTitle from '../components/MyTitle'
import MyFooter from '../components/MyFooter'
import contact from '../components/contact'
import part1 from '../components/Pages2/part1'
import part2 from '../components/Pages2/part2'
import part3 from '../components/Pages2/part3'
import tableLeft from '../components/Pages3/tableLeft'
import tableRight from '../components/Pages3/tableRight'
import grid from '../components/Pages4/grid'
import * as all from './getalldata.js'
const button = () => `<button type="button">Hello World</button>`;
storiesOf('common component', module)
.add('MyHeader', withInfo({
  summary: 'MyHeader for MyComponent'
  })(() => ({
  components: { MyHeader },
  template: '<my-header title="header title"></my-header>'
})))
.add('MyFooter', withInfo({
  summary: 'MyFooter for MyComponent'
  })(() => ({
  components: { MyFooter },
  template: '<my-footer page="2" totelPage="30" printData="2017/10/31">',
})))
.add('MyTitle', withInfo({
  summary: 'MyTitle for MyComponent'
  })(() => ({
  components: { MyTitle },
  template: '<my-title  title="退保手续费率"></my-title>',
})))
.add('belstar', withInfo({
  summary: 'belstar for MyComponent'
  })(() => ({
  components: { belstar },
  template: '<belstar maintitle="百星安康宝年金保险条款" smalltitle="BEIJING BELSTAR" title="保险单">',
})))
.add('contact', withInfo({
  summary: 'contact for MyComponent'
  })(() => ({
  components: { contact },
  template: '<contact></contact>',
})));
storiesOf('Core|page2', module)
.add('part1', withInfo({
  summary: 'part1 for pages'
  })(() => ({
  components: { part1 },
  template: '<part1 :table1="table1" class="part"></part1> ',
  data(){
    return{
      table1: all.table1
    }
  }
})))
.add('part2', withInfo({
  summary: 'part2 for pages'
  })(() => ({
  components: { part2 },
  template: '<part2 :table2="table2" class="part"></part2> ',
  data(){
    return{
      table2: all.table2
    }
  }
})))
.add('part3', withInfo({
  summary: 'part 3for pages'
  })(() => ({
  components: { part3 },
  template: '<part3 :table3="table3" class="part"></part3>',
  data(){
    return{
      table3: all.table3
    }
  }
})));
storiesOf('page3', module)
.add('tableRight', withInfo({
  summary: 'tableRight for pages'
  })(() => ({
  components: { tableRight },
  template: '<table-right :tableright="tableRight"></table-right> ',
  data(){
    return{
      tableRight: all.tableRight
    }
  }
})))
.add('tableLeft', withInfo({
  summary: 'tableLeft for pages'
  })(() => ({
  components: { tableLeft },
  template: '<table-left :tableleft="tableLeft"></table-left>',
  data(){
    return{
      tableLeft: all.tableLeft
    }
  }
})));
storiesOf('page4', module)
.add('grid', withInfo({
  summary: 'grid for pages'
  })(() => ({
  components: { grid },
  template: '<grid :tabledata="table1"></grid> ',
  data(){
    return{
      table1: all.page4.table1
    }
  }
})));
storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('Hello World', () => withActions('click')(button))
  .add('Action only', () => ({
    components: { MyButton },
    template: '<my-button :handle-click="log">Click me to log the action</my-button>',
    methods: { 
      log: action('log1'),
     },
  }))
  .add('Multiple actions', () => ({
    template: '<my-button :handle-click="click" :handle-dblclick="doubleclick">(Double) click me to log the action</my-button>',
    methods: actions('click', 'doubleclick'),
  }));
/* eslint-enable react/react-in-jsx-scope */
storiesOf('Addons|Actions', module)
  .add('Hello World', () => withActions('click')(button))
  .add('Multiple actions', () => withActions('click', 'contextmenu')(button))
  .add('Multiple actions + config', () => withActions('click', 'contextmenu', { clearOnStoryChange: false })(button))
  .add('Multiple actions, object', () => withActions({ click: 'clicked', contextmenu: 'right clicked' })(button))
  .add('Multiple actions, selector', () =>
    withActions({ 'click .btn': 'clicked', contextmenu: 'right clicked' })(
      () => `
        <div>
          Clicks on this button will be logged: <button class="btn" type="button">Button</button>
        </div>
      `
    )
  )
  .add('Multiple actions, object + config', () =>
    withActions({ click: 'clicked', contextmenu: 'right clicked' }, { clearOnStoryChange: false })(button)
  )
  .add('Decorated actions', () => pickTarget.withActions('click', 'contextmenu')(button))
  .add('Decorated actions + config', () =>
    pickTarget.withActions('click', 'contextmenu', { clearOnStoryChange: false })(button)
  );


  storiesOf('Addon|Notes', module)
  // .addDecorator(withNotes)
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