const state = {
  count: 0,
}

const mutation = {
  increment(state) {
    state.count++
  },
}

const action = {
  INCREMENT({ commit }) {
    commit(increment)
  },
}

export default {
  namespaced: true,
  state,
  mutation,
  action,
}
