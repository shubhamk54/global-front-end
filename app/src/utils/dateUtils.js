import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

export function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

export function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

export default {
    formatDate,
    parseDate
}