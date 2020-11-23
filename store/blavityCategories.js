import _$slice from 'lodash/slice'
import { categories, currentCategory, testArticles, catList } from '~/utils/dataStructures'

export const state = () => ({
  categories: categories,
  currentCategory: currentCategory,
  currentSubCategory: null,
  articles: [...testArticles],
  specificArticles: [],
  carArticles: [],
  catList: [...catList],
  mostCurrentNewsArticles: [],
  topStories: {
    newsArticles: [..._$slice(testArticles, 0, 5)],
    politicsArticles: [..._$slice(testArticles, 5, 10)],
    lifestyleArticles: [..._$slice(testArticles, 10, 15)],
    cultureArticles: [..._$slice(testArticles, 15, 20)],
    opinionArticles: [..._$slice(testArticles, 0, 5)],
    trendingArticles: [...testArticles]
  }
})
export const mutations = {
  setArticles: (state, articleList) => {
    if (articleList.length) {
      state.categories[state.currentCategory].articles = articleList
      const newArticles = [...articleList]
      state.articles = newArticles
    }
  },
  setTopStories: (state, stories) => {
    for (let list in stories) {
      state.topStories[list] = stories[list]
    }
  },
  setCarArticles: (state, newArticles) => {
    state.carArticles = newArticles
  },
  setMostCurrentNews: (state, newArticles) => {
    state.mostCurrentNewsArticles = newArticles
  },
  setArticlesForCategory: (state) => {
    const subCatArticleList = state.categories[state.currentCategory]
      .subCategories
      .reduce((subCatArticles, subCategory) => [...subCatArticles, ...subCategory.articleList], [])
    state.specificArticles = [...subCatArticleList, ...state.categories[state.currentCategory].articles]
  },
  setCurrentCategory: (state, categorySlug) => {
    state.currentCategory = categorySlug
  },
  setSubCategory: (state, subCategory) => {
    state.currentSubCategory = subCategory
  },
  setCategoryArticles: (state, category, articles) => {
    const string = `${category}Articles`
    state.topStories[string] = JSON.parse(JSON.stringify(articles || []))
  }
}
export const getters = {
  getSpecificArticles: state => state.specificArticles,
  getArticles: state => state.articles,
  getCarArticles: state => state.carArticles,
  getMostCurrentNews: state => state.mostCurrentNewsArticles,
  getCurrentCategory: state => state.currentCategory,
  getCurrentCategoryObject: state => state.categories[state.currentCategory],
  getCategoryObject: state => state.categories,
  getCategories: state => state.catList,
  getCategoriesObject: state => state.categories,
  getCurrentSubCategory: state => state.currentSubCategory,
  getNews: state => state.topStories.newsArticles,
  getPolitics: state => state.topStories.politicsArticles,
  getCulture: state => state.topStories.cultureArticles,
  getLifestyle: state => state.topStories.lifestyleArticles,
  getOpinion: state => state.topStories.opinionArticles,
  getCategoryRoutes: state => (cat) => {
    const path = ['', 'categories']
    state.catList.forEach(mainCat => {
      if (mainCat.slug === cat) {
        path.push(cat)
        return false
      }
      if (mainCat.subCategories.find(subCat => subCat.slug === cat)) {
        path.push(mainCat.slug)
        path.push(cat)
        return false
      }
    })
    return path.join('/')
  }
}
