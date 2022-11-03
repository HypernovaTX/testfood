const badTime = "N/A";

export function getTime(input: string) {
  const numbersOnly = input.replace(/\D/g, "");
  if (!numbersOnly) {
    return badTime;
  }
  const hour = parseInt(numbersOnly.slice(0, 2));
  const minute = numbersOnly.slice(2);
  const isPM = hour - 12 >= 0;
  const actualHour = (hour % 12 || 12).toString();
  return `${actualHour}:${minute} ${isPM ? "PM" : "AM"}`;
}
