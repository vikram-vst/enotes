import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoAssocComponentsPage, GeoAssocDeleteDialog, GeoAssocUpdatePage } from './geo-assoc.page-object';

const expect = chai.expect;

describe('GeoAssoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let geoAssocComponentsPage: GeoAssocComponentsPage;
  let geoAssocUpdatePage: GeoAssocUpdatePage;
  let geoAssocDeleteDialog: GeoAssocDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load GeoAssocs', async () => {
    await navBarPage.goToEntity('geo-assoc');
    geoAssocComponentsPage = new GeoAssocComponentsPage();
    await browser.wait(ec.visibilityOf(geoAssocComponentsPage.title), 5000);
    expect(await geoAssocComponentsPage.getTitle()).to.eq('enotesApp.geoAssoc.home.title');
    await browser.wait(ec.or(ec.visibilityOf(geoAssocComponentsPage.entities), ec.visibilityOf(geoAssocComponentsPage.noResult)), 1000);
  });

  it('should load create GeoAssoc page', async () => {
    await geoAssocComponentsPage.clickOnCreateButton();
    geoAssocUpdatePage = new GeoAssocUpdatePage();
    expect(await geoAssocUpdatePage.getPageTitle()).to.eq('enotesApp.geoAssoc.home.createOrEditLabel');
    await geoAssocUpdatePage.cancel();
  });

  it('should create and save GeoAssocs', async () => {
    const nbButtonsBeforeCreate = await geoAssocComponentsPage.countDeleteButtons();

    await geoAssocComponentsPage.clickOnCreateButton();

    await promise.all([
      geoAssocUpdatePage.geoSelectLastOption(),
      geoAssocUpdatePage.geoToSelectLastOption(),
      geoAssocUpdatePage.geoAssocTypeSelectLastOption()
    ]);

    await geoAssocUpdatePage.save();
    expect(await geoAssocUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await geoAssocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last GeoAssoc', async () => {
    const nbButtonsBeforeDelete = await geoAssocComponentsPage.countDeleteButtons();
    await geoAssocComponentsPage.clickOnLastDeleteButton();

    geoAssocDeleteDialog = new GeoAssocDeleteDialog();
    expect(await geoAssocDeleteDialog.getDialogTitle()).to.eq('enotesApp.geoAssoc.delete.question');
    await geoAssocDeleteDialog.clickOnConfirmButton();

    expect(await geoAssocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
