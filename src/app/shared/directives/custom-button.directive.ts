import { UserService } from './../../core/modules/user/services/user.service';
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomButton]'
})
export class CustomButtonDirective implements OnInit {

  private nativeElement: any;
  private tooltip: HTMLElement;

  @Input() color: string;
  @Input() content: string;

  constructor(
    elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;
  }

  public ngOnInit(): void {
    if (this.nativeElement.tagName === 'BUTTON') {
      this.nativeElement.style.color = this.color;
      this.nativeElement.style.backgroundColor = '#ffffff';

      this.nativeElement.textContent = this.content;
    }
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.textContent = 'What u want ! or content of tooltip';
    document.querySelector('body').appendChild(this.tooltip);

    this.nativeElement.style.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.nativeElement.style.fontWeight = 'normal';
    document.querySelector('body').removeChild(this.tooltip);
  }

}
