import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private e1: ElementRef) {
     //this.e1.nativeElement.style.backgroundColor = 'yellow';
   }

   @HostListener('mouseenter') onMouseEnter(){
      this.highlight('yellow')
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.highlight('')
   }

   private highlight(color: string) {
    this.e1.nativeElement.style.backgroundColor = color;
  }
}
