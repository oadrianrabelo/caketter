export function formatDate(data: Date) {
  const date = new Date(data);
  return date.toLocaleDateString("pt-br", {hour: "2-digit", minute: "2-digit"})
}