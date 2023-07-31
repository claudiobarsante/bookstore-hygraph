export default function formatPrice(price: number | bigint): string {
  const formatedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol'
  }).format(price);
  return formatedPrice;
}
