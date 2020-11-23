import pkg from '~/package'

export const state = () => ({
  title: 'Blavity News',
  description: pkg.description
})

export const mutations = {
  update (state, { key, value }) {
    state[key] = value
  }
}
