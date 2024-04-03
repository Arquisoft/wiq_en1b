export default function RecordList({record}){
    return (
        <>
        {record.questions.map((question, index) => (
            <li key={index}>
                  <p>{question.question}</p>
                  <ul>
                    {question.answers.map((answer, answerIndex) => (
                      <li key={answerIndex}>
                        {answer}
                        {question.answerGiven === answer && " 👈 "}
                        {question.correctAnswer === answer && " ✅ "}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
        </>
    );
}