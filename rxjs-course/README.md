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
(utils.ts)

## Operators

### Pipe
Used to derive observables from existing observables. Allows us to chain multiple operators to create a new observable.

### Map
Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.