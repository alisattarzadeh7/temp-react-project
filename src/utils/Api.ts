import satrexToast from '../components/satrexToast';
import { transFn } from '../components/Trans';
import { satrexApi } from './ApiConfig';
import { apiBasicParam, apiOptions } from './interfaces';


// this file is created for axios to connect to Satrex back-end and it's not standard way of working with axios methods


export class Api {
  url = '';

  params = undefined;

  response: any = null;

  errors: string[] = [];

  constructor(url: string, params: any) {
    this.url = url;
    this.params = params;
  }

  showErrors() {
    this.errors.forEach((item) => satrexToast(item, 'error'));
    return this;
  }

  getData() {
    if (this.response) return this.response.data;
    return false;
  }

  showSuccess(msg: string) {
    if (this.errors.length == 0) {
      satrexToast(transFn(msg), 'success');
    }
    return this;
  }

  async post() {
    try {
      const { data: result } = await satrexApi().post(this.url, this.params);
      if (result.isSuccess) {
        this.response = result;
      } else if (result.Errors) this.errors = result.Errors.map((item: any) => item.Description);
    } catch (e) {
      this.errors = [transFn('failedInMission')];
    }
    return this;
  }

  optionsHandler(options: apiOptions) {
    if (options.showErrors) {
      this.showErrors();
    }
    if (options.showSuccess) {
      this.showSuccess(options.showSuccess);
    }
    if (options.returnData) {
      return this.getData();
    }
    return this.errors.length === 0;
  }

  static call({ url, params }: apiBasicParam, options: apiOptions) {
    return new Api(url, params).post().then((result) => result.optionsHandler(options));
  }
}
