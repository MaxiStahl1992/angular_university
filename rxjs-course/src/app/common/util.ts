import { Observable } from "rxjs";

/*
    Ceating my own observable
*/
export function createHttpObservable(url: string) {
    return Observable.create(observer => {
        //Promise fetch. If successfull we return the json() as another promis. Then we can access the returned promise to get to the
        //json body. Errors in a promise are handled in the catch block. To fullfill the observable contract we log the errors.

        //abort controller to enable unsubscribe 
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, {signal})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    observer.error('Request failed with status code: ' + response.status);    
                }
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            //catch block only errors out in case of a fatal error (an error which the browser cannot recover from)
            .catch(err => {
                observer.error(err);
            })
        
        return () => controller.abort();
    });
}


