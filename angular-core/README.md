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

### Elvis Operator
? -> says that a value can be undefined

## TS Decorators
### @Input
Parent component inputs data into the child component.
Syntax [name]="the input info" in parent component. @Input name: type in child component.
in the child component I can rename the reference by @Input('src') name: type, if for example I want to name it image but need to access the src attribute in the parent to get the image url information.

### @Output
Child component outputs data to the parent component. 
Syntax (name)="method(event$)" in parent and @Output name = new EventEmitter<type>() in child. 

### ViewChild
Is used to query the template for matching results.
If it finds multiple matching results it will take the first one.
Can be used for components and for plain html elements.
Syntax example: 
    - @ViewChild(templateClass) variableName: templateClass; gets the component instance
    - @ViewChild('templateReference', {read: ElementRef}) variableName: ElementRef; gets a reference to the html Element not the component
    - @ViewChild('templateReference') variableName: templateClass; a template refeerence is marked as #templateReference in the template
    - @ViewChiild('templateReference') variableName: ElementRef; i.e. an html element could be a div or p tag

### ViewChildren
Querys the template for all matching children. 
It returns a QueryList. 
The Query list is similar to an array and offers most of the features an array offers like: first, last, forEach and map.
We can also use an Observable changes.

### ContentChild
Works similar to viewChild but is used in the context of content projection. 
It only sees what is within the content of the component (in parent), view child doesn't see that. However content child will not see what is within the template, whereas viewChild will see that. 

### ContentChildren
Works similar to viewChildren. The differences are the same as between viewChild and contentChild.

### ngTemplate

## HTML Methods
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

### ng-container
If there is no convenient place to add a structural directive (*ngIf, *ngFor, ngSwitch, ...) there is no need to add
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

### ng-content
If we add something in the component body in the parent element the input will be projected wherever we have put the ng-content tag in the component itself. 
With the select="" we can choose which parts we want to show. Inside the select we will put css classes. i.e select=".courses" or select="img"

### ng-template
Allows us to define blocks of html that correspond to a single isolated template.
It will not be displayed by default, we have to explicitly use it somewhere to be displayed.
A template can be instantiated in one component and other components can use it via input.
Variables can be defined by: let-variable="ngTemplateOutletContext" i.e let-variable="description"
<ng-template #templateExample>template</ng-template>
<div *ngIf="expression; else templateExample">test</div>

We can use ng-template as an input to a child. 
i.e. 
In Parent:
<ng-template #templateExample let-templateVariable="variableName">
<child-component [templateName]="templateExample"></child-component>
In Child:
TS
`@Input() templateName: TemplateRef<any>`
HTML
<ng-content *ngIf="expression; else tempName"></ng-content>
<ng-template #tempName>
    <ng-container *ngTemplateOutlet="templateName; context: {variableName: data.variable}"></ng-container>
</ng-template>

#### *ngTemplateOutlet
Use a template somewhere and give it input variables via context.
<ng-container *ngTemplateOutlet="templateExample; context: {name: data.input} //i.e. {description: course.description}"></ng-container>

## Lifecycle Hooks

### AfterViewInit
It is called after angular has fully initialized a components view. It handles any additional initialization tasks. 
Corresponds to viewChild mehtods. Earliest moment we can be sure all views have been initialized.

### AfterContentInit
It is called after angular has fully initialized all content of a directive. Handles additional initialization tasks.
Corresponds to contentChild methods. Earliest moment we can be sure that all content has been initialized.

### Attribute Directive
Create custom directive by 
`ng g directive ...`
To use a custom attribute directive call its selector in the html tag i.e. :
directive-selector [highlighted]
<custom-card highlighted></custom-card>

#### Add a css class in a directive
@HostBinding('className') -> specifies that we want to add a className to the host element (in this case custom-card)
get cssClasses() {
    return 'highlighted'
}  -> Typescript getter Method to enable the host to receive the return value of the function. In this case the className as a string calles highlighted

Special shorthand to add css classes:
@HostBinding('class.highlighted')
  get cssClasses() {
    return true;
  }

The name of the property we are binding to needs to be a known DOM property.

#### Binding to a directive
<coustom-card [highlighted]="true"></custom-card>
in driective
@Input('highlighted')
isHighlighted = false;

@HostBinding('class.highlighted)
get cssClass() {
    return this.isHighlighted
}

We can use an expression instead of a value in the card to choose dynamically when to add the directive.

#### Other directives
@HostBinding('style.border')
  get cssClasses() {
    return "1px solid black";
  }

 @HostBinding('attr.disabled')
  get disabled() {
    return 'true'
  }

#### Listening to events in directive
We cannot only bind to directives we can also listen.
I.e. if we want to know when the cursor hovers over the card we can listen to mouseover and mouseleave: 
The ['$event'] allows us to listen to every mousemove in the element. in this case its not necessary and is just an example
@HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event)
    this.isHighlighted = true; 
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false
  }

#### Custom Events in directives
With the Output property we can also emit events out of the directive like so in the example of toggeling a console log satement from false to true and vice versa:
directive: 
@Output()
  toggleHighlight = new EventEmitter();

@HostListener('mouseover', ['$event'])
  mouseOver($event) {
    console.log($event)
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false
    this.toggleHighlight.emit(this.isHighlighted);
  }

component.html: 
<component [highlighted]="false" (toggleHighlight)="onToggle($event)"></component>
component.ts: 
onToggle(isHighlighted: boolean) {
      console.log(isHighlighted)
    } 


#### Exporting Directives
add export as to directive decorators
@Directive({
  selector: '[highlighted]',
  exportAs: 'hgl'
})

add a method to directive like 
toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }

in component html
<component #highlighter="hgl" highlighted> 
    <p (dblclick)="highlighter.toggle()">test</p>
</component>

or in component ts
@ViewChild(HighlightedDirective)
    highlighted: HighlightedDirective

and then we can use the directive in any method. 

### Structural Directives
