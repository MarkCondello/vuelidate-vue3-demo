import RadioInput from './RadioInputWrapper.vue';
import '../scss/components/checkbox-radio.scss';
import '../scss/components/field.scss';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Inputs',
  component: RadioInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { RadioInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<radio-input v-bind="args" />',
});

export const Radio = Template.bind({});
// Radio.args = {
//   inputType: 'text',
//   inputName: "userName",
//   inputLabel: "Add your name",
//   inputPlaceholder: "Joe Bloggs",
// };
