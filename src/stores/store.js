import Store from 'beedle';
import { get, post } from './requests';
import { convertFormioComponentsToData, getFormioWidgetParams, getWrapper } from './utils';

let _saveUrl;
let _onPost;
let _onLoad;

const store = new Store({
  actions: {
    setData(context, data, saveData) {
      context.commit('setData', data);
      if (saveData) this.save(data);
    },

    load(context, { loadUrl, saveUrl, data }) {
      _saveUrl = saveUrl;
      if (_onLoad) {
        _onLoad().then(x => {
          const localizedData = convertFormioComponentsToData(x);
          this.setData(context, localizedData);
          // this.setData(context, x)
        });
      } else if (loadUrl) {
        get(loadUrl).then(x => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach(y => x.push(y));
          }
          this.setData(context, x);
        });
      } else {
        this.setData(context, data);
      }
    },

    create(context, element) {
      const { data } = context.state;
      data.push(element);
      this.setData(context, data, true);
    },

    delete(context, element) {
      const { data } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, true);
    },

    updateOrder(context, elements) {
      this.setData(context, elements, true);
    },

    save(data) {
      if (_onPost) {
        // _onPost({ task_data: data });
        _onPost(getWrapper(data.map(e => getFormioWidgetParams(e))));
      } else if (_saveUrl) {
        post(_saveUrl, { task_data: data });
      }
    },
  },

  mutations: {
    setData(state, payload) {
      state.data = payload;
      return state;
    },
  },

  initialState: {
    data: [],
    correntForm: null
  },
});

store.setExternalHandler = (onLoad, onPost) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
