import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceProviderRoleDetailComponent } from 'app/entities/service-provider-role/service-provider-role-detail.component';
import { ServiceProviderRole } from 'app/shared/model/service-provider-role.model';

describe('Component Tests', () => {
  describe('ServiceProviderRole Management Detail Component', () => {
    let comp: ServiceProviderRoleDetailComponent;
    let fixture: ComponentFixture<ServiceProviderRoleDetailComponent>;
    const route = ({ data: of({ serviceProviderRole: new ServiceProviderRole(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceProviderRoleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ServiceProviderRoleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceProviderRoleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load serviceProviderRole on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceProviderRole).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
