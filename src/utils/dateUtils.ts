import dayjs from 'dayjs';

type DateFormat = 'HH:mm:ss DD/MM/YYYY' | 'DD/MM/YYYY' | 'DD/MM/YY';

export const dateUtils = {
  format: (isoDate: string, format: DateFormat = 'HH:mm:ss DD/MM/YYYY') => {
    const date = dayjs(isoDate);
    return date.isValid() ? date.format(format).toString() : isoDate;
  },
};
