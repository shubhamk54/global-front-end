
export function campaignDataSelector({
  gridData = [], startDate, endDate, searchValue = '',
}) {
  const currentDateEpoch = new Date().getTime();
  let formattedDataGrid = [];

  console.log('filters:', startDate, endDate, searchValue, gridData);

  gridData.forEach((dataRow) => {
    const userSelectedStartDateEpoch = new Date(startDate).getTime();
    const userSelectedEndDateEpoch = new Date(endDate).getTime();

    const startDateEpoch = new Date(dataRow.startDate).getTime();
    const endDateEpoch = new Date(dataRow.endDate).getTime();

    if (dataRow.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            && (isNaN(userSelectedStartDateEpoch) || startDateEpoch >= userSelectedStartDateEpoch)
            && (isNaN(userSelectedEndDateEpoch) || endDateEpoch <= userSelectedEndDateEpoch)
            && (isNaN(userSelectedStartDateEpoch) || endDateEpoch >= userSelectedStartDateEpoch)
    ) {
      formattedDataGrid = formattedDataGrid.concat({
        ...dataRow,
        active: startDateEpoch <= currentDateEpoch && currentDateEpoch <= endDateEpoch ? { title: 'Active', type: 'success' } : { title: 'Inactive', type: 'danger' },
      });
    }
  });

  return formattedDataGrid;
}

export function campaignNamesSelector(gridData = []) {
  return gridData.map((dataRow) => dataRow.name);
}

export default {
  campaignDataSelector,
  campaignNamesSelector,
};
