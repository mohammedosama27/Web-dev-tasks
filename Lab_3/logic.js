// Efficient calculator logic using a small state machine
const displayEl = document.getElementById('display');
const previousEl = document.getElementById('previous');
const keys = document.getElementById('keys');

const calculator = {
	displayValue: '0',
	firstOperand: null,
	operator: null,
	waitingForSecondOperand: false,
	// indicates that the last action produced a final result (user pressed equals)
	justCalculated: false,
};

function updateDisplay(){
	displayEl.textContent = calculator.displayValue;
	// show minimal previous state
	previousEl.textContent = calculator.firstOperand !== null && calculator.operator ? `${calculator.firstOperand} ${formatOperator(calculator.operator)}` : '';
}

function inputDigit(digit){
	const { displayValue, waitingForSecondOperand } = calculator;

	// if previously showed an error, reset when next digit is pressed
	if (displayValue === 'Error'){
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
		return;
	}


	if(waitingForSecondOperand){
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
		calculator.justCalculated = false; // user started typing second operand
	} else if (calculator.justCalculated){
		// if the display is showing the result of a previous calculation, replace it
		calculator.displayValue = digit;
		calculator.justCalculated = false;
	} else {
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
}

function inputDecimal(){
	// if previously showed an error, reset to 0.
	if (calculator.displayValue === 'Error'){
		calculator.displayValue = '0.';
		calculator.waitingForSecondOperand = false;
		return;
	}

	if(calculator.waitingForSecondOperand){
		calculator.displayValue = '0.';
		calculator.waitingForSecondOperand = false;
		calculator.justCalculated = false;
		return;
	}

	if (calculator.justCalculated){
		// typing decimal immediately after result should start a new number
		calculator.displayValue = '0.';
		calculator.justCalculated = false;
		return;
	}
	if(!calculator.displayValue.includes('.')){
		calculator.displayValue += '.';
	}
}

function clearAll(){
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.operator = null;
	calculator.waitingForSecondOperand = false;
	calculator.justCalculated = false;
}

function toggleSign(){
	if(calculator.displayValue === '0') return;
	calculator.displayValue = (parseFloat(calculator.displayValue) * -1).toString();
}

function percent(){
	calculator.displayValue = (parseFloat(calculator.displayValue) / 100).toString();
}

function formatOperator(op){
	if(op === '+') return '+';
	if(op === '-') return '−';
	if(op === '*') return '×';
	if(op === '/') return '÷';
	return op;
}

function handleOperator(nextOperator){
	const inputValue = parseFloat(calculator.displayValue);

	if(calculator.operator && calculator.waitingForSecondOperand){
		// replace operator if user changes their mind
		calculator.operator = nextOperator;
		return;
	}

	if(calculator.firstOperand == null){
		calculator.firstOperand = inputValue;
	} else if(calculator.operator){
		const result = calculate(calculator.firstOperand, inputValue, calculator.operator);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;
	calculator.justCalculated = false; // going into operator mode
}

function calculate(first, second, operator){
	if(operator === '+') return roundAccurately(first + second);
	if(operator === '-') return roundAccurately(first - second);
	if(operator === '*') return roundAccurately(first * second);
	if(operator === '/') return second === 0 ? 'Error' : roundAccurately(first / second);
	return second;
}

function roundAccurately(number){
	// avoid floating point glitches for display
	return Math.round(number * 1e12) / 1e12;
}

// Event delegation for all buttons
keys.addEventListener('click', (e) => {
	if(!e.target.matches('button')) return;
	const action = e.target.dataset.action;
	const buttonContent = e.target.textContent;

	// numbers use data-action="number" in the markup
	if(action === 'number'){
		inputDigit(buttonContent);
		updateDisplay();
		return;
	}

	switch(action){
		case 'decimal':
			inputDecimal();
			break;
		case 'clear':
			clearAll();
			break;
		case 'sign':
			toggleSign();
			break;
		case 'percent':
			percent();
			break;
		case 'operator':
			handleOperator(e.target.dataset.value);
			break;
		case 'equals':
			if(calculator.operator == null) break;
			// perform final calculation
			const second = parseFloat(calculator.displayValue);
			const result = calculate(calculator.firstOperand, second, calculator.operator);
			calculator.displayValue = String(result);
			// keep the result as firstOperand so user can continue operations if desired
			if (result !== 'Error'){
				calculator.firstOperand = parseFloat(result);
			} else {
				calculator.firstOperand = null;
			}
			calculator.operator = null;
			calculator.waitingForSecondOperand = false;
			calculator.justCalculated = true; // next number press should replace display
			break;
	}

	updateDisplay();
});

// initialize
updateDisplay();
