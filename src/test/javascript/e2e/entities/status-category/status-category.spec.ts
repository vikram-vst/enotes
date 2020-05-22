import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StatusCategoryComponentsPage, StatusCategoryDeleteDialog, StatusCategoryUpdatePage } from './status-category.page-object';

const expect = chai.expect;

describe('StatusCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statusCategoryComponentsPage: StatusCategoryComponentsPage;
  let statusCategoryUpdatePage: StatusCategoryUpdatePage;
  let statusCategoryDeleteDialog: StatusCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StatusCategories', async () => {
    await navBarPage.goToEntity('status-category');
    statusCategoryComponentsPage = new StatusCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(statusCategoryComponentsPage.title), 5000);
    expect(await statusCategoryComponentsPage.getTitle()).to.eq('enotesApp.statusCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(statusCategoryComponentsPage.entities), ec.visibilityOf(statusCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StatusCategory page', async () => {
    await statusCategoryComponentsPage.clickOnCreateButton();
    statusCategoryUpdatePage = new StatusCategoryUpdatePage();
    expect(await statusCategoryUpdatePage.getPageTitle()).to.eq('enotesApp.statusCategory.home.createOrEditLabel');
    await statusCategoryUpdatePage.cancel();
  });

  it('should create and save StatusCategories', async () => {
    const nbButtonsBeforeCreate = await statusCategoryComponentsPage.countDeleteButtons();

    await statusCategoryComponentsPage.clickOnCreateButton();

    await promise.all([statusCategoryUpdatePage.setNameInput('name'), statusCategoryUpdatePage.setDescriptionInput('description')]);

    expect(await statusCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await statusCategoryUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await statusCategoryUpdatePage.save();
    expect(await statusCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statusCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last StatusCategory', async () => {
    const nbButtonsBeforeDelete = await statusCategoryComponentsPage.countDeleteButtons();
    await statusCategoryComponentsPage.clickOnLastDeleteButton();

    statusCategoryDeleteDialog = new StatusCategoryDeleteDialog();
    expect(await statusCategoryDeleteDialog.getDialogTitle()).to.eq('enotesApp.statusCategory.delete.question');
    await statusCategoryDeleteDialog.clickOnConfirmButton();

    expect(await statusCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
