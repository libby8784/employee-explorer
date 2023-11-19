import { Component, Input, NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directives'


@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent<T> {

  @Input() searchFunction: (search: string, page:number) => Observable<T[]>;
  @Input() autoSearchItemTemplate?: TemplateRef<T> = null;

  @Output() searchEvent = new EventEmitter<string>();
  @Output() selectItemEvent = new EventEmitter<T>();


  public items: T[] = [];
  public hasMessage: boolean = false;
  public message: string = "";
  public focusOnSearchInput: boolean = false;
  public focusOnSuggesions: boolean = false;


  public searchTerm: string = "";

  private page: number = 0;
  private isSuggestionLoading: boolean = false
  private hasError = false;

  public ngOnInit() {
    this.setAutocompleteMessage("type to see our suggestions...")
  }


  public showSuggestions(): boolean {
    return this.focusOnSearchInput || this.focusOnSuggesions;
  }
l
  private setAutocompleteMessage(message: string) {
    this.hasMessage = true;
    this.message = message;
  }

  public search(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  public selectItem(item: T): void {
    this.focusOnSuggesions = false;
    this.selectItemEvent.emit(item);
  }

  private autoSearchCallback(items: T[]) {
    this.resetLoadItemsOnScroll();
    this.items = items;
    if(this.hasError){
      return;
    }
    
    if (this.items.length == 0) {
      this.setAutocompleteMessage("no results");
      return;
    }

    this.hasMessage = false;
  }

  private catchAutosearchError(): Observable<T[]> {
    this.hasError = true;
    this.setAutocompleteMessage("oops, soething get worng");
    return of([] as T[]);
  }

  public autoSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.hasError = false;

    if (searchTerm.length < 2) { 
      searchTerm.length == 0 ? this.setAutocompleteMessage("type to see our suggestions...") :this.setAutocompleteMessage("continue type to see our suggestions...");
      this.items = [];

      return;
    }

    if (this.searchFunction == null) {
      this.setAutocompleteMessage("oops something get wrong")
      return;
    }

    //TODO: add loading icon 
    this.searchFunction(this.searchTerm, 0).pipe(catchError(() => this.catchAutosearchError()))
      .subscribe(items => this.autoSearchCallback(items));
  }

  private resetLoadItemsOnScroll() {
    this.isSuggestionLoading = false;
    this.page = 0;
  }

  public loadItemsOnScroll(target) {
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollLimit = (scrollHeight - clientHeight) * 0.8;

    if (scrollTop >= scrollLimit && !this.isSuggestionLoading) {
      this.isSuggestionLoading = true;
      this.page++;
      this.searchFunction(this.searchTerm, this.page)
        .subscribe(items => {
          if (items.length == 0) {
            this.isSuggestionLoading = true;
          } else {
            this.items.push(...items);
          }
        });
    }
  }

  //TODO: add keydoun event handler to enable choose item by keyboard
}  
