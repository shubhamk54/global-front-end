
export function abbreviateAmount(amount) {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

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

export function validateCampaignData(gridData) {
  let validationMsg;

  if (!Array.isArray(gridData)) {
    validationMsg = 'Given data is not array.';
  }
  if (!validationMsg && gridData.length === 0) {
    validationMsg = 'Given data is empty.';
  }
  if (!validationMsg && gridData.length > 0) {
    outer_loop:
    for (const dataRow in gridData) {
      const keys = Object.keys(gridData[dataRow]);
      for (const key in keys) {
        const jsonKey = keys[key];
        if (/\s/.test(jsonKey)) {
          validationMsg = `JSON key: "${jsonKey}" have space in it. keys should not contain space.`;
          break outer_loop;
        }
      }
    }
  }
  return {
    isDataValidated: !validationMsg,
    validationMsg,
  };
}


export default {
  abbreviateAmount,
  validateCampaignData,
};
