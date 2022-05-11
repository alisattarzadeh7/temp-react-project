import rootTourConfig from '../../screens/RootTourConfig';
import { Store } from '../../redux/store';
import { setTourGuideStatus } from '../../redux/actions/LayoutActions';

export default (setIsOpen, setSteps, page) => {
    Store.dispatch(setTourGuideStatus(false));
    setTimeout(() => {
        const loadedPages = localStorage.getItem('loadedPages');
        if (!JSON.parse(loadedPages)[page]) {
            setSteps(rootTourConfig[page]);
            // setIsOpen(true)
            localStorage.setItem('loadedPages', JSON.stringify({ ...JSON.parse(loadedPages), [page]: true, active: page }));
        } else {
            localStorage.setItem('loadedPages', JSON.stringify({ ...JSON.parse(loadedPages), active: page }));
        }
        Store.dispatch(setTourGuideStatus(true));
    }, 1000);
};
