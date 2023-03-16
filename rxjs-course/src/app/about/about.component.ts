import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from '../common/util';
import { interval, timer, Observable, noop } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }


  /*
    Streams and main advantage of RxJS compared to callbacks
  */
  /* ngOnInit() {

    //stream of click events over time on the page 
    document.addEventListener('click', evt => {
      console.log(evt)
    })

    //stream that emits once every second -> continuos
    let counter = 0
    setInterval(() => {
      console.log(counter);
      counter++;
    }, 1000)

    //stream that only emits one value. Completes
    setTimeout(() => {
      console.log("finished...")
    }, 3000)

    //RxJS main use case prevents "callback Hell" as shown below
    //At click start a counter after 3s.
    document.addEventListener('click', evt => {
      console.log(evt)

      setTimeout(() => {
        console.log("finished...")

        let counter = 0
        setInterval(() => {
          console.log(counter);
          counter++;
        }, 1000)

      }, 3000)

    })
  } */

  /*
    Observable Intro
  */
  /* ngOnInit() {
    
    //RxJS observable ($ is indicator). Emits increasing number every second. Same as above implemented with rxjs observable streams.
    const interval$ = interval(1000);
    const timer$ = timer(3000, 1000);
    const click$ = fromEvent(document, 'click');

    //observable becomes a stream if we subscribe to it.
    const sub1 = interval$.subscribe(val => console.log("stream 1 " + val));
    const sub2 = timer$.subscribe(val => console.log("stream 2 " + val));

    //unsubscribe after 5s and 6s
    setTimeout(() => sub1.unsubscribe(), 5000);
    setTimeout(() => sub2.unsubscribe(), 6000);

    //observable contract: An observable will emit its values (evt =>) and then either error out (err =>) or complete (() =>)
    click$.subscribe(
      evt => console.log(evt),
      err => console.log(err),
      () => console.log("completed")
    );

  } */

  ngOnInit() {
    //A promise differs from an observable because it is executed immediatley once it is defined. An observable will only trigger 
    //a request in response to subscription.
    //Here we create an observable that only then creates a promise when we subscribe to it.
    
    const http$ = createHttpObservable('api/courses');

    const courses$ = http$
      //used to derive observables from existing observables. Allows us to chain multiple operators to create a new observable.
      .pipe(
        //iterates through all values and performs an action on them. In this case it adds them to an Array Object.
        map(res => Object.values(res["payload"]) )
      );

    courses$.subscribe(
      courses => console.log(courses),
      //no error handling for now
      noop,
      () => console.log('completed')
    )
  }

}
