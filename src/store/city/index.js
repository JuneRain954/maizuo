const state = {
    // 设置默认定位的城市名称以及城市id
    nm: localStorage.getItem('curCityName') || '定位',
    id: localStorage.getItem('curCityId') || -1
};

const mutations = {
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}