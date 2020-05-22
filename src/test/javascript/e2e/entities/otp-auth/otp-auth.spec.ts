import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OtpAuthComponentsPage, OtpAuthDeleteDialog, OtpAuthUpdatePage } from './otp-auth.page-object';

const expect = chai.expect;

describe('OtpAuth e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let otpAuthComponentsPage: OtpAuthComponentsPage;
  let otpAuthUpdatePage: OtpAuthUpdatePage;
  let otpAuthDeleteDialog: OtpAuthDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OtpAuths', async () => {
    await navBarPage.goToEntity('otp-auth');
    otpAuthComponentsPage = new OtpAuthComponentsPage();
    await browser.wait(ec.visibilityOf(otpAuthComponentsPage.title), 5000);
    expect(await otpAuthComponentsPage.getTitle()).to.eq('enotesApp.otpAuth.home.title');
    await browser.wait(ec.or(ec.visibilityOf(otpAuthComponentsPage.entities), ec.visibilityOf(otpAuthComponentsPage.noResult)), 1000);
  });

  it('should load create OtpAuth page', async () => {
    await otpAuthComponentsPage.clickOnCreateButton();
    otpAuthUpdatePage = new OtpAuthUpdatePage();
    expect(await otpAuthUpdatePage.getPageTitle()).to.eq('enotesApp.otpAuth.home.createOrEditLabel');
    await otpAuthUpdatePage.cancel();
  });

  it('should create and save OtpAuths', async () => {
    const nbButtonsBeforeCreate = await otpAuthComponentsPage.countDeleteButtons();

    await otpAuthComponentsPage.clickOnCreateButton();

    await promise.all([
      otpAuthUpdatePage.setOtpInput('otp'),
      otpAuthUpdatePage.setOtpSentTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      otpAuthUpdatePage.setSentCounterInput('5'),
      otpAuthUpdatePage.setFailCounterInput('5'),
      otpAuthUpdatePage.setOtpResetCounterInput('5'),
      otpAuthUpdatePage.setMaxResendInput('5'),
      otpAuthUpdatePage.setMaxResetInput('5'),
      otpAuthUpdatePage.setMaxFailuresInput('5'),
      otpAuthUpdatePage.setOtpActiveTimeInput('5'),
      otpAuthUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      otpAuthUpdatePage.setLastModifiedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      otpAuthUpdatePage.userSelectLastOption()
    ]);

    expect(await otpAuthUpdatePage.getOtpInput()).to.eq('otp', 'Expected Otp value to be equals to otp');
    const selectedOtpSent = otpAuthUpdatePage.getOtpSentInput();
    if (await selectedOtpSent.isSelected()) {
      await otpAuthUpdatePage.getOtpSentInput().click();
      expect(await otpAuthUpdatePage.getOtpSentInput().isSelected(), 'Expected otpSent not to be selected').to.be.false;
    } else {
      await otpAuthUpdatePage.getOtpSentInput().click();
      expect(await otpAuthUpdatePage.getOtpSentInput().isSelected(), 'Expected otpSent to be selected').to.be.true;
    }
    const selectedVerificationSuccess = otpAuthUpdatePage.getVerificationSuccessInput();
    if (await selectedVerificationSuccess.isSelected()) {
      await otpAuthUpdatePage.getVerificationSuccessInput().click();
      expect(await otpAuthUpdatePage.getVerificationSuccessInput().isSelected(), 'Expected verificationSuccess not to be selected').to.be
        .false;
    } else {
      await otpAuthUpdatePage.getVerificationSuccessInput().click();
      expect(await otpAuthUpdatePage.getVerificationSuccessInput().isSelected(), 'Expected verificationSuccess to be selected').to.be.true;
    }
    const selectedOtpExpired = otpAuthUpdatePage.getOtpExpiredInput();
    if (await selectedOtpExpired.isSelected()) {
      await otpAuthUpdatePage.getOtpExpiredInput().click();
      expect(await otpAuthUpdatePage.getOtpExpiredInput().isSelected(), 'Expected otpExpired not to be selected').to.be.false;
    } else {
      await otpAuthUpdatePage.getOtpExpiredInput().click();
      expect(await otpAuthUpdatePage.getOtpExpiredInput().isSelected(), 'Expected otpExpired to be selected').to.be.true;
    }
    expect(await otpAuthUpdatePage.getOtpSentTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected otpSentTime value to be equals to 2000-12-31'
    );
    expect(await otpAuthUpdatePage.getSentCounterInput()).to.eq('5', 'Expected sentCounter value to be equals to 5');
    expect(await otpAuthUpdatePage.getFailCounterInput()).to.eq('5', 'Expected failCounter value to be equals to 5');
    expect(await otpAuthUpdatePage.getOtpResetCounterInput()).to.eq('5', 'Expected otpResetCounter value to be equals to 5');
    expect(await otpAuthUpdatePage.getMaxResendInput()).to.eq('5', 'Expected maxResend value to be equals to 5');
    expect(await otpAuthUpdatePage.getMaxResetInput()).to.eq('5', 'Expected maxReset value to be equals to 5');
    expect(await otpAuthUpdatePage.getMaxFailuresInput()).to.eq('5', 'Expected maxFailures value to be equals to 5');
    expect(await otpAuthUpdatePage.getOtpActiveTimeInput()).to.eq('5', 'Expected otpActiveTime value to be equals to 5');
    expect(await otpAuthUpdatePage.getCreatedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createdDate value to be equals to 2000-12-31'
    );
    expect(await otpAuthUpdatePage.getLastModifiedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastModifiedDate value to be equals to 2000-12-31'
    );

    await otpAuthUpdatePage.save();
    expect(await otpAuthUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await otpAuthComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last OtpAuth', async () => {
    const nbButtonsBeforeDelete = await otpAuthComponentsPage.countDeleteButtons();
    await otpAuthComponentsPage.clickOnLastDeleteButton();

    otpAuthDeleteDialog = new OtpAuthDeleteDialog();
    expect(await otpAuthDeleteDialog.getDialogTitle()).to.eq('enotesApp.otpAuth.delete.question');
    await otpAuthDeleteDialog.clickOnConfirmButton();

    expect(await otpAuthComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
