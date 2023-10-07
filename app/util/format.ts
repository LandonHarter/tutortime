import { Timestamp } from "firebase/firestore";

export function formatTimestamp(timestamp: Timestamp) {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();

    const dayStr = day.toString();
    const lastDigit = dayStr[dayStr.length - 1];
    let daySuffix = 'th';
    if (lastDigit === '1') {
        daySuffix = 'st';
    } else if (lastDigit === '2') {
        daySuffix = 'nd';
    } else if (lastDigit === '3') {
        daySuffix = 'rd';
    }

    return `${month} ${day}${daySuffix}, ${year}`;
}