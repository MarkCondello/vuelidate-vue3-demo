<template>
<!-- These elements below are used to check the characters width -->
<!-- <h2>{{OS}}</h2> -->
<!--
  <div ref="characterChart" v-if="false">
     <span class="test-char">,</span>
    <span class="test-char" v-for="(thing, index) in 'TECHNIQUES'" :key="index">{{index}}</span>
  </div>
  <div v-if="characterWidthsChart">{{characterWidthsChart}}</div>
  <label class="sgy-inline-field" v-if="false">
    <div class="sgy-inline-field-input">
      <input value=",0123456789">
    </div>
  </label> -->
<!-- These elements above are used to check the characters width -->
  <label
    class="sgy-inline-field"
    :id="$attrs.id"
    :for="inputName"
    :class="$attrs['class'], {
      'sgy-field-error': inputErrors.length,
      'sgy-field-valid': inputIsValid,
      'sgy-field-disabled': inputIsDisabled,
    }"
    :style="[globalDesktopWidth && inputWidth ? {'max-width': `${inputWidth + (OS === 'iOS' ? 10 : 0)}px`, ...$attrs['style']} : {...$attrs['style']}]"
  >
  <!-- We need to pass the max-width dynamic styles only if the globalDesktopWidth and inputWidth settings are set -->
    <span v-if="inputLabel" class="sgy-inline-field-label">{{ inputLabel }}</span>
    <div
      class="sgy-inline-field-input"
      :class="{'sgy-focused': inputFocused}"
      >
      <div class="sgy-field-prefix" v-if="inputPrefix" ref="prefix">
        {{ inputPrefix }}
      </div>
      <input
        :inputmode="$attrs.inputmode"
        :pattern="$attrs.pattern"
        :class="{
          'sgy-field-has-prefix': inputPrefix,
          'sgy-field-has-sufix': inputSufix,
          'sgy-valid-input-class-not-used-atm': inputIsValid,
        }"
        :disabled="inputIsDisabled"
        :name="inputName"
        :id="inputName"
        :placeholder="inputPlaceholder"
        :value="inputModel"
        tabindex="0"
        @input="$emit('updatedInput', $event.target.value)"
        @focus="$emit('focusedInput'); inputFocused = true"
        @blur="$emit('blurredInput'); updateFieldWidth($event.target.value, false); inputFocused = false"
        @keydown.tab="$emit('keyTabPressedInput'); inputFocused = false"
        @keyup="updateFieldWidth($event.target.value); inputFocused = true"
      >
        <div class="sgy-field-suffix" v-if="inputSufix" ref="sufix">
        {{ inputSufix }}
      </div>
    </div>
  </label>
  <ErrorMessageList :inputErrors="inputErrors" v-if="showErrors"/>
</template>

<script setup>
import { toRefs, ref, defineEmits, onMounted, reactive } from 'vue'

import Formatter from '../../js/helpers/formatter'
import ErrorMessageList from './ErrorMessageList.vue'

const emit = defineEmits(['updatedInput', 'focusedInput', 'blurredInput', 'keyTabPressedInput'])
const props = defineProps({
  inputModel: {
    type: [String, Number],
  },
  inputErrors: {
    type: Array,
  },
  inputIsValid: {
    type: Boolean,
  },
  inputName: {
    type: String,
    required: true,
  },
  inputLabel: {
    type: String,
  },
  inputPlaceholder: {
    type: [String, Number],
  },
  inputIsDisabled: {
    type: Boolean,
    default: false,
  },
  inputPrefix: {
    type: String,
  },
  inputSufix: {
    type: String,
  },
  showErrors: {
    type: Boolean,
    default: false,
  },
  // this prop below should be set on a project by project basis (depends if we need dynamic widths or not). If globalDesktopWidth is not set, dynamic widths will not work
  globalDesktopWidth: {
    type: Number,
    required: false,
  },
  minWidthDesktop: {
    type: Number,
    default: 102,
  },
  minWidthMobile: {
    type: Number,
    default: 87,
  },
}),
{
  inputModel,
  inputErrors,
  inputIsValid,
  inputName,
  inputLabel,
  inputPlaceholder,
  inputIsDisabled,
  inputPrefix,
  inputSufix,
  showErrors,
  // dynamic width props below
  globalDesktopWidth,
  minWidthDesktop,
  minWidthMobile
} = toRefs(props),
  inputFocused = ref(false),
