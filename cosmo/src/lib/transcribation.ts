export const makeTranscribationFromRuToEn = (ru: string) => {
  const filterNoLetters = (str) => str.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, "");

  const translit = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shh",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  return filterNoLetters(ru)
    .toLowerCase()
    .split("")
    .map((char) => translit[char] || char)
    .join("")
    .replaceAll(" ", "-");
};
