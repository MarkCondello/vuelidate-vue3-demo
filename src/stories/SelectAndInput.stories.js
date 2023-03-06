// import MyButton from './Button.vue';
import SelectAndInput from './SelectAndInputWrapper.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Inputs',
  component: SelectAndInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  // argTypes: {
  // },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SelectAndInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<select-and-input v-bind="args" />',
});

export const SelectInput = Template.bind({});
// SelectAndInput.args = {
//   inputType: 'text',
//   inputName: "userName",
//   inputLabel: "Add your name",
//   inputPlaceholder: "Joe Bloggs",
// };