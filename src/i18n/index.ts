import i18next, { FormatFunction, TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import moment from "moment";
import _ from "lodash";

import translationEN from "./locales/en/translation.json";
import translationNB from "./locales/nb/translation.json";

export enum Languages {
  ENGLISH = "en",
  NORWEGIAN = "nb",
}

export enum LanguagesFlags {
  ENGLISH = "gb",
  NORWEGIAN = "no",
}

export interface Language {
  value: Languages;
  flag: LanguagesFlags;
  label: string;
}

export const fallbackLng: Languages[] = [Languages.ENGLISH];
export const availableLanguages: Language[] = [
  { value: Languages.ENGLISH, flag: LanguagesFlags.ENGLISH, label: "English" },
  {
    value: Languages.NORWEGIAN,
    flag: LanguagesFlags.NORWEGIAN,
    label: "Norwegian",
  },
];

export interface ChangeLanguage {
  (language: Languages): Promise<TFunction>;
}
export const changeLanguage: ChangeLanguage = (language) =>
  i18next.changeLanguage(String(language));

const format: FormatFunction = (value, format) => {
  switch (format) {
    case "uppercase":
      return String(value).toUpperCase();
    case "lowercase":
      return String(value).toLowerCase();
    case "number":
      return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const functions: {
    regExp: RegExp;
    matchCallback: (args: RegExpMatchArray) => any;
  }[] = [
    {
      regExp: /slice\((\d+),\s?(\d+)\)/,
      matchCallback: (args) => (value || "").slice(+args[1], +args[2]),
    },
  ];

  if (format) {
    for (const item of functions) {
      if (item.regExp.test(format)) {
        const args = format.match(item.regExp);

        if (args) {
          return item.matchCallback(args);
        }
      }
    }
  }

  //const date = moment.parseZone(value); // Removed timezone transformation
  const date = moment(value);

  if (date.isValid()) {
    return date.local().format(format || "L");
  }

  return value;
};

const setLanguagesLabel = (): void => {
  availableLanguages[0].label = i18next.t("system.i18n.languages.english");
  availableLanguages[1].label = i18next.t("system.i18n.languages.norwegian");
};

i18next
  .use(initReactI18next)
  .init({
    fallbackLng,
    lng: Languages.ENGLISH,
    // whitelist: _.map(availableLanguages, "value"),
    resources: {
      [Languages.ENGLISH]: {
        translation: translationEN,
      },
      [Languages.NORWEGIAN]: {
        translation: translationNB,
      },
    },
    interpolation: {
      escapeValue: false,
      format,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(setLanguagesLabel);

i18next.on("languageChanged", (lng) => {
  moment.locale(lng);
  setLanguagesLabel();
});

export default i18next;
