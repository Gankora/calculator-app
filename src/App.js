import './app.module.css';
import styles from './app.module.css';
import React, { useState } from 'react';
import nums from './nums.json';

function App() {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [resultColor, setResultColor] = useState(false);

	const handleDigitClick1 = (digit) => {
		setOperand1(operand1 + digit);
	};

	const handleDigitClick2 = (digit) => {
		setOperand2(operand2 + digit);
	};

	const handleOperatorClick = (op) => {
		setOperator(op);
		setResultColor(false);
	};

	const handleClear = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setResultColor(false);
	};

	// Обработчик клика на кнопку '='
	const handleEqualsClick = () => {
		let result;
		switch (operator) {
			case '+':
				if (operand2 === '') {
					result = parseFloat(operand1) * 2;
				} else {
					result = parseFloat(operand1) + parseFloat(operand2);
				}
				break;
			case '-':
				if (operand2 === '') {
					result = parseFloat(operand1) - parseFloat(operand1);
				} else {
					result = parseFloat(operand1) - parseFloat(operand2);
				}
				break;
			default:
				result = '';
		}
		setOperand1(result.toString());
		setOperator('');
		setOperand2('');
		setResultColor(true);
	};

	return (
		<div className={styles.container}>
			<div className={`${resultColor ? styles.result : styles.display}`}>
				{operand1} {operator} {operand2}
			</div>
			<div className={styles['calculator-buttons']}>
				{nums.map((num) => (
					<button
						key={num.id}
						className={styles['button-item']}
						onClick={() => {
							if (num.type === 'number') {
								if (operator === '') {
									handleDigitClick1(num.value);
								} else {
									handleDigitClick2(num.value);
								}
							} else if (num.type === 'operator') {
								handleOperatorClick(num.value);
							} else if (num.type === 'clear') {
								handleClear();
							} else if (num.type === 'equal') {
								handleEqualsClick();
							}
						}}
					>
						{num.value}
					</button>
				))}
			</div>
		</div>
	);
}

export default App;
