import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import range from 'lodash/range';
import 'dayjs/locale/ru';

dayjs.extend(utc);

export default dayjs;

export function serverTimestamp(date: Date = new Date()) {
  return dayjs(date)
    .utc()
    .format('YYYY-MM-DD HH:mm:ss.SSS');
}

export function fromServerTimestamp(ts: string) {
  return dayjs.utc(ts)
    .toDate();
}

export function addMonths(date: string | Date, months: number = 1) {
  return dayjs(date)
    .add(months, 'month')
    .format('YYYY-MM-DD');
}

export function currentMonth() {
  return dayjs()
    .format('YYYY-MM');
}

export function monthEnd(monthId: string) {
  return dayjs(monthStart(monthId))
    .add(1, 'month')
    .add(-1, 'day')
    .format('YYYY-MM-DD');
}

export function monthStart(monthId: string) {
  return `${monthId}-01`;
}

export function monthToWhere(monthId: string) {

  const {
    dateE,
    dateB,
  } = dateBE(monthId);

  return {
    dateB: { '<=': dateE },
    dateE: { '>=': dateB },
  };

}

export function dateBE(monthId: string) {
  return {
    dateB: monthStart(monthId),
    dateE: monthEnd(monthId),
  };
}


export function monthGenerator(num: number, date: Date = new Date()) {

  return range(num)
    .map(i => {

      const month = dayjs(addMonths(date, 1 - i));

      return {
        id: month.format('YYYY-MM'),
        label: month.format('YYYY/MM'),
      };

    });

}
