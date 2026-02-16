export const generateQuestion = (mode) => {
    let num1, num2, operator, answer, question;

    switch (mode) {
        case 'easy':
            // 1-10, Addition only for very young kids
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operator = '+';
            answer = num1 + num2;
            break;

        case 'hard':
            // 1-20, Addition and Subtraction
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            operator = Math.random() > 0.5 ? '+' : '-';
            
            if (operator === '-') {
                if (num1 < num2) [num1, num2] = [num2, num1];
                answer = num1 - num2;
            } else {
                answer = num1 + num2;
            }
            break;

        case 'master':
            // 1-10, Multiplication (Times Tables)
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operator = '×'; // Use multiplication symbol
            answer = num1 * num2;
            break;
            
        default:
            num1 = 1; num2 = 1; operator = '+'; answer = 2;
    }

    question = `${num1} ${operator} ${num2}`;

    // Generate Options
    const options = new Set();
    options.add(answer);

    while (options.size < 4) {
        let wrongAnswer;
        const deviation = Math.floor(Math.random() * 10) + 1;
        if (Math.random() > 0.5) wrongAnswer = answer + deviation;
        else wrongAnswer = answer - deviation;

        if (wrongAnswer >= 0 && wrongAnswer !== answer) {
            options.add(wrongAnswer);
        }
    }

    return {
        question,
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5)
    };
};

export const generateQuiz = (mode, count = 10) => {
    const questions = [];
    for (let i = 0; i < count; i++) {
        questions.push(generateQuestion(mode));
    }
    return {
        questions,
        time_limit: mode === 'easy' ? 30 : (mode === 'hard' ? 45 : 60)
    };
};
