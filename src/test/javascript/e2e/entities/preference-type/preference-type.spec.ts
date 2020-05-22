import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PreferenceTypeComponentsPage, PreferenceTypeDeleteDialog, PreferenceTypeUpdatePage } from './preference-type.page-object';

const expect = chai.expect;

describe('PreferenceType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let preferenceTypeComponentsPage: PreferenceTypeComponentsPage;
  let preferenceTypeUpdatePage: PreferenceTypeUpdatePage;
  let preferenceTypeDeleteDialog: PreferenceTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PreferenceTypes', async () => {
    await navBarPage.goToEntity('preference-type');
    preferenceTypeComponentsPage = new PreferenceTypeComponentsPage();
    await browser.wait(ec.visibilityOf(preferenceTypeComponentsPage.title), 5000);
    expect(await preferenceTypeComponentsPage.getTitle()).to.eq('enotesApp.preferenceType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(preferenceTypeComponentsPage.entities), ec.visibilityOf(preferenceTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PreferenceType page', async () => {
    await preferenceTypeComponentsPage.clickOnCreateButton();
    preferenceTypeUpdatePage = new PreferenceTypeUpdatePage();
    expect(await preferenceTypeUpdatePage.getPageTitle()).to.eq('enotesApp.preferenceType.home.createOrEditLabel');
    await preferenceTypeUpdatePage.cancel();
  });

  it('should create and save PreferenceTypes', async () => {
    const nbButtonsBeforeCreate = await preferenceTypeComponentsPage.countDeleteButtons();

    await preferenceTypeComponentsPage.clickOnCreateButton();

    await promise.all([preferenceTypeUpdatePage.setNameInput('name'), preferenceTypeUpdatePage.setDescriptionInput('description')]);

    expect(await preferenceTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await preferenceTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await preferenceTypeUpdatePage.save();
    expect(await preferenceTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await preferenceTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PreferenceType', async () => {
    const nbButtonsBeforeDelete = await preferenceTypeComponentsPage.countDeleteButtons();
    await preferenceTypeComponentsPage.clickOnLastDeleteButton();

    preferenceTypeDeleteDialog = new PreferenceTypeDeleteDialog();
    expect(await preferenceTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.preferenceType.delete.question');
    await preferenceTypeDeleteDialog.clickOnConfirmButton();

    expect(await preferenceTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
