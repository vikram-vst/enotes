import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ServiceCategoryComponentsPage, ServiceCategoryDeleteDialog, ServiceCategoryUpdatePage } from './service-category.page-object';

const expect = chai.expect;

describe('ServiceCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceCategoryComponentsPage: ServiceCategoryComponentsPage;
  let serviceCategoryUpdatePage: ServiceCategoryUpdatePage;
  let serviceCategoryDeleteDialog: ServiceCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ServiceCategories', async () => {
    await navBarPage.goToEntity('service-category');
    serviceCategoryComponentsPage = new ServiceCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(serviceCategoryComponentsPage.title), 5000);
    expect(await serviceCategoryComponentsPage.getTitle()).to.eq('enotesApp.serviceCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(serviceCategoryComponentsPage.entities), ec.visibilityOf(serviceCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ServiceCategory page', async () => {
    await serviceCategoryComponentsPage.clickOnCreateButton();
    serviceCategoryUpdatePage = new ServiceCategoryUpdatePage();
    expect(await serviceCategoryUpdatePage.getPageTitle()).to.eq('enotesApp.serviceCategory.home.createOrEditLabel');
    await serviceCategoryUpdatePage.cancel();
  });

  it('should create and save ServiceCategories', async () => {
    const nbButtonsBeforeCreate = await serviceCategoryComponentsPage.countDeleteButtons();

    await serviceCategoryComponentsPage.clickOnCreateButton();

    await promise.all([
      serviceCategoryUpdatePage.setTitleInput('title'),
      serviceCategoryUpdatePage.setSequenceNoInput('5'),
      serviceCategoryUpdatePage.setParentCategoryInput('5'),
      serviceCategoryUpdatePage.setImagePathInput('imagePath'),
      serviceCategoryUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      serviceCategoryUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await serviceCategoryUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await serviceCategoryUpdatePage.getSequenceNoInput()).to.eq('5', 'Expected sequenceNo value to be equals to 5');
    expect(await serviceCategoryUpdatePage.getParentCategoryInput()).to.eq('5', 'Expected parentCategory value to be equals to 5');
    expect(await serviceCategoryUpdatePage.getImagePathInput()).to.eq('imagePath', 'Expected ImagePath value to be equals to imagePath');
    expect(await serviceCategoryUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await serviceCategoryUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await serviceCategoryUpdatePage.save();
    expect(await serviceCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await serviceCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ServiceCategory', async () => {
    const nbButtonsBeforeDelete = await serviceCategoryComponentsPage.countDeleteButtons();
    await serviceCategoryComponentsPage.clickOnLastDeleteButton();

    serviceCategoryDeleteDialog = new ServiceCategoryDeleteDialog();
    expect(await serviceCategoryDeleteDialog.getDialogTitle()).to.eq('enotesApp.serviceCategory.delete.question');
    await serviceCategoryDeleteDialog.clickOnConfirmButton();

    expect(await serviceCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
