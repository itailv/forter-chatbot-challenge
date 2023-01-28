export const BOT_UID: string = 'BOT'

interface Question {
    pattern: string;
    answer: string;
}
interface QuestionData {
    questions: Question[];
}

export const questionData: QuestionData = {
    "questions": [
        {
            "pattern": "^Hello$",
            "answer": "Hello!",
        },
        {
            "pattern": "^What (ingredient|ingredients) do I need to make cookies$",
            "answer": "You will need flour, sugar, eggs, butter, baking powder and vanilla extract to make cookies."
        },
        {
            "pattern": "^(How long|What temperature) should I bake cookies$",
            "answer": "Cookies should be baked at 350 degrees Fahrenheit for 8-10 minutes."
        },
        {
            "pattern": "^(How should I mix|How long should I chill) the dough before baking$",
            "answer": "Mix the dough with a mixer or by hand and chill for at least 30 minutes before baking for best results."
        },
        {
            "pattern": "^(What kind of cookies|What's the difference between) (chocolate chip|sugar|oatmeal) cookies$",
            "answer": "Chocolate chip cookies are made with chocolate chips, sugar cookies are made with granulated sugar and oatmeal cookies are made with rolled oats."
        }
    ]
};
  
export const checkForBotAnswer = (message: string): string | null => {

    for (let i = 0; i < questionData.questions.length; i++) {
        const question = questionData.questions[i];
        const pattern = new RegExp(question.pattern);
        if (pattern.test(message)) {
            return question.answer;
        }
    }

    return null;
}
  