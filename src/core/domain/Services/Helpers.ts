
export function parseDateSafe(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}


export function formatDate(fecha: Date, formato: 1 | 2 = 1): string {
  const day = String(fecha.getDate()).padStart(2, '0');
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const year = fecha.getFullYear();

  if (formato === 1) {
    return `${day}-${month}-${year}`; // "10-05-2025"
  } else {
    return `${year}-${month}-${day}`; // "2025-05-10"
  }
}


export function formatDateWithHours(fecha: Date, formato: 1 | 2 = 1): string {
  const day = String(fecha.getDate()).padStart(2, '0');
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const year = fecha.getFullYear();

  const hours = String(fecha.getHours()).padStart(2, '0');
  const minutes = String(fecha.getMinutes()).padStart(2, '0');

  const time = `${hours}:${minutes}`;

  if (formato === 1) {
    return `${day}-${month}-${year} ${time}`; // "10-05-2025 13:30"
  } else {
    return `${year}-${month}-${day} ${time}`; // "2025-05-10 13:30"
  }
}