import {configureStore, createSlice} from '@reduxjs/toolkit';

// createSlice == useState 역할...

let imsiData = createSlice({
  name: 'imsiData',
  initialState: {
    name: '장원영',
    groupName: '아이브',
    age: 20,
  },
  reducers: {
    changeGroup(state) {
      state.groupName = '아이브그룹';
    },
    addAge(state, action) {
      state.age = state.age + action.payload;
    },
  },
});

let userName = createSlice({
  name : 'userName',
  initialState : ['kim', 'lee', 'park']
})

let productStock = createSlice({
  name : 'productStock',
  initialState : [11, 8, 2]
})

let cartData = createSlice({
  name : 'cartData',       
  initialState : [
    { id:0, title: 'White and Black', count : 2, price: 120000},
    { id:2, title: 'Grey Yordan', count : 1, price: 130000},
  ],
  reducers : {
    addCount(state, action){
      let item = state.find((x)=>
        x.id===action.payload)
      if(item) item.count++;
    },
    minusCount(state, action){
      let item = state.find((x)=>x.id===action.payload)
      if(item){
        if(!(item.count==0)){
          item.count--;
        }
      }
    },
    addCartData(state, action){
      let addData ={ 
        ...action.payload
        , count : 1
      }
      let item = state.find((x)=>x.id===action.payload.id);
      item ? item.count++ : state.push(addData);
    },
    deleteCartData(state, action){
      let item = state.find((x)=>x.id===action.payload);
      state.splice(item,1);
    },
    sortCart(state,action){
      return action.payload;
    }
  }
})

let loggindUser = createSlice({
  name : 'loggindUser',
  initialState : '𝓙𝓙𝓙',
  // 수정
  reducers : {
    // state : 원래의 데이터를 의미(zzzmini)
    changeUserName(state){
      return state + '님'
    }
  }
})

export default configureStore({
  reducer : {
    userName : userName.reducer,
    productStock : productStock.reducer,
    cartData : cartData.reducer,
    loggindUser : loggindUser.reducer,
    imsiData : imsiData.reducer
  }
})

export let { changeUserName } = loggindUser.actions;
export let { changeGroup, addAge } = imsiData.actions;
export let {addCount, minusCount, addCartData, deleteCartData,sortCart} = cartData.actions;