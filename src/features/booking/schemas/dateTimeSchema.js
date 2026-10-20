import * as yup from 'yup';

export const dateTimeSchema = yup.object().shape({
  date: yup.string().required('يرجى تحديد التاريخ'),
  timeId: yup.string().nullable().required('يرجى اختيار الوقت المناسب'),
});