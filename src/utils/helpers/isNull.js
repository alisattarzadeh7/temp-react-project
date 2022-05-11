import satrexToast from '../../components/satrexToast';
import { transFn } from '../../components/Trans';

export default (obj) => {
  const errors = [];
  for (const [key, value] of Object.entries(obj)) {
   if (value === null || value === undefined) {
     errors.push(transFn(key));
   }
  }
  if (errors.length > 0) {
    satrexToast(`${errors.length === 1 ? 'مقدار' : 'مقادیر'} ${errors} نمیتواند خالی باشد`, 'error');
    return false;
  }
  return true;
};
