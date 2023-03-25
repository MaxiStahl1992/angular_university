import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

    courses = COURSES;
    
    title = COURSES[0].description;
    price = 9.998297894564389274;
    rate = 0.76;
    startDate = new Date(2000, 0, 1);
    course = COURSES[0]

    @ViewChild(CourseCardComponent)
    card: CourseCardComponent

    @ViewChild('container')
    container: ElementRef;

    @ViewChildren(CourseCardComponent, {read: ElementRef})
    cards: QueryList<CourseCardComponent>;

    constructor() {}

    ngAfterViewInit() {
      /* console.log("containerDiv", this.container); */
      this.cards.changes.subscribe(console.log);
    }

    onCourseSelected(course: Course) {
      console.log(this.card)
    }

    onCoursesEdited() {
      this.courses.push(
        {
          id: 1,
          description: "Angular Core Deep Dive",
          iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png',
          longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
          category: 'INTERMEDIATE',
          lessonsCount: 10
        },
      )
    }

}
