import React from 'react';
import '../components/Instructions.css';



function Instructions() {

  return (
    <div>
      <h1>WIQ Instructions</h1>
     <section>   
      <article>
            <ul><p>Objetive:</p>
              <li>
              The objective of the game is to answer as many questions correctly as possible.
              </li>
            </ul>
      </article>   
      <article>
            <ul><p>How to Play:</p>
                    <li>
                    The game consists of a series of questions.
                    </li>
                    <li>
                    Read each question carefully.
                    </li>
                    <li>
                    Choose the correct answer from the options provided.
                    </li>
                    <li>
                    Click or tap on your selected answer to submit it.
                    </li>
            </ul>
      </article>   
      <article>
      <ul><p>Scoring:</p><li>
              Each correct answer earns you x points.</li>
              <li>
              Incorrect answers do not deduct points.
              </li>
            </ul>
      </article>
          <article>
          <ul><p>Time Limit:</p><li>
              Some game modes may have a time limit for answering each question. Be quick and accurate to maximize your score.
              </li></ul>
          </article>
            <article>
            <ul><p>Have Fun!:</p>
              <li>
              Enjoy the game and test your knowledge. Good luck!
              </li>
            </ul>
            </article>
           
      </section>
    </div>
  );
}


export default Instructions;
