const priceFormat = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(price);
};

export default priceFormat;
