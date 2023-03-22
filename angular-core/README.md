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

### ngFor
