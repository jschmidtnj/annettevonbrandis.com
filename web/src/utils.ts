/* eslint-disable import/prefer-default-export */
const fallbackFonts = ["Roboto", "Helvetica", "Arial", "sans-serif"];

export const getFontFamily = (...fonts: string[]) =>
  [...fonts, ...fallbackFonts].join(",");

export const getPageId = (title: string) => title.replace(/\s+/g, '-').toLowerCase();
