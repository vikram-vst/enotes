import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IOtpAuth {
  id?: number;
  otp?: string;
  otpSent?: boolean;
  verificationSuccess?: boolean;
  otpExpired?: boolean;
  otpSentTime?: Moment;
  sentCounter?: number;
  failCounter?: number;
  otpResetCounter?: number;
  maxResend?: number;
  maxReset?: number;
  maxFailures?: number;
  otpActiveTime?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  user?: IUser;
}

export class OtpAuth implements IOtpAuth {
  constructor(
    public id?: number,
    public otp?: string,
    public otpSent?: boolean,
    public verificationSuccess?: boolean,
    public otpExpired?: boolean,
    public otpSentTime?: Moment,
    public sentCounter?: number,
    public failCounter?: number,
    public otpResetCounter?: number,
    public maxResend?: number,
    public maxReset?: number,
    public maxFailures?: number,
    public otpActiveTime?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public user?: IUser
  ) {
    this.otpSent = this.otpSent || false;
    this.verificationSuccess = this.verificationSuccess || false;
    this.otpExpired = this.otpExpired || false;
  }
}
