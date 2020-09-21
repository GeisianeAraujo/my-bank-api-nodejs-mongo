module.exports.formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: "compact",
    compactDisplay: "short"
  }).format(value);
}