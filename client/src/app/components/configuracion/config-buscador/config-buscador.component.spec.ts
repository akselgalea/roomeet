import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBuscadorComponent } from './config-buscador.component';

describe('ConfigBuscadorComponent', () => {
  let component: ConfigBuscadorComponent;
  let fixture: ComponentFixture<ConfigBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigBuscadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
