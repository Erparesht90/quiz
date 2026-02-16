const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateOptions = (correctAnswer) => {
    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        let offset = getRandomInt(-10, 10);
        if (offset === 0) continue;
        options.add(correctAnswer + offset);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
};

const generateQuestion = (mode) => {
    let num1, num2, operator, question, answer;

    switch (mode) {
        case 'easy':
            num1 = getRandomInt(1, 20);
            num2 = getRandomInt(1, 20);
            operator = Math.random() > 0.5 ? '+' : '-';

            if (operator === '-') {
                // Ensure positive result for easy mode
                if (num1 < num2) [num1, num2] = [num2, num1];
            }

            question = `${num1} ${operator} ${num2}`;
            answer = eval(question); // Safe here as inputs are controlled numbers
            break;

        case 'hard':
            num1 = getRandomInt(10, 100);
            num2 = getRandomInt(2, 10); // Keep divisor/multiplier reasonable
            operator = Math.random() > 0.5 ? '*' : '/';

            if (operator === '/') {
                // Ensure even division
                answer = getRandomInt(2, 20); // Pick answer first
                num2 = getRandomInt(2, 10);
                num1 = answer * num2;
                question = `${num1} / ${num2}`;
            } else {
                question = `${num1} * ${num2}`;
                answer = num1 * num2;
            }
            break;

        case 'master':
            const operators = ['+', '-', '*', '%'];
            operator = operators[getRandomInt(0, 3)];
            num1 = getRandomInt(10, 1000);
            num2 = getRandomInt(10, 100);

            if (operator === '%') {
                // Ensure non-zero divisor
                if (num2 === 0) num2 = 1;
            } else if (operator === '-') {
                // Allow negatives in Master? Prompt says "Master", let's allow it or keep positive? 
                // Usually Master implies harder logic. Let's keep it simple/positive for consistency or allow negative.
                // Let's standard random for Master.
            }

            question = `${num1} ${operator} ${num2}`;
            // Use Function constructor for safer eval alternative if complex, 
            // but for simple math operators, direct calc is better.
            switch (operator) {
                case '+': answer = num1 + num2; break;
                case '-': answer = num1 - num2; break;
                case '*': answer = num1 * num2; break;
                case '%': answer = num1 % num2; break;
            }
            break;

        default:
            return null;
    }

    return {
        question,
        options: generateOptions(answer),
        answer
    };
};

module.exports = { generateQuestion };
