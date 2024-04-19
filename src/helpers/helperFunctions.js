import deDe from "antd/lib/locale/de_DE";
import enUS from "antd/lib/locale/en_US";
import esES from "antd/lib/locale/es_ES";
import frFR from "antd/lib/locale/fr_FR";
import itIT from "antd/lib/locale/it_IT";
import ruRU from "antd/lib/locale/ru_RU";
import trTR from "antd/lib/locale/tr_TR";
import zhCN from "antd/lib/locale/zh_CN";

export const getAntdLocale = (lang) => {
  switch (lang) {
    case "de":
      return deDe;
    case "en":
      return enUS;
    case "es":
      return esES;
    case "fr":
      return frFR;
    case "it":
      return itIT;
    case "ru":
      return ruRU;
    case "tr":
      return trTR;
    case "zh":
      return zhCN;
    default:
      return enUS;
  }
};
