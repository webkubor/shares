<template>
  <n-space vertical>
    <n-card title="贷款计算器">
      <n-form label-placement="left" label-width="auto">
        <n-form-item label="贷款金额">
          <n-input-number v-model:value="model.loanAmount" :parse="parse" :format="format" show-count clearable />
        </n-form-item>
        <n-form-item label="年利率">
          <n-input-number v-model:value="model.annualInterestRate" maxlength="30" show-count clearable />
        </n-form-item>
        <n-form-item label="期限(年)">
          <n-input-number v-model:value="model.years" maxlength="30" show-count clearable />
        </n-form-item>
      </n-form>
    </n-card>
    <div class="border-box">
      <div class="info-item">
        <h3>等额本息贷款</h3>
        <p>
          每月偿还固定金额，包括本金和利息。
          初期还款主要是利息，后期逐渐减少，本金逐渐增加。
        </p>
        <div>每月偿还: {{ equalInstallmentPayments.monthlyPayment }} 月</div>
        <div>累计还款总额: {{ equalInstallmentPayments.totalPayment }} 元</div>
        <div>累计支付利息: {{ equalInstallmentPayments.totalInterest }} 元</div>

        <n-card>
          贷款金额（P）：100,000 元
          <br>
          年利率（r）：5%（0.05）
          <br>
          贷款期限（n）：5 年（60 个月）
          <br>
          月利率 (r) = 年利率 / 12 = 0.05 / 12 ≈ 0.00417
          <br>
          Total Payment = P * [r(1 + r)^n] / [(1 + r)^n – 1]
          = 100,000 * [0.00417(1 + 0.00417)^60] / [(1 + 0.00417)^60 – 1]
          ≈ 113,227.40 元
          <br>
          Monthly Payment = Total Payment / n
          = 113,227.40 / 60
          ≈ 1,887.12 元
          <br>
          Total Interest = Total Payment - P
          = 113,227.40 - 100,000
          ≈ 13,227.40 元
        </n-card>
      </div>
      <div class="info-item">
        <h3>等额本金贷款</h3>
        <p>
          月利息 = 剩余未偿还本金 × 月利率
        </p>
        <p>
          每月偿还固定的本金，利息随着本金减少而减少。
          总利息相对较低，但初期每月还款额较高
        </p>
        <div>每月偿还: {{ equalPrincipalPayments.monthlyPayment }} 元</div>
        <div>累计还款总额: {{ equalPrincipalPayments.totalPayment }} 元</div>
        <div>累计支付利息: {{ equalPrincipalPayments.totalInterest }} 元</div>
        <n-card>
          贷款金额（P）：100,000 元
          <br>
          年利率（r）：5%（0.05）
          贷款期限（n）：5 年（60 个月）
          <br>
          principalPayment = 100,000 / 60 = 1,666.67 元

          <br>
          -----
          <br>

          第一个月
          interestPayment = 100,000 * 0.05 / 12 ≈ 416.67 元
          <br>
          第二个月
          interestPayment = (100,000 - 1,666.67) * 0.05 / 12 ≈ 414.58 元
          <br>
          -----
          <br>
          第一个月
          totalInterest = 2,083.34 - 100,000 ≈ 998,3.34 元
          <br>
          第二个月
          totalInterest = 2,081.25 - 100,000 ≈ 981.25 元


        </n-card>
      </div>
    </div>

  </n-space>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import _ from 'lodash'

let model = reactive({
  loanAmount: 100000,
  years: 5,
  annualInterestRate: 0.05,
})



let parse = (input: string) => {
  const nums = input.replace(/,/g, '').trim()
  if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums)
  return nums === '' ? null : Number.NaN
}

let format = (value: number | null) => {
  if (value === null) return ''
  return value.toLocaleString('en-US')
}

// 计算等额本金贷款
let equalPrincipalPayments = computed(() => {
  if (model.years && model.loanAmount && model.annualInterestRate) {
    return calculateEqualPrincipalLoan(model.years, model.annualInterestRate, model.loanAmount)
  } else {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }
})

// 等额本息贷款
let equalInstallmentPayments = computed(() => {
  if (model.years && model.loanAmount && model.annualInterestRate) {
    console.log(calculateLoan(model.years, model.annualInterestRate, model.loanAmount), 11111)
    return calculateLoan(model.years, model.annualInterestRate, model.loanAmount)
  } else {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }
})


// 计算等额本金贷款
function calculateEqualPrincipalLoan(years, annualInterestRate, loanAmount) {
  const totalMonths = years * 12;
  const monthlyInterestRate = _.divide(annualInterestRate, 12);
  const monthlyPayment = _.divide(loanAmount, totalMonths);

  let totalPayment = 0;
  let totalInterest = 0;

  for (let i = 0; i < totalMonths; i++) {
    const remainingPrincipal = loanAmount - (i * monthlyPayment);
    const interestPayment = remainingPrincipal * monthlyInterestRate;
    totalPayment += monthlyPayment;
    totalInterest += interestPayment;
  }

  return {
    monthlyPayment: _.round(monthlyPayment, 2),
    totalInterest: _.round(totalInterest, 2),
    totalPayment: _.round(totalPayment + totalInterest, 2)
  };
}

// 计算等额本息贷款
function calculateLoan(years, annualInterestRate, loanAmount) {
  const totalMonths = years * 12;
  const monthlyInterestRate = _.divide(annualInterestRate, 12);
  console.log(monthlyInterestRate, "月利率")

  const compoundFactor = Math.pow(1 + monthlyInterestRate, totalMonths);
  console.log(compoundFactor, "复利因子")

  const monthlyPayment = _.multiply(_.multiply(loanAmount, monthlyInterestRate), _.divide(compoundFactor, _.subtract(compoundFactor, 1)));

  console.log('%c%s', 'color: #aa00ff', monthlyPayment, '计算每月还款额')
  return {
    monthlyPayment: monthlyPayment,
    totalInterest: _.subtract(_.multiply(monthlyPayment, totalMonths), loanAmount),
    totalPayment: _.multiply(monthlyPayment, totalMonths)
  };
}



</script>
<style lang="scss" scoped>
.border-box {
  padding: 10px 30px;
  display: flex;
 justify-content: space-around;
  .info-item {
    width: 45%;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;
    border: 1px dotted #999999;
    padding: 20px;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
