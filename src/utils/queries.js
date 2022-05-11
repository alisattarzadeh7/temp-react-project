import { useQuery } from 'react-query';
import {
  getAddressInfo,
  getBankAccounts,
  getCities, getEmail,
  getMessageDetails,
  getPersonalInfo,
  getProvices,
  getUserImage,
  getUserMessages,
} from './apis';


export const useMessageDetails = (param) => useQuery(['getMessageDetails', ...Object.values(param)], () => getMessageDetails(param), { keepPreviousData: true });
export const useUserEmail = (param) => useQuery('userEmail', () => getEmail(param));
export const useBankAccounts = () => useQuery('bankAccounts', getBankAccounts);
export const usePersonalInfo = () => useQuery('personalInfo', getPersonalInfo);
export const useProvinces = (param) => useQuery(['personalInfo', ...Object.values(param)], () => getProvices(param));
export const useAddressInfo = (param) => useQuery(['getAddressInfo', ...Object.values(param)], () => getAddressInfo(param));
export const useMessages = () => useQuery('getUserMessages', getUserMessages);
export const useUserImages = () => useQuery('getUserImage', getUserImage);
export const useCities = (param) => useQuery(['getCities', ...Object.values(param)], () => getCities(param));





