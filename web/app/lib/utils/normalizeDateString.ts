export const normalizeDateString = (isoString: Date) => {
  return isoString.replace(/\.\d{6}/, (match) => `.${match.slice(1, 4)}`);
};
