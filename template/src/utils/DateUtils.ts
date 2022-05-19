import moment from 'moment';

export type Moment = moment.MomentInput;

const format = (time: Moment, f: string) => {
  return moment(time).format(f);
};

const now = (date?: Moment) => {
  return moment(date);
};

const addDate = (date: Moment, count: number) => {
  return moment(date).add(count, 'day').toDate();
};

const fullDateString = (date: Moment) => {
  return moment(date).format('dddd, MMMM DD, YYYY');
};

const dateOfWeek = (date: Moment) => {
  return moment(date).format('dddd, MMMM DD');
};

const today = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};
const formatHours = (hour: number, minute: number, second: number) => {
  const pad = (num: number) => {
    return num < 10 ? `0${num}` : String(num);
  };
  if (hour) {
    return [pad(hour), pad(minute), pad(second)].join(':');
  }
  if (minute) {
    return [pad(minute), pad(second)].join(':');
  }
  return pad(second) + ' seconds';
};

export const DateUtils = {
  fullDateString,
  dateOfWeek,
  addDate,
  today,
  formatHours,
  now,
  format,
};
