import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonComponentsPage, PersonDeleteDialog, PersonUpdatePage } from './person.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Person e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personComponentsPage: PersonComponentsPage;
  let personUpdatePage: PersonUpdatePage;
  let personDeleteDialog: PersonDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load People', async () => {
    await navBarPage.goToEntity('person');
    personComponentsPage = new PersonComponentsPage();
    await browser.wait(ec.visibilityOf(personComponentsPage.title), 5000);
    expect(await personComponentsPage.getTitle()).to.eq('enotesApp.person.home.title');
    await browser.wait(ec.or(ec.visibilityOf(personComponentsPage.entities), ec.visibilityOf(personComponentsPage.noResult)), 1000);
  });

  it('should load create Person page', async () => {
    await personComponentsPage.clickOnCreateButton();
    personUpdatePage = new PersonUpdatePage();
    expect(await personUpdatePage.getPageTitle()).to.eq('enotesApp.person.home.createOrEditLabel');
    await personUpdatePage.cancel();
  });

  it('should create and save People', async () => {
    const nbButtonsBeforeCreate = await personComponentsPage.countDeleteButtons();

    await personComponentsPage.clickOnCreateButton();

    await promise.all([
      personUpdatePage.setFirstNameInput('firstName'),
      personUpdatePage.setLastNameInput('lastName'),
      personUpdatePage.setDisplayNameInput('displayName'),
      personUpdatePage.setProfilePictureInput(absolutePath),
      personUpdatePage.setEmailInput('email'),
      personUpdatePage.setBirthdateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      personUpdatePage.setNotesInput('notes'),
      personUpdatePage.setMobileNumberInput('mobileNumber'),
      personUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      personUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      personUpdatePage.userSelectLastOption(),
      personUpdatePage.statusSelectLastOption(),
      personUpdatePage.preferredLanguageSelectLastOption(),
      personUpdatePage.genderSelectLastOption()
    ]);

    expect(await personUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await personUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await personUpdatePage.getDisplayNameInput()).to.eq('displayName', 'Expected DisplayName value to be equals to displayName');
    expect(await personUpdatePage.getProfilePictureInput()).to.endsWith(
      fileNameToUpload,
      'Expected ProfilePicture value to be end with ' + fileNameToUpload
    );
    expect(await personUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await personUpdatePage.getBirthdateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected birthdate value to be equals to 2000-12-31'
    );
    expect(await personUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');
    expect(await personUpdatePage.getMobileNumberInput()).to.eq('mobileNumber', 'Expected MobileNumber value to be equals to mobileNumber');
    expect(await personUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await personUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await personUpdatePage.save();
    expect(await personUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Person', async () => {
    const nbButtonsBeforeDelete = await personComponentsPage.countDeleteButtons();
    await personComponentsPage.clickOnLastDeleteButton();

    personDeleteDialog = new PersonDeleteDialog();
    expect(await personDeleteDialog.getDialogTitle()).to.eq('enotesApp.person.delete.question');
    await personDeleteDialog.clickOnConfirmButton();

    expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
