import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPokerComponent } from './video-poker.component';

describe('VideoPokerComponent', () => {
  let component: VideoPokerComponent;
  let fixture: ComponentFixture<VideoPokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
