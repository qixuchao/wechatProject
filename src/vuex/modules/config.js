
const state = {
  serviceURL: "http://173.63.141.62/",
  pictureUrl: "http://clbpic.oss-cn-hongkong.aliyuncs.com/"
};

const getters = {
  getServiceURL: state=> {
    return state.serviceURL
  },
  getPictureUrl: state=> {
    return state.pictureUrl
  },

}

const mutations = {}

const actions = {}

export default{
  state,
  getters,
  mutations,
  actions
}
