import { cssTransition, toast } from 'react-toastify';

const bounce = cssTransition({
    enter: 'animate__animated animate__bounceInDown',
    exit: 'animate__animated animate__bounceOutUp',
});

export default (text, type) => toast(text, {
        transition: bounce,
        type: toast.TYPE[type.toUpperCase()],
    });
