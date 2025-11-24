export const formatPhoneNumber = (text: string) => {
  const cleaned = text.replace(/\D/g, '');

  if (cleaned.startsWith('98')) {
    const withoutCountry = cleaned.substring(2);
    if (withoutCountry.length <= 3) return `+98 ${withoutCountry}`;
    if (withoutCountry.length <= 6) return `+98 ${withoutCountry.substring(0, 3)} ${withoutCountry.substring(3)}`;
    return `+98 ${withoutCountry.substring(0, 3)} ${withoutCountry.substring(3, 6)} ${withoutCountry.substring(6, 10)}`;
  } else if (cleaned.startsWith('0')) {
    const withoutZero = cleaned.substring(1);
    if (withoutZero.length <= 3) return `+98 ${withoutZero}`;
    if (withoutZero.length <= 6) return `+98 ${withoutZero.substring(0, 3)} ${withoutZero.substring(3)}`;
    return `+98 ${withoutZero.substring(0, 3)} ${withoutZero.substring(3, 6)} ${withoutZero.substring(6, 10)}`;
  } else {
    if (cleaned.length <= 3) return `+98 ${cleaned}`;
    if (cleaned.length <= 6) return `+98 ${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
    return `+98 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 10)}`;
  }
};
