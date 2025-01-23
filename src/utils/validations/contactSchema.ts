import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().required('This field is required'),
  email: Yup.string().email('Please enter a valid email').required('This field is required'),
  phone: Yup.number().typeError('Please enter a valid number').required('This field is required'),
  message: Yup.string().required('This field is required'),
});