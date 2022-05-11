export default () => (process.env.NODE_ENV === 'production' ? (window.location.origin).split('.')[1] : 'narwhal');
export const isProduction = process.env.NODE_ENV === 'production' && (window.location.origin).split('.')[1] === 'narwhal';
