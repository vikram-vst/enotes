import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserPreferenceComponentsPage, UserPreferenceDeleteDialog, UserPreferenceUpdatePage } from './user-preference.page-object';

const expect = chai.expect;

describe('UserPreference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userPreferenceComponentsPage: UserPreferenceComponentsPage;
  let userPreferenceUpdatePage: UserPreferenceUpdatePage;
  let userPreferenceDeleteDialog: UserPreferenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserPreferences', async () => {
    await navBarPage.goToEntity('user-preference');
    userPreferenceComponentsPage = new UserPreferenceComponentsPage();
    await browser.wait(ec.visibilityOf(userPreferenceComponentsPage.title), 5000);
    expect(await userPreferenceComponentsPage.getTitle()).to.eq('enotesApp.userPreference.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userPreferenceComponentsPage.entities), ec.visibilityOf(userPreferenceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserPreference page', async () => {
    await userPreferenceComponentsPage.clickOnCreateButton();
    userPreferenceUpdatePage = new UserPreferenceUpdatePage();
    expect(await userPreferenceUpdatePage.getPageTitle()).to.eq('enotesApp.userPreference.home.createOrEditLabel');
    await userPreferenceUpdatePage.cancel();
  });

  it('should create and save UserPreferences', async () => {
    const nbButtonsBeforeCreate = await userPreferenceComponentsPage.countDeleteButtons();

    await userPreferenceComponentsPage.clickOnCreateButton();

    await promise.all([
      userPreferenceUpdatePage.setNameInput('name'),
      userPreferenceUpdatePage.setDescriptionInput('description'),
      userPreferenceUpdatePage.preferenceSelectLastOption(),
      userPreferenceUpdatePage.userSelectLastOption()
    ]);

    expect(await userPreferenceUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await userPreferenceUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await userPreferenceUpdatePage.save();
    expect(await userPreferenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userPreferenceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last UserPreference', async () => {
    const nbButtonsBeforeDelete = await userPreferenceComponentsPage.countDeleteButtons();
    await userPreferenceComponentsPage.clickOnLastDeleteButton();

    userPreferenceDeleteDialog = new UserPreferenceDeleteDialog();
    expect(await userPreferenceDeleteDialog.getDialogTitle()).to.eq('enotesApp.userPreference.delete.question');
    await userPreferenceDeleteDialog.clickOnConfirmButton();

    expect(await userPreferenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
