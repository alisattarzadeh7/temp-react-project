import starkString from 'starkstring';
import moment from 'moment';
import _ from 'lodash';
import { defaultApi, satrexApi } from './ApiConfig';
import satrexToast from '../components/satrexToast';
import { Store } from '../redux/store';
import { transFn } from '../components/Trans';
import { setJwtToken, setRefreshTokenTime } from '../redux/actions/LoginActions';
import { Api } from './Api';





export const sendSmsCodeByNumber = (params) => Api.call({ url: '/User/SendMobileSecretCodeForForgetPassword', params }, {
  showErrors: true,
  showSuccess: 'The code was sent to you',
});
export const resetPassword = (params) => Api.call({ url: '/User/ResetPassword', params }, {
  showErrors: true,
});

export const getMessageDetails = (params) => Api.call({ url: '/Ticket/GetDetails', params }, {
  returnData: true,
});

export const updateEmail = (params) => Api.call({ url: '/User/UpdateEmail', params }, {
  showErrors: true,
  showSuccess:'Email saved successfully'
});
export const logingOut = (params) => Api.call({ url: '/Token/Logout', params }, {
  showErrors: true,
  showSuccess:'Email saved successfully'
});

export const sendEmailVerificationCode = (params) => Api.call({ url: '/User/SendEmailVerificationCode', params }, {
  showErrors: true,
});


export const updatePersonalInfo = (params) => Api.call({ url: '/User/SendEmailVerificationCode', params }, {
  showErrors: true,
});


export const codeVarification = (params) => Api.call({ url: '/ExternalAuthorization/VerifyOtpForIdentityAuthorization', params }, {
  showErrors: true,
  showSuccess:'Information successfully verified'
});

export const cancelPersonalInfoConfirmRequest = (params) => Api.call({ url: '/PersonalInfo/CancelConfirmRequest', params }, {
  showErrors: true,
  showSuccess:'Request to verify review successfully cancelled'
});

export const sendImagesConfirmRequest = (params) => Api.call({ url: '/UserImage/SetConfirmRequest', params }, {
  showErrors: true,
  showSuccess:'The review request was successfully sent to the admin'
});


export const getBankAccounts = (params) => Api.call({ url: '/BankAccounts/GetList', params }, {
  returnData: true,
});

export const getUserMessages = (params) => Api.call({ url: '/Ticket/GetList', params }, {
  returnData: true,
});

export const savingBankAccount = (params) => Api.call({ url: '/BankAccounts/Add', params }, {
  showErrors: true,
  returnData: true,
});

export const sendBankAccountToAdmin = (params) => Api.call({ url: '/BankAccounts/SetConfirmRequest', params }, {
  showErrors: true,
  showSuccess:'Bank account successfully sent to admin'
});

export const cancelAccount = (params) => Api.call({ url: '/BankAccounts/CancelConfirmRequest', params }, {
  showErrors: true,
  showSuccess:'Request to verify review successfully cancelled'
});

export const removingAccount = (params) => Api.call({ url: '/BankAccounts/Remove', params }, {
  showErrors: true,
  showSuccess:"Information deleted successfully"
});

export const getQualifyLevel = (params) => Api.call({ url: '/QualifyLevel/Get', params }, {
  returnData: true,
});

export const getPersonalInfo = (params) => Api.call({ url: '/PersonalInfo/Get', params }, {
  returnData: true,
});

export const cancelContactInfoConfirmRequest = (params) => Api.call({ url: '/AddressInfo/CancelConfirmRequest', params }, {
  showErrors: true,
  showSuccess:"Request to verify review successfully cancelled"
});

export const setContactInfoConfirmReq = (params) => Api.call({ url: '/AddressInfo/SetConfirmRequest', params }, {
  showErrors: true,
  showSuccess:"The review request was successfully sent to the admin"
});

export const varifyEmail = (params) => Api.call({ url: '/User/VerifyEmail', params }, {
  showErrors: true,
  showSuccess:"The review request was successfully sent to the admin"
});

export const sendSmsForIndentifying = (params) => Api.call({ url: '/ExternalAuthorization/SendSmsForIdentityAuthorization', params }, {
  showErrors: true,
});

export const setPersonalInfoConfirmReq = (params) => Api.call({ url: '/PersonalInfo/SetConfirmRequest', params }, {
  showErrors: true,
  showSuccess:"The review request was successfully sent to the admin"
});

