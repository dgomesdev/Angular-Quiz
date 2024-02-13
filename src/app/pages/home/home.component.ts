import { Component } from '@angular/core';
import { QuizComponent } from "../../components/quiz/quiz.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [QuizComponent]
})
export class HomeComponent {

}
