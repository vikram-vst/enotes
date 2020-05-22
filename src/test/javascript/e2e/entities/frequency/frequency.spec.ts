import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FrequencyComponentsPage, FrequencyDeleteDialog, FrequencyUpdatePage } from './frequency.page-object';

const expect = chai.expect;

describe('Frequency e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let frequencyComponentsPage: FrequencyComponentsPage;
  let frequencyUpdatePage: FrequencyUpdatePage;
  let frequencyDeleteDialog: FrequencyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Frequencies', async () => {
    await navBarPage.goToEntity('frequency');
    frequencyComponentsPage = new FrequencyComponentsPage();
    await browser.wait(ec.visibilityOf(frequencyComponentsPage.title), 5000);
    expect(await frequencyComponentsPage.getTitle()).to.eq('enotesApp.frequency.home.title');
    await browser.wait(ec.or(ec.visibilityOf(frequencyComponentsPage.entities), ec.visibilityOf(frequencyComponentsPage.noResult)), 1000);
  });

  it('should load create Frequency page', async () => {
    await frequencyComponentsPage.clickOnCreateButton();
    frequencyUpdatePage = new FrequencyUpdatePage();
    expect(await frequencyUpdatePage.getPageTitle()).to.eq('enotesApp.frequency.home.createOrEditLabel');
    await frequencyUpdatePage.cancel();
  });

  it('should create and save Frequencies', async () => {
    const nbButtonsBeforeCreate = await frequencyComponentsPage.countDeleteButtons();

    await frequencyComponentsPage.clickOnCreateButton();

    await promise.all([frequencyUpdatePage.setNameInput('name'), frequencyUpdatePage.setDescriptionInput('description')]);

    expect(await frequencyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await frequencyUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await frequencyUpdatePage.save();
    expect(await frequencyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await frequencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Frequency', async () => {
    const nbButtonsBeforeDelete = await frequencyComponentsPage.countDeleteButtons();
    await frequencyComponentsPage.clickOnLastDeleteButton();

    frequencyDeleteDialog = new FrequencyDeleteDialog();
    expect(await frequencyDeleteDialog.getDialogTitle()).to.eq('enotesApp.frequency.delete.question');
    await frequencyDeleteDialog.clickOnConfirmButton();

    expect(await frequencyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
