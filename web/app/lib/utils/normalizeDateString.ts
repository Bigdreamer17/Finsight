export const normalizeDateString = (isoString: string) => {
  return isoString.replace(/\.\d{6}/, (match) => `.${match.slice(1, 4)}`);
};
