import * as Yup from 'yup';

export const dateTimeSchema = Yup.object().shape({
  date: Yup.string().required('يرجى تحديد التاريخ'),
  time: Yup.string().required('يرجى اختيار الوقت المناسب'),
});