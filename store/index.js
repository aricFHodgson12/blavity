// import _$slice from 'lodash/slice'
// import { testArticles } from '~/utils/dataStructures.js'

export const state = () => ({
  errorMessage: null,
  appId: 567482886746994
})
export const mutations = {
  setErrorMessage: (state, error) => {
    state.errorMessage = error
  }
}
export const getters = {
  getAppId: state => state.appId,
  getErrorMessage: state => state.errorMessage
}
// export const actions = {
//   async nuxtServerInit (store) {
//     try {
//       const articles = await this.$axios.$get('https://www.api.blavity.com/v1/trending_articles')
//       const homeArticles = {}
//       homeArticles.newsArticles = await this.$axios.$get('https://www.api.blavity.com/v1/articles/categories/news/6/')
//       homeArticles.politicsArticles = await this.$axios.$get('https://www.api.blavity.com/v1/articles/categories/politics/6')
//       homeArticles.cultureArticles = await this.$axios.$get('https://www.api.blavity.com/v1/articles/categories/culture/6')
//       homeArticles.lifestyleArticles = await this.$axios.$get('https://www.api.blavity.com/v1/articles/categories/lifestyle/6')
//       homeArticles.opinionArticles = await this.$axios.$get('https://www.api.blavity.com/v1/articles/categories/opinion/6')
//
//       for (let list in homeArticles) {
//         if (homeArticles[list].length < 5) {
//           homeArticles[list] = [...homeArticles[list], ..._$slice(articles, 4, 9)]
//         }
//       }
//       homeArticles.newsArticles = [articles[0], ...homeArticles.newsArticles]
//       store.commit('blavityCategories/setTopStories', homeArticles)
//       store.commit('blavityCategories/setArticles', articles)
//     } catch (e) {
//       console.log(e)
//       store.commit('setErrorMessage', e)
//       store.commit('blavityCategories/setArticles', testArticles)
//     }
//   }
// }
