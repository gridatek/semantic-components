import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { map, startWith } from 'rxjs/operators';

import { Observable, Subject, of } from 'rxjs';

import { TimezoneService } from './timezone.service';

@Component({
  selector: 'sc-timezone-picker',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  template: `
    <div class="tz-container">
      <input
        class="tz-input"
        [formControl]="control"
        [placeholder]="placeholder"
        [attr.aria-label]="placeholder"
        type="text"
      />

      <div class="tz-dropdown" *ngIf="options$ | async as opts">
        <div class="tz-option" *ngFor="let opt of opts" (click)="control.setValue(opt)">
          <span class="tz-label">{{ opt.label }}</span>
          <small class="tz-id">{{ opt.value }}</small>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tz-container {
      position: relative;
      width: 100%;
      max-width: 480px;
    }

    .tz-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .tz-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      max-height: 240px;
      overflow-y: auto;
      border: 1px solid #ccc;
      background: #fff;
      z-index: 1000;
    }

    .tz-option {
      padding: 6px 10px;
      cursor: pointer;
    }

    .tz-option:hover {
      background: #f5f5f5;
    }

    .tz-label {
      display: block;
    }
    .tz-id {
      opacity: 0.6;
      font-size: 0.8em;
    }
  `,
})
export class ScTimezonePicker implements OnInit, OnDestroy {
  @Input() locale: string | undefined;
  @Input() placeholder = 'Select timezone';

  @ViewChild('panel') panel!: ElementRef;

  control = new FormControl();
  options$: Observable<{ value: string; label: string }[]> = of([]);

  private allTimezones: { value: string; label: string }[] = [];
  private overlayRef!: OverlayRef;
  private destroy$ = new Subject<void>();

  constructor(
    private tzService: TimezoneService,
    private overlay: Overlay,
    private elementRef: ElementRef,
  ) {}

  async ngOnInit() {
    const loc = this.locale || navigator.language.split('-')[0];
    this.allTimezones = await this.tzService.getTimezones(loc);
    this.options$ = this.control.valueChanges.pipe(
      startWith(''),
      map((v) => (typeof v === 'string' ? v : v?.label || v || '')),
      map((text) => this._filter(text)),
    );

    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const initial = this.allTimezones.find((t) => t.value === browserTz);
    if (initial) this.control.setValue(initial);
  }

  displayFn(option: any): string {
    return option?.label || '';
  }

  private _filter(text: string) {
    const lower = text.toLowerCase();
    return this.allTimezones
      .filter((o) => o.label.toLowerCase().includes(lower) || o.value.toLowerCase().includes(lower))
      .slice(0, 200);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
