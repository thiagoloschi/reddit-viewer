export function formatThousands(number) {
  if (number > 100000) {
    return `${(number / 1000).toFixed(0)}k`;
  }

  if (number > 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }

  return number;
}
