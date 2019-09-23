import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

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


export function abbreviateAmount(amount) {
    // what tier? (determines SI symbol)
    const tier = Math.log10(amount) / 3 | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return amount;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = amount / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

export default {
    formatDate,
    parseDate,
    abbreviateAmount,
}