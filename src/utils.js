// export const API_URL = "https://quizwebapp.onrender.com";
// export const API_URL = "http://localhost:3000";
export const API_URL = "https://quizwebapp.onrender.com";

// export function convertISOToReadableFormat(isoString) {
//     const date = new Date(isoString);
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true,
//       timeZoneName: 'short'
//     };
//     return date.toLocaleString(undefined, options);
//   }

export function convertISOToReadableFormat(isoString) {
  const date = new Date(isoString);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month}, ${year} ${hours}:${minutes}`;
}
