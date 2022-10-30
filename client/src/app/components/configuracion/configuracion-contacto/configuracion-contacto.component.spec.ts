import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionContactoComponent } from './configuracion-contacto.component';

describe('ConfiguracionContactoComponent', () => {
  let component: ConfiguracionContactoComponent;
  let fixture: ComponentFixture<ConfiguracionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
