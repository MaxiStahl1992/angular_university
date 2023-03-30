# RxJS

Core use case for RxJS: 
-> Combine streams of values in a readable and maintainable way
(about.ts)

## Streams

Streams emit values after a specified event, or after a specified time. There are continuous streams such as as stream of click events that emits everytime a click event happens, or a setInterval stream that emits after a given time(i.e. every second). And there are streams that only emit one value and finish, such as setTimeout, which emits one value once after a given period of time.
(about.ts)


## Observable

Definition for a stream of values. It doesn't acutally emit or stream anything as long as we do not subscribe to it. 
I will become a stream if we subscribe to it. There is a observable contract, which says that an observable will emit values as long as
it doesn't error out OR completes. After an error or after completion no new values will be emitted. 
We can unsubscribe from an observable, by firt decalring the observable to a variable and then unsubscribing from this variable after a condition is met. 
(about.ts)
(home.ts)
(utils.ts)

## Operators

### Pipe
Used to derive observables from existing observables. Allows us to chain multiple operators to create a new observable.
(about.ts)
(home.ts)

### Map
Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
(about.ts)
(home.ts)

### ShareReplay
It will share the data for all others that use the data. The data will not be fetched multiple times. So instead of using multiple http requests for different methods using the same data we onlx need one with http request with shareReplay().
(home.ts)

### Tap
Is used to produce side effects in observable chain. Whenever we want to update something outside the observable chain.
I.e. we want to update a variable at the component level or issue a logging statement.
(home.ts)

### Of
Let's us define all sorts of observables.
I.e. of(1, 2, 3) defines an observable of 1, 2, 3.
(about.ts)

### Concat
Concatenates multiple Observables together by sequentially emitting their values, one Observable after the other.
(about.ts)

### ConcatMap
Projects each value to an observable which is merged in the output observable, in a serialized fashion waitung for each one to complete before merging the next.
If we use it to concat i.e. http requests they will be executed sequentially. The secind request will only start when the first one has completed. This makes sure that we always save the correct values but takes longer to finish.
Ahould be used if the order oft completing/starting the observable execution is important.
(course-dialog.ts)

### Filter
Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.
(course-dialog.ts)

### Merge
Creates an output Observable which concurrently emits all values from every given input observable. 
It is used to perform asynchronous operations in parallel.
(about.ts)

### MergeMap
Projects each source value to an Observable which is merged in the output Observable;
Requests will be executed in parallel. 
Should be used if we want to execute as fast as possible and the order of starting/completing observables is not important.
(course-dialog.ts)

### ExhaustMap
Projects each source value to an observable which is merged in the output observable only if the previous projected observable
has completed.
I.e. if we have a save button and click it several times really fast, we will only trigger one save http request, because exhaustMap
will only execute one request, if another one is triggered while the first one is still ongoing the second one will be ignored.
(course-dialog.ts)

### SwitchMap
Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.
use case: searches
(course.ts)

### DebounceTime
Emits a value from the source Observable only after a particular time span has passed without another source emission.
This means that the value has to be stable for a certain amount of time.
(course.ts)

### catchError
catchError has three strategies:
    - Replace Error Handling: Catch the error and display an observable, which must be defined offline, so either in the code or an offline db
    - Catch Error: catches the error and log it to the console. instead of returning an observable we use throwError(err) as a pseudo observable that never emits. end with finalize(() => {}) to clean up. 
    - Retry Error: catches an error and then waits for a specified amount of time before it will retry the request to the backend. retryWhen()
(home.ts)

### startWith
its goal is to initialize a stream with a given value. I.e. for our search method we want to first search for an empty string, the start with operator allows us to set the initial value to an empty string and removes the necessity of concating the inital lessons and lessons stream. 
(course.ts)


### throttle
Emits a value from the source Observable, then ignores subsequent source values for a duration determined by another Observable, then repeats this process.
I.e. We receive info about the changing values of currencies every 5 seconds, but for the frontend it is enough to update the value every minute. 
(course.ts)

### custom rxjs operator

#### Debug
To implement our own debug function to use in observables, we need to define a Higher Order Function (HOF). A HOF is a function that returns a function i.e. const xyz = (a, b) => (obersvable: Observable<any>) => source.pipe();
(debug.ts)
