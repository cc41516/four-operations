import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import time from './time'
import number from './number'
import history from './history'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

let myStore = null

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      time,
      number,
      history,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  myStore = Store
  return Store
})

export { myStore } // can get access from any JS file