import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import range from 'lodash/range';

require('dayjs/locale/ru');

dayjs.extend(utc);

export function serverTimestamp(date = new Date()) {
  return dayjs(date)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss.SSS');
}

export function addMonths(date, months = 1) {
  return dayjs(date)
    .add(months, 'month')
    .format('YYYY-MM-DD');
}

export function currentMonth() {
  return dayjs()
    .format('YYYY-MM');
}

export function monthEnd(monthId) {
  return dayjs(monthStart(monthId))
    .add(1, 'month')
    .add(-1, 'day')
    .format('YYYY-MM-DD');
}

export function monthStart(monthId) {
  return `${monthId}-01`;
}

export function monthToWhere(monthId) {

  const {
    dateE,
    dateB,
  } = dateBE(monthId);

  return {
    dateB: { '<=': dateE },
    dateE: { '>=': dateB },
  };

}

export function dateBE(monthId) {
  return {
    dateB: monthStart(monthId),
    dateE: monthEnd(monthId),
  };
}


export function monthGenerator(num, date = new Date()) {

  return range(num)
    .map(i => {

      const month = dayjs(addMonths(date, 1 - i));

      return {
        id: month.format('YYYY-MM'),
        label: month.format('YYYY/MM'),
      };

    });

}
