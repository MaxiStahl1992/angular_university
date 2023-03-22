import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

/* 
    //Imperative approach (not recommended)
    beginnersCourses: Course[];
    advancedCourses: Course[];

    ngOnInit() {
        //Observable that contains all courses
        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$
            .pipe(
                map(res => Object.values(res["payload"]))
            );
                
        //Adding logic in the subscribe method will not scale well. 
        //We will end up with nested subscribe blocks and we wont avoid callback hell.
        courses$.subscribe(
            courses => {

                //These are array filters and not rxjs filters
                this.beginnersCourses = courses.filter(course => course.category == 'BEGINNER');
                this.advancedCourses = courses.filter(course => course.category == 'ADVANCED');
            }
        )
    } 
*/
/* 
    //Reactive Approach
    //The data is not directly available. As these are observables we only have definitions of streams of data.
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                map(res => Object.values(res['payload']))
            );
        
        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses.filter(course => course.category == 'BEGINNER'))
            );
        
        this.advancedCourses$ = courses$
        .pipe(
            map(courses => courses.filter(course => course.category == 'ADVANCED'))
        );
    }
 */

    //Reactive Approach with Share Replay to not trigger multiple http requests for the same data
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const http$ = createHttpObservable('http://localhost:9000/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                //Tap is used to do something outside the observable chain. Here we want to log something to the console
                tap(() => console.log("Http Request executed")),
                map(res => Object.values(res['payload'])),
                shareReplay(),
                catchError(err => of([])),
            );
        
        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses.filter(course => course.category == 'BEGINNER'))
            );
        
        this.advancedCourses$ = courses$
        .pipe(
            map(courses => courses.filter(course => course.category == 'ADVANCED'))
        );
    }
}
