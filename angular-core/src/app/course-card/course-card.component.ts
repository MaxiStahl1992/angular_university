import { Component, ContentChild, EventEmitter, Input, Output, AfterViewInit, ElementRef, ContentChildren, AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements AfterViewInit, AfterContentInit{

  @Input()
  course!: Course;

  @Input()
  cardIndex: number;

  @Input()
  noImageTemplate: TemplateRef<any>;

  @Output()
  courseSelected = new EventEmitter<Course>();

 /*  @ContentChild(CourseImageComponent, {read: ElementRef})
  courseImage: CourseImageComponent; */

  @ContentChildren(CourseImageComponent, {read: ElementRef})
  images: QueryList<CourseImageComponent>;

  constructor() {}

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
    console.log(this.images)
  }

  onCourseViewed() {
    console.log('component');
    this.courseSelected.emit(this.course);
  }

  isImageVisible() {
    return this.course && this.course.iconUrl
  }

  cardClasses() {
    if(this.course.category === 'BEGINNER') {
      return ['beginner'];
    }
    return {'beginner': this.course.category === 'BEGINNER'}
  }

  cardStyle() {
    return {
      'background-image': 'url(' + this.course.iconUrl + ')'
    }
  }
}
