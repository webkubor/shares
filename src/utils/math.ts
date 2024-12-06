
import { create, all, BigNumber } from 'mathjs';

const math = create(all);

// 封装函数，统一处理参数为 BigNumber
const createMathFn = (operation: (num1: BigNumber, num2: BigNumber) => BigNumber) => (
    num1: number | string | BigNumber,
    num2: number | string | BigNumber
  ): number => {
    const bigNum1 = math.bignumber(num1);
    const bigNum2 = math.bignumber(num2);
    const result = operation(bigNum1, bigNum2);
    return parseFloat(result.toString()); // 转换为数值形式
  };
  
  // 加法函数
  export const add = createMathFn((a, b) => math.add(a, b));
  
  // 减法函数
  export const subtract = createMathFn((a, b) => math.subtract(a, b));
  
  // 乘法函数
  export const multiply = createMathFn((a, b) => math.multiply(a, b));
  
  // 除法函数
  export const divide = createMathFn((a, b) => math.divide(a, b));
  

 