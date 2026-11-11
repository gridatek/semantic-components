/**
 * The two roots' template (`scComboboxNext`, one value or several): the
 * popup's template in a CDK overlay hung from the field — inside Aria's
 * popup when the input is the field, on its own when a trigger opens it (the
 * search inside it is then the combobox).
 */
export const scComboboxNextTemplate = `
  <ng-content />
  @if (field(); as field) {
    <ng-template
      ngComboboxPopup
      [combobox]="field.combobox"
      popupType="listbox"
    >
      <ng-template
        [cdkConnectedOverlay]="{
          origin: anchor() ?? field.element,
          usePopover: 'inline',
          matchWidth: true,
          transformOriginSelector: '[data-slot=combobox-content]',
          flexibleDimensions: true,
          viewportMargin: 8,
        }"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions"
        (positionChange)="onPositionChange($event)"
      >
        <ng-container [scPortalOutlet]="portal()" />
      </ng-template>
    </ng-template>
  } @else {
    @if (triggerElement(); as trigger) {
      <ng-template
        [cdkConnectedOverlay]="{
          origin: trigger,
          usePopover: 'inline',
          matchWidth: true,
          transformOriginSelector: '[data-slot=combobox-content]',
          flexibleDimensions: true,
          viewportMargin: 8,
        }"
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayPositions]="positions"
        (positionChange)="onPositionChange($event)"
        (overlayOutsideClick)="onOutsideClick($event)"
      >
        <ng-container [scPortalOutlet]="portal()" />
      </ng-template>
    }
  }
`;
