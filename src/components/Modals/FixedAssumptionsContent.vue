<template>
<div id="fixed-assumptions-content">
	<div class="sgy-h3">Fixed Assumptions</div>
	  <ul>
			<li>The estimates produced by this calculator are based on default assumptions (factors which you may change) and statutory assumptions (rates or amounts fixed by legislation e.g. rates of taxation) which are considered reasonable at the current date based on long-term actuarial modelling. However, actual events can turn out differently.</li>
 			<li>Contributions - the calculator works out whether before or after-tax contributions are better for you based on your income tax rates, contributions caps and whether you may qualify for government contributions.  The most advantageous combination may change in the future depending on your situation, so you should review this at least annually. The calculator cannot take account past contributions and therefore assumes that you will not exceed your concessional or non-concessional contributions caps. This also means that no allowance has been made for the use of the 'bring forward' rule for non-concessional contributions.</li>
 
			<li>
				<div>The default assumed investment returns have been set based on long-term economic modelling (by JANA Investment Advisors) and are considered reasonable long-term estimates at the current date. Actual returns will vary significantly from year to year and could be negative in some years, particularly for investment mixes where more is invested in shares and property.</div>
				<div>There is a lot to consider when comparing investment options between funds. Risk and return objectives and asset allocation within investment options may differ between funds and should be taken into account when comparing funds.</div>
				<div>The default returns are illustrative only and should not be taken to provide an estimate of the amount of investment earnings you will receive. The rate of investment return is assumed to remain constant over the projection period. If you have a short investment time horizon (for example less than 10 years) you may wish to consider current economic conditions in setting the investment return. You can edit the assumed rate of investment returns on the Variable Assumptions panel.</div>
			</li>
			<li>The assumed variable fee is expressed as an annual percentage of your super balance. The default value of this item is based on the percentage-based variable fees (including indirect cost ratio) for investment options with similar risk profiles in the Equip fund (other fees and charges apply which may impact the projected super balance). The calculator deducts these amounts from the investment return shown prior to calculating earnings for each year.</li>
			<li>The assumed fixed fees are deductions expressed as an annual dollar amount, which includes dollar-based fixed fees. The default value of this is based on the flat fixed fee for members. Fees may vary between products and accounts.</li>
			<li>The calculator does not consider your total superannuation balance (TSB) for the purposes to work out your eligibility to make certain types of contributions. For 2023/24 the relevant threshold is $1.9m. For example, if your TSB exceeds this amount, then you cannot make any non-concessional contributions to your super. Where your TSB is at or near the threshold you should obtain more information and seek financial advice on how this will affect you.</li>
			<li>Income is considered to be your annual income from employment before tax, including any bonus payments and income that is salary sacrificed.  It excludes any employer superannuation contributions and other packaged benefits.</li>
			<li>This calculator does not consider eligibility for a downsizer superannuation contribution (a one-off post-tax contribution for over 55 year olds of up to $300,000 from the proceeds of selling their home).</li>
			<li>Working life - the calculator assumes that you will have a continuous working life with no breaks up to your retirement age. We have assumed a default retirement age of 67 as this is the age to qualify for Government Age Pension benefits.</li>
			<li>Employer contributions - the calculator assumes that where a person enters into a salary sacrifice arrangement, their employer will still make the 11% superannuation guarantee payments on their income. The calculator limits the default SG payments to 11% of the maximum superannuation contribution base per quarter (set by the Government) and does not include SG payments for the part of earnings above this limit.</li>
			<li>LISTO - the calculator assumes that you are eligible for the government Low Income Superannuation Tax Offset (LISTO) if your income is below the relevant threshold. However, other eligibility criteria apply for the LISTO which the calculator does not consider.</li>
			<li>Tax on super contributions - it is assumed that you have provided your tax file number (TFN) to your superannuation fund and that, consequently the usual concessional tax rate of 15% tax is deducted from employer contributions including before-tax (salary sacrifice) contributions. Where applicable an estimate of the Division 293 additional contribution tax for those on incomes over the relevant threshold has been included. The calculator assumes that you will not breach your concessional and non-concessional contributions caps and therefore no allowance is made for any additional tax that may be payable on excess contributions as a result.  No allowance is made for any other tax on super.  The total income used by the calculator to estimate the applicable Division 293 tax is equal to your annual salary before tax and before any salary sacrifice.  Any income from other sources and other available adjustments are not included in an estimate of total income.  For the full definition of 'income' used by the Australian Taxation Office (ATO) and other details on Division 293 tax and excess contribution rules, refer to the ATO website at ato.gov.au.  The tax assumptions used are general in nature only and do not constitute tax advice.  Please see your tax adviser for advice that is specific to your individual circumstances.</li>
			<li>Tax on current income - the calculator works out the income tax payable on the current income you have entered by applying the current financial year's personal income tax rates and the Medicare levy where it applies based on the individual thresholds.  The actual Medicare levy may be different than calculated.  Any other form of income you receive has not been taken into account.  No allowance has been made for the Medicare Levy Surcharge.</li>
			<li>From 1 July 2025, an additional tax of 15% will apply to earnings if your total superannuation balance exceeds $3million.</li>
			<li>You are assumed to be an Australian resident for tax purposes.</li>
			<li>You can enter the insurance premiums that are charged annually to your account. We assume the same amount (in today's dollars) will be deducted in future years until retirement. We make a default insurance premium assumption of $234 will be charged on average and will increase with inflation each year. This assumption is based on insurance premiums within Equip Super's Age-based Smart Cover for an individual at age 40 with $225,000 of death and TPD cover. This assumption will vary based on your personal circumstances and you can edit the assumed insurance premium on the Variable Assumptions panel. Setting insurance premiums at $0 will make a fees comparison easier if you wish to assess the insurance premiums and cover provided separately. We assume that insurance premiums are tax deductible within super.</li>
			<li>Salary inflation, is a percentage that is in line with the average Australian Bureau of Statistics annual wage growth over a decade to March 2023.</li>
	</ul>
</div>
<button
 	aria-label="Close modal"
	id="SGY-close-modal-button"
	tabindex="0"
	type="button"
	@click="modalStore.showModal = false"
>
	<Cross />
</button>
</template>
<script setup>
import Cross from '../icons/CrossClose.vue'
import { useModalStore } from '~/stores/modal.js'
  const modalStore = useModalStore()
</script>
