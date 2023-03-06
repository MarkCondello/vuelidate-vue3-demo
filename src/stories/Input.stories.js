// import MyButton from './Button.vue';
import InputField from './InputWrapper.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Inputs',
  component: InputField,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    inputType: {
      table: {
        disable: true,
      },
    },
    // backgroundColor: { control: 'color' },
    // onClick: { action: 'clicked' },
    // size: {
    //   control: { type: 'select' },
    //   options: ['small', 'medium', 'large'],
    // },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { InputField },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // const editedArgs = Object.assign({}, args)
    // delete editedArgs.inputType
    // console.log({editedArgs})

    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<input-field v-bind="args" />',
});

export const TextInput = Template.bind({});
TextInput.args = {
  inputType: 'text',
  inputName: "userName",
  inputLabel: "Add your name",
  inputPlaceholder: "Joe Bloggs",
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  inputType: 'email',
  inputName: "userEmail",
  inputLabel: "Add your email",
  inputPlaceholder: "Joe Bloggs",
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  inputType: 'number',
  inputName: "userNumber",
  inputLabel: "Add your age",
  inputPlaceholder: "Joe Bloggs",
};

export const MoneyInput = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
MoneyInput.args = {
  inputType: 'money',
  inputName: "userIncome",
  inputLabel: "Add your income",
  inputPlaceholder: "1,234",
  inputPrefix: "$",
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  inputType: 'password',
  inputName: "userPassword",
  inputLabel: "Add your password",
  inputPlaceholder: "123abc",
};
