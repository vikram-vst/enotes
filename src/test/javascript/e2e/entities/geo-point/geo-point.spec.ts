import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoPointComponentsPage, GeoPointDeleteDialog, GeoPointUpdatePage } from './geo-point.page-object';

const expect = chai.expect;

describe('GeoPoint e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let geoPointComponentsPage: GeoPointComponentsPage;
  let geoPointUpdatePage: GeoPointUpdatePage;
  let geoPointDeleteDialog: GeoPointDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GeoPoints', async () => {
    await navBarPage.goToEntity('geo-point');
    geoPointComponentsPage = new GeoPointComponentsPage();
    await browser.wait(ec.visibilityOf(geoPointComponentsPage.title), 5000);
    expect(await geoPointComponentsPage.getTitle()).to.eq('enotesApp.geoPoint.home.title');
    await browser.wait(ec.or(ec.visibilityOf(geoPointComponentsPage.entities), ec.visibilityOf(geoPointComponentsPage.noResult)), 1000);
  });

  it('should load create GeoPoint page', async () => {
    await geoPointComponentsPage.clickOnCreateButton();
    geoPointUpdatePage = new GeoPointUpdatePage();
    expect(await geoPointUpdatePage.getPageTitle()).to.eq('enotesApp.geoPoint.home.createOrEditLabel');
    await geoPointUpdatePage.cancel();
  });

  it('should create and save GeoPoints', async () => {
    const nbButtonsBeforeCreate = await geoPointComponentsPage.countDeleteButtons();

    await geoPointComponentsPage.clickOnCreateButton();

    await promise.all([geoPointUpdatePage.setLatitudeInput('5'), geoPointUpdatePage.setLongitudeInput('5')]);

    expect(await geoPointUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await geoPointUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');

    await geoPointUpdatePage.save();
    expect(await geoPointUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await geoPointComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GeoPoint', async () => {
    const nbButtonsBeforeDelete = await geoPointComponentsPage.countDeleteButtons();
    await geoPointComponentsPage.clickOnLastDeleteButton();

    geoPointDeleteDialog = new GeoPointDeleteDialog();
    expect(await geoPointDeleteDialog.getDialogTitle()).to.eq('enotesApp.geoPoint.delete.question');
    await geoPointDeleteDialog.clickOnConfirmButton();

    expect(await geoPointComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
