import dayjs from 'dayjs';

export const validatePhone = phone => {
  // const reg = /^[0]?[789]\d{9}$/;
  const pattern = new RegExp(/^[0-9\b]+$/);
  return pattern.test(phone);
};

export const getTodaysDate = () => {
  return dayjs(dayjs().toDate().toUTCString()).format('YYYY-MM-DD');
};

export const getDateForPicker = date => {
  return dayjs(dayjs(date)).format('DD-MMM');
};