// these properties and functions below are used for the dynamic width settings
  pageWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
  isDesktop = ref(null),
  resizeTimer = ref(null),
  keyDownTimer = ref(null),
  inputWidth = ref(0),
  characterChart = ref(),
  prefix = ref(),
  sufix = ref(),
  OS = ref(''),
  // not proud of how these character settings below are made, but it works consistently
  characterWidthsChart = reactive({}), // this is only used to get the correct values used below, not providing consistent results to be used dynamically unfort
  characterDesktopWidths = {"0":16.640625,"1":7.25,"2":13.734375,"3":14.125,"4":14.53125,"5":14.703125,"6":15.125,"7":15.125,"8":14.640625,"9":15.125,",":4.28125},
  characterMobileWidths = {"0":13.875,"1":6.046875,"2":11.453125,"3":11.765625,"4":12.109375,"5":12.25,"6":12.609375,"7":12.609375,"8":12.203125,"9":12.609375,",":3.5625},
 
 updateFieldWidth = (inputValue, emitEvent = true) => {
    if (globalDesktopWidth.value) {
      if (inputValue && inputValue.length) {
        clearTimeout(keyDownTimer.value)
        let minCharsForWidthUpdate = 4
        if (emitEvent) {
          emit('blurredInput') // We emit the blurr event to have the formatting applied to the input
        } else {
          minCharsForWidthUpdate = 1 // if it is a blur event, reset to 1 character
        }
        keyDownTimer.value = setTimeout(() => {
          // The input will receive formatting on blur which will return NaN when running this formatWithCommas function. It needs to be stripped first.
          const formattedInputValue = Formatter.formatWithCommas(Formatter.stripNonIntegers(inputValue)),
            inputCharLength = formattedInputValue.length
            // console.log('Reached updateFieldWidth', {formattedInputValue, inputCharLength})
          if (inputCharLength > minCharsForWidthUpdate && inputCharLength <= 10) { // these vals should probs be props
            updateWidthByBreakpointSettings(formattedInputValue)
          }
        }, 150)
      } else {
        setFieldWidth() // reset to default if no value is added
        if (emitEvent) {
          emit('blurredInput')
        }
      }
    }
  },
  updateWidthByBreakpointSettings = (inputValueFormatted) => {
    const commasLength = inputValueFormatted.split(",").length - 1,
      zeroLength = inputValueFormatted.split("0").length - 1,
      oneLength = inputValueFormatted.split("1").length - 1,
      twoLength = inputValueFormatted.split("2").length - 1,
      threeLength = inputValueFormatted.split("3").length - 1,
      fourLength = inputValueFormatted.split("4").length - 1,
      fiveLength = inputValueFormatted.split("5").length - 1,
      sixLength = inputValueFormatted.split("6").length - 1,
      sevenLength = inputValueFormatted.split("7").length - 1,
      eightLength = inputValueFormatted.split("8").length - 1,
      nineLength = inputValueFormatted.split("9").length - 1

    let inputCharacterLength = 4 // input padding
    if (commasLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths[','] * commasLength : characterMobileWidths[','] * commasLength
    }
    if (zeroLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['0'] * zeroLength : characterMobileWidths['0'] * zeroLength
    }
    if (oneLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['1'] * oneLength : characterMobileWidths['1'] * oneLength
    }
    if (twoLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['2'] * twoLength : characterMobileWidths['2'] * twoLength
    }
    if (threeLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['3'] * threeLength : characterMobileWidths['3'] * threeLength
    }
    if (fourLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['4'] * fourLength : characterMobileWidths['4'] * fourLength
    }
    if (fiveLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['5'] * fiveLength : characterMobileWidths['5'] * fiveLength
    }
    if (sixLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['6'] * sixLength : characterMobileWidths['6'] * sixLength
    }
    if (sevenLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['7'] * sevenLength : characterMobileWidths['7'] * sevenLength
    }
    if (eightLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['8'] * eightLength : characterMobileWidths['8'] * eightLength
    }
    if (nineLength) {
      inputCharacterLength += isDesktop.value ? characterDesktopWidths['9'] * nineLength : characterMobileWidths['9'] * nineLength
    }

    if (prefix.value) inputCharacterLength += prefix.value.getBoundingClientRect().width
    if (sufix.value) inputCharacterLength += sufix.value.getBoundingClientRect().width
    // if (OS.value === 'iOS') inputCharacterLength += 10 // ios does not render characters the same for some fucked up reason

    inputWidth.value = inputCharacterLength
    // console.log({inputCharacterLength, inputWidth: inputWidth.value, characterWidthsChart})
  },
  setFieldWidth = () => {
    if (globalDesktopWidth.value) {
      if (inputModel.value) {
        updateWidthByBreakpointSettings(inputModel.value) // set the width of the field to the model value by default
      } else if (inputPlaceholder.value) {
        updateWidthByBreakpointSettings(inputPlaceholder.value) // set the width of the field to the placeholder by default
      } else {
        if (isDesktop.value && minWidthDesktop.value) {
          inputWidth.value = minWidthDesktop.value
        }
        if (!isDesktop.value && minWidthMobile.value) {
          inputWidth.value = minWidthMobile.value
        }
      }
    }
  },
  getPageSettings = () => {
    if (characterChart.value) { // this ref is set to v-if=false in the template above, set it to true to get the values and hard code them into the characterMobileWidths and characterDesktopWidths
      const dynamicWidthsCharacterReference = Array.from(characterChart.value.querySelectorAll('span'))
      dynamicWidthsCharacterReference.forEach((characterReference) => {
        characterWidthsChart[characterReference.innerHTML] = characterReference.getBoundingClientRect().width // inconsistent results
      })
    }
    if (globalDesktopWidth.value && minWidthDesktop.value && minWidthMobile.value) {
      isDesktop.value = pageWidth.value >= globalDesktopWidth.value ? true : false // We need to set the desktop width through props and global settings
    }
  },
  getOperatingSystem = () => {
    const platform = navigator.platform
    let operatingSystem

    if (platform.indexOf("Win") !== -1) {
      operatingSystem = "Windows"; // havn't tested Windows os
    } else if (platform.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS"; // the current characterWidthsChart settings work fine on MacOS
    } else if (platform.indexOf("Linux") !== -1) {
      operatingSystem = "Linux"; // havn't tested linux os
    } else if (platform.indexOf("iPhone") !== -1 || platform.indexOf("iPad") !== -1) {
      operatingSystem = "iOS";
    } else if (platform.indexOf("Android") !== -1) {
      operatingSystem = "Android"; // the current characterWidthsChart settings work fine on Android
    } else {
      operatingSystem = "Unknown";
    }
    return operatingSystem;
  }

window.addEventListener('resize', () => {
  const updatedPageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (updatedPageWidth !== pageWidth.value) {

    clearTimeout(resizeTimer.value)
    resizeTimer.value = setTimeout(() =>{

      pageWidth.value = updatedPageWidth
      getPageSettings()
      if (inputModel.value) {
        updateFieldWidth(inputModel.value)
      } else {
        setFieldWidth()
      }
      // console.log('Reached resize', inputModel.value)
    }, 500)
  }
})

onMounted(()=>{
  // console.log('InlineInputField Mounted ya mum')
  getPageSettings()
  setFieldWidth()
  OS.value = getOperatingSystem()
})
</script>
<style>
.test-char {
  background: none;
  border: none;
  flex: 1 1 0;
  font-size: 24px;
  font-family: "DM Sans", sans-serif;
  letter-spacing: 0px;
  outline: none;
  width: 100%;
}
</style>
