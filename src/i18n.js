import i18n from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import storageService from "./services/storageService";

i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        lng: storageService.getLanguage(),
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: "/i18n/{{lng}}.json"
        }
    })

export default i18n;