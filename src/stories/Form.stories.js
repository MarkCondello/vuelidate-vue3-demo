// import { within, userEvent } from '@storybook/testing-library';
import MyForm from './Form.vue';

export default {
  title: 'Example/Form',
  component: MyForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyForm },

  // Here we define the `template`
  template: '<my-form />',
});

export const Standard = Template.bind({});
