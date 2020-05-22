import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductStoreComponentsPage, ProductStoreDeleteDialog, ProductStoreUpdatePage } from './product-store.page-object';

const expect = chai.expect;

describe('ProductStore e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productStoreComponentsPage: ProductStoreComponentsPage;
  let productStoreUpdatePage: ProductStoreUpdatePage;
  let productStoreDeleteDialog: ProductStoreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductStores', async () => {
    await navBarPage.goToEntity('product-store');
    productStoreComponentsPage = new ProductStoreComponentsPage();
    await browser.wait(ec.visibilityOf(productStoreComponentsPage.title), 5000);
    expect(await productStoreComponentsPage.getTitle()).to.eq('enotesApp.productStore.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(productStoreComponentsPage.entities), ec.visibilityOf(productStoreComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProductStore page', async () => {
    await productStoreComponentsPage.clickOnCreateButton();
    productStoreUpdatePage = new ProductStoreUpdatePage();
    expect(await productStoreUpdatePage.getPageTitle()).to.eq('enotesApp.productStore.home.createOrEditLabel');
    await productStoreUpdatePage.cancel();
  });

  it('should create and save ProductStores', async () => {
    const nbButtonsBeforeCreate = await productStoreComponentsPage.countDeleteButtons();

    await productStoreComponentsPage.clickOnCreateButton();

    await promise.all([
      productStoreUpdatePage.setNameInput('name'),
      productStoreUpdatePage.setTitleInput('title'),
      productStoreUpdatePage.ownerSelectLastOption()
    ]);

    expect(await productStoreUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await productStoreUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');

    await productStoreUpdatePage.save();
    expect(await productStoreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productStoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProductStore', async () => {
    const nbButtonsBeforeDelete = await productStoreComponentsPage.countDeleteButtons();
    await productStoreComponentsPage.clickOnLastDeleteButton();

    productStoreDeleteDialog = new ProductStoreDeleteDialog();
    expect(await productStoreDeleteDialog.getDialogTitle()).to.eq('enotesApp.productStore.delete.question');
    await productStoreDeleteDialog.clickOnConfirmButton();

    expect(await productStoreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
