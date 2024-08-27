import {format} from 'date-fns'

export function parseSlackTimestamp(dateString: string): Date {
  const date = new Date(parseFloat(dateString) * 1000);

  if (isNaN(date.getTime())) {
    console.error(`Failed to parse date string: ${dateString}`);
    return new Date(0);
  }

  return date;
}

export function formatDate(date: Date): string {
  return format(date, 'dd. LLL yyyy');
}

export function formatTime(date: Date, includeSeconds = false): string {
  if (includeSeconds) {
    return format(date, 'HH:mm:ss');
  }
  return format(date, 'HH:mm');
}