import { storiesOf } from '@storybook/vue';
import Centered from '@storybook/addon-centered';

// import MyButton from './Button.vue';
import MyButton from './MyButton';
storiesOf('yrfugihiAddon|Centered', module)
  .addDecorator(Centered)
  .add('hhhrounded', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">A Button with rounded edges</my-button>',
  }));
