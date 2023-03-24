# Angular Core

## Key Features

### Property Binding
<img alt="item" [src]="itemImageUrl">
Sets values of HTML elements or directives. Use it to do things such as toggle button features, set paths programmatically, share values between components

### Event Binding
<button (click)="onSave()">Save</button>
Lets you listen for and respond to user actions such as keystrokes, mouse movements, clicks and touches.

### Template Variables/References
Help to use data from one part of the template in anpther part of the template. They are used to perform tasks such as responding to user input or finely tune application forms.
Template variables can refer to: 
    - A DOM element within a template
    - A directive or component
    - A TemplateRef from ng-template
    - A web component

### @Input
Parent component inputs data into the child component.
Syntax [name]="the input info" in parent component. @Input name: type in child component.

### @Output
Child component outputs data to the parent component. 
Syntax (name)="method(event$)" in parent and @Output name = new EventEmitter<type>() in child. 

### *
Shorthand syntax for structural directives.
Allows us to change the structure of a page.

### *ngFor
Query an array and display all its elements.
Syntax: let name of names (names is the name of the variable in the ts file)
Additional features: 
    - index: index as i (let name of names; index as i)
    - first: is true only for the first element(...;first as isFirst)
    - last: is true only for the last element ( ...;last as isLast)
    - isEven: is true only for the last element ( ...;even as isEven)
    - isOdd: is true only for the last element ( ...;odd as isOdd)

### *ngIf
displays if it evaluates to true. Otherwise it is removed from the DOM.
Syntax: *ngIf="condition"
An else can be added to display a component it the else case
Syntax: *ngIf="condition; else refered ng Template name i.e. #reference"
`<ng-template #reference>some input</ng-template>`

### Elvis Operator
? -> says that a value can be undefined

### add classes conditionally
[class.classname_in_css]="condition"
[ngClass] = "'classname'" // not conditional -> shouldn't be used like that
[ngClass] = "['classname', 'classname2']" // not conditional
[ngClass] = "function()"
examples for a function: 
    if(this.course.category === 'BEGINNER') {
        return ['beginner'];
        }
    OR
    return {'beginner': this.course.category === 'BEGINNER'}

### ngStyle
can be uses if we need to dynamically style parts of a component.
example: 
html: 
    [ngStyle]="function()"
ts: 
    function() {
        return {
            'background-image': 'url(' + this.course.iconUrl + ')'
        }
    }

### ngSwitch
Cover multiple alternative cases. 
Example: 
    <div class="course-category" [ngSwitch]="course.category">
        <div class="category" *ngSwitchCase="'BEGINNER'"> Beginner </div>
        <div class="category" *ngSwitchCase="'INTERMEDIATE'"> Intermediate </div>
        <div class="category" *ngSwitchCase="'ADVANCED'"> Advanced </div>
        <div class="category" *ngSwitchDefault> All Levels </div>
    </div>

### ngContainer
If there is no convenient place to add a structural directive (*ngIf, *ngFor, ngSwitch, ...) ther is no need to add
a new div (extra DOM element). We can use ng-container, this allows us to add structural directives without adding
a new DOM element and helps us keep the application more lightweight.

### Pipes
Date: {{ startDate | date: 'MMM/dd/yyyy'}}
String: {{title | uppercase }} | lowercase | titlecase 
Number: number: 3.3-5 3 places before and 3-5 spaces after the comma (will be rounded)
        currency: 'EUR' default is USD
        percent
Slice: slice:0:2 shows indexes 0 and 1 everything starting at 2 is not shown (non inclusive)
Json: array/map | json shows the data and is useful for debugging
keyvalue: used to get all the values within an object example: 
    <div *ngFor="let pair of course | keyvalue"> 
        {{pair.key + ': ' + pair.value}}
    </div>

### ViewChild
Is used to query the template for matching results.
If it finds multiple matching results it will take the first one.
Can be used for components and for plain html elements.
Syntax example: 
    - @ViewChild(templateClass) variableName: templateClass; gets the component instance
    - @ViewChild('templateReference', {read: ElementRef}) variableName: ElementRef; gets a reference to the html Element not the component
    - @ViewChild('templateReference') variableName: templateClass; a template refeerence is marked as #templateReference in the template
    - @ViewChiild('templateReference') variableName: ElementRef; i.e. an html element could be a div or p tag
