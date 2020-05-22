import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EnotesTestModule } from '../../../test.module';
import { ServiceProviderRoleUpdateComponent } from 'app/entities/service-provider-role/service-provider-role-update.component';
import { ServiceProviderRoleService } from 'app/entities/service-provider-role/service-provider-role.service';
import { ServiceProviderRole } from 'app/shared/model/service-provider-role.model';

describe('Component Tests', () => {
  describe('ServiceProviderRole Management Update Component', () => {
    let comp: ServiceProviderRoleUpdateComponent;
    let fixture: ComponentFixture<ServiceProviderRoleUpdateComponent>;
    let service: ServiceProviderRoleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EnotesTestModule],
        declarations: [ServiceProviderRoleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ServiceProviderRoleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceProviderRoleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceProviderRoleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceProviderRole(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceProviderRole();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
