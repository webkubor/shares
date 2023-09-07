<template>
  <n-space vertical>
    <n-card title="贷款计算器">
      <n-form label-placement="left" label-width="auto">
        <n-form-item label="贷款金额">
          <n-input-number v-model:value="model.loanAmount" :parse="parse"  :format="format"  show-count clearable />
        </n-form-item>
        <n-form-item label="年利率">
          <n-input-number v-model:value="model.annualInterestRate" maxlength="30" show-count clearable />
        </n-form-item>
        <n-form-item label="总贷款-年数">
          <n-input-number v-model:value="model.years" maxlength="30" show-count clearable />
        </n-form-item>
      </n-form>
    </n-card>
    <div class="border-box">
      <div class="info-item">
        <h3>等额本息贷款</h3>
        <div>总偿还: {{ equalPrincipalPayments.totalPayment }} 元</div>
        <div>总利息: {{ equalPrincipalPayments.totalInterest }} 元</div>
        <div>总偿还: {{ equalPrincipalPayments.totalMonths }} 月</div>
      </div>
      <div class="info-item">
        <h3>等额本金贷款</h3>
        <div>总偿还: {{ equalInstallmentPayments.totalPayment }} 元</div>
        <div>总利息: {{ equalInstallmentPayments.totalInterest }} 元</div>
        <div>总偿还: {{ equalInstallmentPayments.totalMonths }} 月</div>
      </div>
    </div>

  </n-space>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import Big from 'big.js';

let model = reactive({
  loanAmount: 100000,
  years: 5,
  annualInterestRate: 0.05,
})

let monthlyInterestRate = computed(() => {
  if (model.annualInterestRate) {
    return model.annualInterestRate / 12;
  } else {
    return 0
  }
})

let parse =  (input: string) => {
        const nums = input.replace(/,/g, '').trim()
        if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
        return nums === '' ? null : Number.NaN
      }

    let  format = (value: number | null) => {
        if (value === null) return ''
        return value.toLocaleString('en-US')
      }

// 计算等额本金贷款
let equalPrincipalPayments = computed(() => {
  if (model.years && model.loanAmount && model.annualInterestRate) {
    return calculateEqualPrincipalLoan(model.years, monthlyInterestRate.value, model.loanAmount)
  } else {
    return { totalMonths: 0, totalPayment: 0, totalInterest: 0 };
  }
})

// 等额本息贷款
let equalInstallmentPayments = computed(() => {
  if (model.years && model.loanAmount && model.annualInterestRate) {
    return calculateEqualInstallmentLoan(model.years, monthlyInterestRate.value, model.loanAmount)
  } else {
    return { totalMonths: 0, totalPayment: 0, totalInterest: 0 };
  }
})


// 计算等额本金贷款
function calculateEqualPrincipalLoan(years, annualInterestRate, loanAmount) {
  const totalMonths = years * 12;
  const monthlyInterestRate = new Big(annualInterestRate).div(12);
  const monthlyPrincipal = new Big(loanAmount).div(totalMonths);

  let totalInterest = new Big(0);
  for (let i = 0; i < totalMonths; i++) {
    totalInterest = totalInterest.plus(
      new Big(loanAmount).minus(new Big(i).times(monthlyPrincipal)).times(monthlyInterestRate)
    );
  }

  const totalPayment = new Big(loanAmount).plus(totalInterest);

  return { totalMonths, totalPayment: totalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2) };
}

// 计算等额本息贷款
function calculateEqualInstallmentLoan(years, annualInterestRate, loanAmount) {
  const totalMonths = years * 12;
  const monthlyInterestRate = new Big(annualInterestRate).div(12);
  const monthlyPayment = new Big(loanAmount).times(monthlyInterestRate)
    .div(new Big(1).minus(new Big(1).div(new Big(1).plus(monthlyInterestRate).pow(totalMonths))));

  const totalPayment = monthlyPayment.times(totalMonths);
  const totalInterest = totalPayment.minus(loanAmount);

  return { totalMonths, totalPayment: totalPayment.toFixed(2), totalInterest: totalInterest.toFixed(2) };
}


</script>
<style lang="scss" scoped>
.border-box {
  padding: 10px 30px;

  .info-item {
    font-size: 14px;
    font-weight: 500;
    display: inline-block;
    border: 1px dotted #999999;
    padding: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
