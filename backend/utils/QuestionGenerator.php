<?php
class QuestionGenerator {
    
    private function getRandomInt($min, $max) {
        return rand($min, $max);
    }

    private function generateOptions($correctAnswer) {
        $options = [$correctAnswer];
        while (count($options) < 4) {
            $offset = $this->getRandomInt(-10, 10);
            if ($offset === 0) continue;
            
            $newOption = $correctAnswer + $offset;
            if (!in_array($newOption, $options)) {
                $options[] = $newOption;
            }
        }
        shuffle($options);
        return $options;
    }

    public function generate($mode) {
        $num1 = 0; $num2 = 0; $operator = ''; $answer = 0; $question = '';

        switch ($mode) {
            case 'easy':
                $num1 = $this->getRandomInt(1, 20);
                $num2 = $this->getRandomInt(1, 20);
                $operator = (rand(0, 1) > 0.5) ? '+' : '-';

                if ($operator === '-') {
                    if ($num1 < $num2) list($num1, $num2) = array($num2, $num1);
                }

                $question = "$num1 $operator $num2";
                $answer = ($operator === '+') ? $num1 + $num2 : $num1 - $num2;
                break;

            case 'hard':
                $num1 = $this->getRandomInt(10, 100);
                $num2 = $this->getRandomInt(2, 10);
                $operator = (rand(0, 1) > 0.5) ? '*' : '/';

                if ($operator === '/') {
                    $answer = $this->getRandomInt(2, 20);
                    $num2 = $this->getRandomInt(2, 10);
                    $num1 = $answer * $num2;
                    $question = "$num1 / $num2";
                } else {
                    $question = "$num1 * $num2";
                    $answer = $num1 * $num2;
                }
                break;

            case 'master':
                $operators = ['+', '-', '*', '%'];
                $operator = $operators[rand(0, 3)];
                $num1 = $this->getRandomInt(10, 1000);
                $num2 = $this->getRandomInt(10, 100);

                if ($operator === '%') {
                    if ($num2 === 0) $num2 = 1;
                }

                $question = "$num1 $operator $num2";
                
                switch($operator) {
                    case '+': $answer = $num1 + $num2; break;
                    case '-': $answer = $num1 - $num2; break; // Allow negatives
                    case '*': $answer = $num1 * $num2; break;
                    case '%': $answer = $num1 % $num2; break;
                }
                break;
            
            default:
                return null;
        }

        return [
            "question" => $question,
            "options" => $this->generateOptions($answer),
            "answer" => $answer
        ];
    }
}
?>
