import { legacyCategories, legacyCurrentCategory, legacyCatList } from '~/utils/dataStructures'

export const state = () => ({
  categories: legacyCategories,
  currentCategory: legacyCurrentCategory,
  specificArticles: [],
  catList: [...legacyCatList]
})
export const mutations = {
  setCurrentCategory: (state, categorySlug) => {
    state.currentCategory = categorySlug
  }
}
export const getters = {
  getCategoryObject: state => state.categories,
  getCategories: state => state.catList,
  getCategoriesObject: state => state.categories
}
