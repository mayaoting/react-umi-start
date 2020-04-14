export default {
  namespace: 'products',
  state:[
    {name:'dva',id:'dva'},
    {name:'antd',id:'antd'},
  ],
  reducers: {
    delete(state,{payload:id}) {
      return state.filter(item => item.id !== id);
    },
  },
}