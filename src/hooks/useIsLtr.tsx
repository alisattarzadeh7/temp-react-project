import { useSelector } from 'react-redux';
import { LayoutState } from '../utils/interfaces';

const useIsLtr: () => boolean = () => {
  const lang = useSelector((state: LayoutState) => state.layout.language);
  return lang === 'EN';
};

export default useIsLtr;
