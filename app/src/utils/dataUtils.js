
const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

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


export function validateCampaignData(gridData) {

    let validationMsg;
    let isDataValidated = true;

    if (!Array.isArray(gridData)) {
        validationMsg = 'Given data is not array.';
    }
    if (!validationMsg && gridData.length === 0) {
        validationMsg = 'Given data is empty.';
    }
    if (!validationMsg && gridData.length === 0) {
        //TODO: Add JSON KEY validations
        validationMsg = 'key contain space.';
    }

    console.log('validationMsg', validationMsg);
    return {
        isDataValidated: false,
        validationMsg: validationMsg,
    };
}


export default {
    abbreviateAmount,
    validateCampaignData,
}