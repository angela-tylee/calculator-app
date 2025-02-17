// import './style/css-reset.scss';
// import './style/_theme.scss';
// import './style/style.scss';

// load current theme
const currentTheme = localStorage.getItem('theme');

const themeToggle = document.querySelectorAll('#theme');
// const theme = document.querySelector('input[name="theme"]');

themeToggle.forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      document.documentElement.setAttribute('data-theme', 'one')
      // document.body.classList.remove();
      // document.body.classList.add('theme-1');
      localStorage.setItem('theme', '1');
    } else if (e.target.value === '2') {
      document.documentElement.setAttribute('data-theme', 'two')
      // document.body.classList.remove();
      // document.body.classList.add('theme-2');
      localStorage.setItem('theme', '2');
    } else if (e.target.value === '3') {
      document.documentElement.setAttribute('data-theme', 'three')
      // document.body.classList.remove();
      // document.body.classList.add('theme-3');
      localStorage.setItem('theme', '3');
    }
  })
})

// calculate

// TODO: 小數點
// TODO: 0 開頭
// TODO: * / textContent
// TODO: 超出鍵盤 overflow hidden?

const display = document.querySelector("#calculator-display");
const numberBtns = document.querySelectorAll('.btn-number');
const operatorBtns = document.querySelectorAll('.btn-operator');
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // appendNumber(e.target.textContent)
    appendNumber(e.target.dataset.key);
  });
  // btn.addEventListener("keydown", (e) => {
  //   console.log("keydown", e.target.dataset.key);
  //   e.target.classList.add("btn-pressed");
  // })
})

function appendNumber(btn) {
  display.textContent += btn;
};

function deleteDisplay() {
  console.log("deleteDisplay");
  let chars = display.textContent.split('');
  chars.pop();
  display.textContent = chars.join('');

  // display.textContent = display.value.slice(0, -1);
}

function clearDisplay() {
  display.textContent = '';
};

function calculateResult() {
  const expression = display.textContent;
  const result = parseAndCompute(expression);
  display.textContent = result;
  console.log(result);
};

// Parses the expression and computes the result without eval
function parseAndCompute(expression) {
  const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g); // tokenize numbers and operators
  if (!tokens) return;

  // Step 1: Handle * and / first
  const stack = [];
  let current = parseFloat(tokens[0]); // Initialize with the first number

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (operator === "*") {
      current *= nextNumber;
    } else if (operator === "/") {
      current /= nextNumber;
    } else {
      stack.push(current); // Push current value to stack
      stack.push(operator); // Push the operator
      current = nextNumber; // Update current number
    }
  }
  stack.push(current); // Add the last computed number to the stack

  // Step 2: Handle + and - operations
  let result = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    const operator = stack[i];
    const nextNumber = stack[i + 1];

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "-") {
      result -= nextNumber;
    }
  }
  return result;
}

function handleButtonPress(key, fn) {
  btns.forEach((btn) => {
    if (btn.dataset.key === key) {
      console.log("dataset", btn.dataset.key);
      btn.classList.add("btn-pressed");
      fn(key);
      setTimeout(() => btn.classList.remove("btn-pressed"), 200);
    }
  });
};

document.addEventListener("keydown", (event) => {
  const key = event.key; // Get the key pressed
  
  console.log(key);

  if (!isNaN(key)) {
    // appendNumber(key);
    handleButtonPress(key, appendNumber);
  // } else if (key === ".") {
  //   // appendDecimal(key);
  //   handleButtonPress(key, appendDecimal);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    // appendOperator(key);
    handleButtonPress(key, appendNumber);
  } else if (key === "Backspace") {
    // deleteDisplay();
    handleButtonPress(key, deleteDisplay);
  } else if (key === "Enter") {
    // calculateResult();
    handleButtonPress(key, calculateResult);
  } else if (key === "Escape") {
    // clearDisplay();
    handleButtonPress(key, clearDisplay);
  }
});