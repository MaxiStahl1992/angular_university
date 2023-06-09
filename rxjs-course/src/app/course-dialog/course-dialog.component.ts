import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import { saveCourse } from '../../../server/save-course.route';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
    //an observable provided by angular which we can subscribe to.
    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {
        // valueChanges subscribes to any changes of inputs or values in the form
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                //takes changes, creats new observables and subscribes to them and concatenates them
                concatMap(changes => this.saveCourse(changes))
            )
            .subscribe();
        
        /* this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                //takes changes, creats new observables and subscribes to them and concatenates them
                mergeMap(changes => this.saveCourse(changes))
            )
            .subscribe(); */

    }



    ngAfterViewInit() {

        fromEvent(this.saveButton.nativeElement, 'click')
            .pipe(
                exhaustMap(() => this.saveCourse(this.form.value))
            )
            .subscribe();

    }



    close() {
        this.dialogRef.close();
    }

    saveCourse(changes) {
        //fromPromise takes a promise and converts it to an obervable
        return fromPromise(fetch(`/api/courses/${this.course.id}`,{
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }
}
