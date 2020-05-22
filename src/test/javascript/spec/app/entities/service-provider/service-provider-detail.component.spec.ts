import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceProviderDetailComponent } from 'app/entities/service-provider/service-provider-detail.component';
import { ServiceProvider } from 'app/shared/model/service-provider.model';

describe('Component Tests', () => {
  describe('ServiceProvider Management Detail Component', () => {
    let comp: ServiceProviderDetailComponent;
    let fixture: ComponentFixture<ServiceProviderDetailComponent>;
    const route = ({ data: of({ serviceProvider: new ServiceProvider(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceProviderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceProviderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceProviderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceProvider on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceProvider).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
