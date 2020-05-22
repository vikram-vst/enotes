import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoTypeComponentsPage, GeoTypeDeleteDialog, GeoTypeUpdatePage } from './geo-type.page-object';

const expect = chai.expect;

describe('GeoType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let geoTypeComponentsPage: GeoTypeComponentsPage;
  let geoTypeUpdatePage: GeoTypeUpdatePage;
  let geoTypeDeleteDialog: GeoTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GeoTypes', async () => {
    await navBarPage.goToEntity('geo-type');
    geoTypeComponentsPage = new GeoTypeComponentsPage();
    await browser.wait(ec.visibilityOf(geoTypeComponentsPage.title), 5000);
    expect(await geoTypeComponentsPage.getTitle()).to.eq('enotesApp.geoType.home.title');
    await browser.wait(ec.or(ec.visibilityOf(geoTypeComponentsPage.entities), ec.visibilityOf(geoTypeComponentsPage.noResult)), 1000);
  });

  it('should load create GeoType page', async () => {
    await geoTypeComponentsPage.clickOnCreateButton();
    geoTypeUpdatePage = new GeoTypeUpdatePage();
    expect(await geoTypeUpdatePage.getPageTitle()).to.eq('enotesApp.geoType.home.createOrEditLabel');
    await geoTypeUpdatePage.cancel();
  });

  it('should create and save GeoTypes', async () => {
    const nbButtonsBeforeCreate = await geoTypeComponentsPage.countDeleteButtons();

    await geoTypeComponentsPage.clickOnCreateButton();

    await promise.all([geoTypeUpdatePage.setNameInput('name')]);

    expect(await geoTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await geoTypeUpdatePage.save();
    expect(await geoTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await geoTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GeoType', async () => {
    const nbButtonsBeforeDelete = await geoTypeComponentsPage.countDeleteButtons();
    await geoTypeComponentsPage.clickOnLastDeleteButton();

    geoTypeDeleteDialog = new GeoTypeDeleteDialog();
    expect(await geoTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.geoType.delete.question');
    await geoTypeDeleteDialog.clickOnConfirmButton();

    expect(await geoTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
