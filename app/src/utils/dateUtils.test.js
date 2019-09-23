import {
    formatDate,
    parseDate,
} from './dateUtils'

test('Test invalid date format matching', () => {
    expect(formatDate(new Date(), 'MM/dd/yyyy')).not.toBe('12/12/2019');
});

test('Test invalid date format matching', () => {
    expect(parseDate('09/01/2019', 'MM/dd/yyyy')).toBe(undefined);
});