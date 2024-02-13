import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../data/quiz_questions.json";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})

export class QuizComponent implements OnInit {

  title = "";

  questions: Question[] = [];
  selectedQuestion: Question = this.questions[0];

  answers: string[] = [];
  result = "";

  questionIndex = 0;
  questionMaxIndex = 0;

  isQuizFinished = false;

  ngOnInit(): void {
    if (quiz_questions) {
      this.isQuizFinished = false;
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length - 1;
    }
  }

  chooseOption(answer: string) {
    this.answers.push(answer);
    this.questionIndex++;
    this.goToNextStep();
  }

  goToNextStep() {
    if (this.questionIndex <= this.questionMaxIndex) {
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      this.isQuizFinished = true;
      const finalAnswer = this.checkResult(this.answers);
      this.result = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results];
    }
  }

  checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, answersList) => {
      return (
        answersList.filter(item => item === prev).length >
        answersList.filter(item => item === curr).length
      ) ? prev : curr;
    })
    return result;
  }
}

type Question = {
  id: number,
  question: string,
  options: Option[]
}

type Option = {
  id: number,
  name: string,
  alias: string
}