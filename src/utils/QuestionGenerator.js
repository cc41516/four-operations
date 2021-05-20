import { myStore } from "src/store/index";

const _getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default () => {
  const $number = myStore.state.number
  let symbol, operation, num1, num2;

  switch ($number.operation) {
    case "add":
      symbol = "+";
      operation = "+";
      num1 = _getRandomInteger($number.addNum1.min, $number.addNum1.max + 1);
      num2 = _getRandomInteger($number.addNum2.min, $number.addNum2.max + 1);
      break;

    case "sub":
      symbol = "−";
      operation = "-";
      num2 = _getRandomInteger($number.subNum2.min, $number.subNum2.max + 1);
      num1 = ($number.subNum1.max < num2) ? num2 : _getRandomInteger(num2, $number.subNum1.max + 1);
      break;

    case "mul":
      symbol = "×";
      operation = "*";
      num1 = _getRandomInteger($number.mulNum1.min, $number.mulNum1.max + 1);
      num2 = _getRandomInteger($number.mulNum2.min, $number.mulNum2.max + 1);
      break;

    case "div":
      symbol = "÷";
      operation = "/";
      num2 = _getRandomInteger($number.divNum2.min, $number.divNum2.max + 1);
      num1 =
        num2 *
        _getRandomInteger(
          Math.ceil($number.divNum1.min / num2),
          Math.ceil($number.divNum1.max / num2)
        );
      break;
    default:
      break;
  }

  const questionRepr = `${num1} ${symbol} ${num2} = `;
  const questionEval = `${num1} ${operation} ${num2} = `;

  return { questionRepr, questionEval }
}