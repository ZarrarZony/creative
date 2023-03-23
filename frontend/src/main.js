import Vue from "vue";
import Vuex from "vuex";
import aigle from "aigle";
import moment from "moment";
import Vuetify from "vuetify";
import VueHead from "vue-head";
import VueService from "./services/VueService.js";
import "./services/ApiService.js";

const createAppTranslations = () => {
  const moduleTranslations = [MessageTranslations, HistoryLogTranslations];
  return _.transform(
    moduleTranslations,
    (result, translations) => {
      _(translations)
        .keys()
        .each((translationKey) => {
          result[translationKey] = _.merge(
            result[translationKey] || {},
            translations[translationKey]
          );
        });
    },
    {}
  );
};

const main = async () => {
  Object.defineProperty(Vue.prototype, "_", { value: _ }); // TODO: delete from here once all npm packages will manage their own dependencies.
  Object.defineProperty(Vue.prototype, "aigle", { value: aigle }); // TODO: delete from here once all npm packages will manage their own dependencies.
  Object.defineProperty(Vue.prototype, "moment", { value: moment }); // TODO: delete from here once all npm packages will manage their own dependencies.

  Vue.config.productionTip = false;

  Vue.use(Vuex);
  Vue.use(VueRouter);
  Vue.use(Vuetify);
  Vue.use(VueI18n);
  Vue.use(VueHead);

  //removed

  const store = createStore();
  VueService.store = store;
  const router = await createRouter();
  vue.$mount("#app");
};

main();
