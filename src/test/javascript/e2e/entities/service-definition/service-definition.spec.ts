import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ServiceDefinitionComponentsPage,
  /* ServiceDefinitionDeleteDialog, */
  ServiceDefinitionUpdatePage
} from './service-definition.page-object';

const expect = chai.expect;

describe('ServiceDefinition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceDefinitionComponentsPage: ServiceDefinitionComponentsPage;
  let serviceDefinitionUpdatePage: ServiceDefinitionUpdatePage;
  /* let serviceDefinitionDeleteDialog: ServiceDefinitionDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceDefinitions', async () => {
    await navBarPage.goToEntity('service-definition');
    serviceDefinitionComponentsPage = new ServiceDefinitionComponentsPage();
    await browser.wait(ec.visibilityOf(serviceDefinitionComponentsPage.title), 5000);
    expect(await serviceDefinitionComponentsPage.getTitle()).to.eq('enotesApp.serviceDefinition.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceDefinitionComponentsPage.entities), ec.visibilityOf(serviceDefinitionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceDefinition page', async () => {
    await serviceDefinitionComponentsPage.clickOnCreateButton();
    serviceDefinitionUpdatePage = new ServiceDefinitionUpdatePage();
    expect(await serviceDefinitionUpdatePage.getPageTitle()).to.eq('enotesApp.serviceDefinition.home.createOrEditLabel');
    await serviceDefinitionUpdatePage.cancel();
  });

  /* it('should create and save ServiceDefinitions', async () => {
        const nbButtonsBeforeCreate = await serviceDefinitionComponentsPage.countDeleteButtons();

        await serviceDefinitionComponentsPage.clickOnCreateButton();

        await promise.all([
            serviceDefinitionUpdatePage.setTitleInput('title'),
            serviceDefinitionUpdatePage.setVersionInput('5'),
            serviceDefinitionUpdatePage.setImagePathInput('imagePath'),
            serviceDefinitionUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceDefinitionUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceDefinitionUpdatePage.setFieldsInput('fields'),
            serviceDefinitionUpdatePage.statusSelectLastOption(),
            serviceDefinitionUpdatePage.serviceSelectLastOption(),
        ]);

        expect(await serviceDefinitionUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await serviceDefinitionUpdatePage.getVersionInput()).to.eq('5', 'Expected version value to be equals to 5');
        expect(await serviceDefinitionUpdatePage.getImagePathInput()).to.eq('imagePath', 'Expected ImagePath value to be equals to imagePath');
        expect(await serviceDefinitionUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30', 'Expected createdDate value to be equals to 2000-12-31');
        expect(await serviceDefinitionUpdatePage.getLastModifiedDateInput()).to.contain('2001-01-01T02:30', 'Expected lastModifiedDate value to be equals to 2000-12-31');
        expect(await serviceDefinitionUpdatePage.getFieldsInput()).to.eq('fields', 'Expected Fields value to be equals to fields');

        await serviceDefinitionUpdatePage.save();
        expect(await serviceDefinitionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await serviceDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last ServiceDefinition', async () => {
        const nbButtonsBeforeDelete = await serviceDefinitionComponentsPage.countDeleteButtons();
        await serviceDefinitionComponentsPage.clickOnLastDeleteButton();

        serviceDefinitionDeleteDialog = new ServiceDefinitionDeleteDialog();
        expect(await serviceDefinitionDeleteDialog.getDialogTitle())
            .to.eq('enotesApp.serviceDefinition.delete.question');
        await serviceDefinitionDeleteDialog.clickOnConfirmButton();

        expect(await serviceDefinitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
