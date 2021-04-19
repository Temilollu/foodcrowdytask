export const formatNumber = (number) => {
    const roundedValue = Number(number).toFixed(2).toString();
  
    return roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }