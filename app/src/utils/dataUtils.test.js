import { abbreviateAmount, validateCampaignData } from './dataUtils';


describe('Test campaign data utilities', () => {

  it('Test for thousands Amount abbreviate', () => {
    expect(abbreviateAmount(858131)).toBe('858.1k');
  });

  it('Test for Million Amount abbreviate', () => {
    expect(abbreviateAmount(88377333)).toBe('88.4M');
  });

  it('Test for amount not abbreviate when less that 1k', () => {
    expect(abbreviateAmount(998)).toBe(998);
  });

  it('Test for No match thousands Amount abbreviate', () => {
    expect(abbreviateAmount(121221)).not.toBe('44.4k');
  });

  it('Test for No match Million Amount abbreviate', () => {
    expect(abbreviateAmount(212121212)).not.toBe('12.4k');
  });

  it('Validate for non array value.', () => {
    expect(validateCampaignData(12)).toEqual({
      isDataValidated: false,
      validationMsg: 'Given data is not array.',
    });
  });

  it('Validate for empty array.', () => {
    expect(validateCampaignData([])).toEqual({
      isDataValidated: false,
      validationMsg: 'Given data is empty.',
    });
  });

  it('Validate for Invalid JSON keys.', () => {
    expect(validateCampaignData([{
      id: 1, name: 'Divavu', startDate: '9/19/2017', endDate: '3/9/2018', 'Bud get': 121221,
    },
    ])).toEqual({
      isDataValidated: false,
      validationMsg: 'JSON key: "Bud get" have space in it. keys should not contain space.',
    });
  });

  it('Validate success for correct input data.', () => {
    expect(validateCampaignData([{
      id: 1, name: 'Divavu', startDate: '9/19/2017', endDate: '3/9/2018', Budget: 121221,
    },
    ])).toEqual({
      isDataValidated: true,
      validationMsg: undefined,
    });
  });
});
