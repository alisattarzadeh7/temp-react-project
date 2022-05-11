export const numberWithCommas = (x) => (x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x);
