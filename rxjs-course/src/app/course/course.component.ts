import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, throttle, throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];
        /* this.course$ = createHttpObservable(`http://localhost:9000/api/courses/${this.courseId}`)
            .pipe(
                debug( RxJsLoggingLevel.INFO, "course value "),
            ); */
        
        setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
        
        const course$ = createHttpObservable(`http://localhost:9000/api/courses/${this.courseId}`)
        const lessons$ = this.loadLessons();

        forkJoin({course$, lessons$})
            .subscribe(val => console.log(val));

    }

    ngAfterViewInit() {
        // search for lessons with concat method 
/*         const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                debounceTime(400),
                //Only emits one value if they are exactly the same
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search))
            );
        
        const initialLessons$ = this.loadLessons();

        this.lessons$ = concat(initialLessons$, searchLessons$); */

        //search lessons with startWith method
        /* this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
                .pipe(
                    map(event => event.target.value),
                    startWith(''),
                    debug(RxJsLoggingLevel.TRACE, "search "),
                    debounceTime(400),
                    distinctUntilChanged(),
                    switchMap(search => this.loadLessons(search)),
                    debug(RxJsLoggingLevel.DEBUG, "lessons value "),
                ) */
        
        //throttling -> doesn't make sense for typing observables 
        fromEvent<any>(this.input.nativeElement, 'keyup')
                .pipe(
                    map(event => event.target.value),
                    //same as ThrottleTime
                    //throttle(() => interval(500))
                    throttleTime(500)
                )
                .subscribe(console.log)

    }

    loadLessons(search= ''): Observable<Lesson[]> {
        return createHttpObservable(`http://localhost:9000/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
                .pipe(
                    map(res => res['payload'])
                );
    }
}
