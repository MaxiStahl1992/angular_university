import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]'
})
export class HighlightedDirective {
  @Input('highlighted')
  isHighlighted = false;
  

  constructor() { 
    console.log('directive created')
  }

  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostBinding('attr.disabled')
  get disabled() {
    return 'true'
  }

}
