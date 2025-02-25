
// theme switcher
const currentTheme = localStorage.getItem('theme');

const themeToggle = document.querySelectorAll('#theme');

themeToggle.forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      document.documentElement.setAttribute('data-theme', 'one')
      localStorage.setItem('theme', '1');
    } else if (e.target.value === '2') {
      document.documentElement.setAttribute('data-theme', 'two')
      localStorage.setItem('theme', '2');
    } else if (e.target.value === '3') {
      document.documentElement.setAttribute('data-theme', 'three')
      localStorage.setItem('theme', '3');
    }
  })
})

// calculate
const display = document.querySelector("#calculator-display");
const btns = document.querySelectorAll('.btn');


btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    appendNumber(e.target.dataset.key);
  });
})

function appendNumber(btn) {
  display.textContent += btn;
  formatDisplay();
};

let hasDecimal = false;

function appendDecimal() {
  display.textContent += '.';
  hasDecimal = true;
  formatDisplay();
}

function appendOperator(btn) {
  display.textContent += formatOperator(btn);
}

// Helper function to format the display with comma separators

function formatDisplay() {
  let displayText = display.textContent;
  console.log("Before formatting:", displayText);

  // Use regex to split the display into numbers and operators
  // This regex matches numbers (including decimals) and keeps operators separate
  const parts = displayText.split(/([+\-*/×÷])/);

  // Format each part
  for (let i = 0; i < parts.length; i++) {
    // Only format parts that appear to be numbers
    if (!isOperator(parts[i]) && !isFormattedOperator(parts[i])) {
      parts[i] = formatNumberPart(parts[i]);
    }
  }

  display.textContent = parts.join('');
  console.log("After formatting:", display.textContent);
}

function isOperator(str) {
  return ['+', '-', '*', '/'].includes(str);
}

function isFormattedOperator(str) {
  return ['+', '-', '×', '÷'].includes(str);
}

function formatOperator(operator) {
  switch (operator) {
    case '*': return '×';
    case '/': return '÷';
    default: return operator;
  }
}

function formatNumberPart(part) {
  if (!part || part.trim() === '') return part;

  if (part === ".") {
    return "0.";
  }

  let parts = part.split(".");
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : "";

  // Remove non-digit characters, then format with commas
  if (integerPart === "" || integerPart === "0") {
    integerPart = "0"; 
  } else {
    integerPart = integerPart.replace(/[^\d]/g, '');
    if (integerPart !== '') {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  if (decimalPart) {
    decimalPart = decimalPart.replace(/[^\d]/g, '');
    if (decimalPart !== '') {
      decimalPart = decimalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  if (parts.length > 1) {
    return integerPart + "." + decimalPart;
  } else {
    return integerPart;
  }
}

function deleteDisplay() {
  let chars = display.textContent.split('');
  let lastChar = chars.pop();
  display.textContent = chars.join('');

  if (lastChar === ".") {
    hasDecimal = false;
  }

  formatDisplay();
}

function clearDisplay() {
  display.textContent = '';
  hasDecimal = false;
};

function calculateResult() {
  const expression = display.textContent.replace(/,/g, ''); // Remove commas for calculation
  const result = parseAndCompute(expression);
  display.textContent = result;
  formatDisplay();
};

function parseAndCompute(expression) {
  console.log(expression)
  // Tokenize numbers and operators, ensuring x and ÷ are recognized
  const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/×÷])/g);
  console.log(tokens);
  if (!tokens) return;

  // Handle multiplication (x) and division (÷) first
  const stack = [];
  let current = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (operator === "×" || operator === "*") {
      current *= nextNumber;
    } else if (operator === "÷" || operator === "*") {  // Directly check for ÷
      current /= nextNumber;
    } else {
      stack.push(current);
      stack.push(operator);
      current = nextNumber;
    }
  }
  stack.push(current);

  // Handle addition (+) and subtraction (-)
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
      console.log(btn.dataset.key)
      btn.classList.add("btn-pressed");
      fn(key);
      setTimeout(() => btn.classList.remove("btn-pressed"), 200);
    }
  });
};

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key)) {
    handleButtonPress(key, appendNumber);
  } else if (key === ".") {
    handleButtonPress(key, appendDecimal);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleButtonPress(key, appendOperator);
  } else if (key === "Backspace") {
    handleButtonPress(key, deleteDisplay);
  } else if (key === "Enter") {
    handleButtonPress(key, calculateResult);
  } else if (key === "Escape") {
    handleButtonPress(key, clearDisplay);
  }
});