export const getAddressInfo = (params) => Api.call({ url: '/AddressInfo/Get', params }, {
  returnData: true,
});

export const getEmail = (params) => Api.call({ url: '/User/GetEmail', params }, {
  returnData: true,
});

export const updateAddressInfo = (params) => Api.call({ url: '/User/GetEmail', params }, {
  showErrors: true,
});

export const getProvices = (params) => Api.call({ url: '/Province/GetList', params }, {
  returnData: true,
});

export const sendSmsCode = (params) => Api.call({ url: '/User/SendMobileSecretCode', params }, {
  showErrors: true,
  showSuccess:"codeSentToMobile"
});

export async function loginWithPhoneAndPassword(mobile, password) {
  try {
    const { data: user } = await defaultApi().post('/Token/Get', {
      usernameOrEmail: starkString(mobile.replace(/\s/g, '').replace('+', '00')).englishNumber().toString(),
      password: starkString(password).englishNumber().toString(),
    });

    if (user.isSuccess) {
      const expirationDate = moment()
          .add(user.data.jwtToken.expiresInSeconds + 120, 'seconds')
          .format('DD/MM/YYYY HH:mm:ss');
      await Store.dispatch(setJwtToken(
          user.data.jwtToken.tokenValue,
          user.data.refreshToken.tokenValue,
      ));
      await Store.dispatch(setRefreshTokenTime(expirationDate));
      localStorage.setItem(
          'bearerToken',
          user.data.jwtToken.tokenValue,
      );
      localStorage.setItem(
          'refreshToken',
          starkString(user.data.refreshToken.tokenValue)
              .toString(),
      );
      localStorage.setItem(
          'expirationDate',
          expirationDate,
      );
      return true;
    }
    user.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (err) {
    satrexToast(transFn('failedInMission'), 'error');
    return false;
  }
}



export const registerValidate = async (mobile, password) => {
  try {
    const { data } = await defaultApi().post('/User/RegisterValidation', {
      mobile: mobile.replace(/\s/g, '').replace('+', '00'),
      password,
    });

    if (data.isSuccess && data.data) {
      return await sendSmsCode({mobile:mobile.replace(/\s/g, '').replace('+', '00')});
    }
    data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (e) {
    satrexToast(transFn('failedInMission'), 'error');
    return false;
  }
};

export const register = async (mobile, password, smsSecretCode, refralCode) => {
  try {
    const { data } = await defaultApi().post('/User/Register', {
      mobile: mobile.replace(/\s/g, '').replace('+', '00'),
      smsSecretCode: smsSecretCode.replace(/-/g, ''),
      password,
      referralCode: refralCode,
    });

    if (data.isSuccess) {
      return await loginWithPhoneAndPassword(mobile, password);
    }
    data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (e) {
    satrexToast(transFn('failedInMission'), 'error');
    return false;
  }
};

export const getUserImage = async () => {
  try {
    const { data } = await satrexApi().post('/UserImage/Get');
    if (data.isSuccess) {
      return {
        nationalCard: data.data.nationalCardImageAddress,
        personalImage: data.data.personalImageAddress,
        lastConfirmationType: data.data.lastConfirmationType,
      };
    }
    data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (e) {

  }
};

export const uploadNationalCardImage = async (nationalCardImage) => {
  try {
    const formData = new FormData();
    formData.append('file', nationalCardImage);
    const { data } = await satrexApi().post('/UserImage/UploadNationalCardImage', formData);
    if (data.isSuccess) {
      return true;
    }
    data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (e) {
    satrexToast(transFn('failedInMission'), 'error');
    return false;
  }
};

export const uploadPersonalImage = async (personalImage) => {
  try {
    const formData = new FormData();
    formData.append('file', personalImage);
    const { data } = await satrexApi().post('/UserImage/UploadPersonalImage', formData);
    if (data.isSuccess) {
      return true;
    }
    data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
    return false;
  } catch (e) {
    satrexToast(transFn('failedInMission'), 'error');
    return false;
  }
};

export const getCities = async (id) => {
  if (id && id !== '0') {
    try {
      const { data } = await satrexApi().post(`/City/GetCitiesByProvince?provinceId=${id}`);
      if (data.isSuccess) return data.data;
      data.Errors.forEach((item) => satrexToast(item.Description, 'error'));
      return false;
    } catch (e) {

    }
  }
};
