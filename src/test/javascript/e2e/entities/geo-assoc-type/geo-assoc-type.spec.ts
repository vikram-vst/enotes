import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoAssocTypeComponentsPage, GeoAssocTypeDeleteDialog, GeoAssocTypeUpdatePage } from './geo-assoc-type.page-object';

const expect = chai.expect;

describe('GeoAssocType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let geoAssocTypeComponentsPage: GeoAssocTypeComponentsPage;
  let geoAssocTypeUpdatePage: GeoAssocTypeUpdatePage;
  let geoAssocTypeDeleteDialog: GeoAssocTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GeoAssocTypes', async () => {
    await navBarPage.goToEntity('geo-assoc-type');
    geoAssocTypeComponentsPage = new GeoAssocTypeComponentsPage();
    await browser.wait(ec.visibilityOf(geoAssocTypeComponentsPage.title), 5000);
    expect(await geoAssocTypeComponentsPage.getTitle()).to.eq('enotesApp.geoAssocType.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(geoAssocTypeComponentsPage.entities), ec.visibilityOf(geoAssocTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create GeoAssocType page', async () => {
    await geoAssocTypeComponentsPage.clickOnCreateButton();
    geoAssocTypeUpdatePage = new GeoAssocTypeUpdatePage();
    expect(await geoAssocTypeUpdatePage.getPageTitle()).to.eq('enotesApp.geoAssocType.home.createOrEditLabel');
    await geoAssocTypeUpdatePage.cancel();
  });

  it('should create and save GeoAssocTypes', async () => {
    const nbButtonsBeforeCreate = await geoAssocTypeComponentsPage.countDeleteButtons();

    await geoAssocTypeComponentsPage.clickOnCreateButton();

    await promise.all([geoAssocTypeUpdatePage.setNameInput('name')]);

    expect(await geoAssocTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await geoAssocTypeUpdatePage.save();
    expect(await geoAssocTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await geoAssocTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GeoAssocType', async () => {
    const nbButtonsBeforeDelete = await geoAssocTypeComponentsPage.countDeleteButtons();
    await geoAssocTypeComponentsPage.clickOnLastDeleteButton();

    geoAssocTypeDeleteDialog = new GeoAssocTypeDeleteDialog();
    expect(await geoAssocTypeDeleteDialog.getDialogTitle()).to.eq('enotesApp.geoAssocType.delete.question');
    await geoAssocTypeDeleteDialog.clickOnConfirmButton();

    expect(await geoAssocTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
