import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[highlight]',
    standalone: true,
})
export class HighlightDirective {
    constructor(private element: ElementRef<any>) { }
    private term: string = "";
    private highlightText(term: string) {
        debugger
        let innerHTML = this.element.nativeElement.innerHTML;
        const allTextNodes = this.element.nativeElement.querySelectorAll('*');
        for (const textNode of allTextNodes) {
            const text = textNode.textContent;
            //TODO: fix it 
            const replacedText = text.replaceAll(term, `<span class="highlight">${term}</span>`);
            textNode.textContent = replacedText;
        }
    }

    ngAfterViewInit() {
        // element is ready for use
        this.highlightText(this.term);
    }

    @Input() set highlight(term: string) {
        debugger
        this.term = term;       // this.highlightText(term);
        // Clear any existing content
        // this.viewContainerRef.clear();

        // // Create an embedded view using the templateRef
        // const view = this.viewContainerRef.createEmbeddedView(this.templateRef);

        // // Check if the term exists in the template content
        // if (view.rootNodes.some(node => node.textContent.includes(term))) {
        //   // Apply your highlighting logic here, for example:
        //   view.rootNodes.forEach(node => {
        //     const content = node.textContent;
        //     const highlightedContent = content.replace(new RegExp(term, 'gi'), '<span class="highlight">$&</span>');
        //     node.innerHTML = highlightedContent;
        //   });
        // }
    }
}