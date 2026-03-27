import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSidebarAppComponent } from './item-sidebar-app.component';

describe('ItemSidebarAppComponent', () => {
  let component: ItemSidebarAppComponent;
  let fixture: ComponentFixture<ItemSidebarAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSidebarAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSidebarAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
