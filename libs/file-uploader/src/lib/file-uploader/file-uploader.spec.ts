import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploader } from './file-uploader';

describe('FileUploader', () => {
  let component: FileUploader;
  let fixture: ComponentFixture<FileUploader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploader],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
