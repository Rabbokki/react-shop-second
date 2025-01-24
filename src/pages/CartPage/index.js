import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { changeUserName } from "../../store";
import { changeGroup, addAge } from "../../store";
import { addCount,minusCount,deleteCartData,sortCart } from "../../store";

function CartPage() {
  let userName = useSelector((state) => {
    return state.userName;
  });
  
  let productStock = useSelector((state) => {
    return state.productStock;
  });
  
  let cartData = useSelector((state) => {
    return state.cartData;
  });
  
  let totalPrice = cartData.reduce((sum, item) => sum + item.price * item.count, 0);
  let dispatcher = useDispatch();
  function sortUp(){
    const sort = [...cartData].sort((x,y)=>{
      if(x.title > y.title) return 1;
      if(x.title < y.title) return -1;
      else return 0;
    });
    dispatcher(sortCart(sort));
  };

  function sortDown(){
    const sort = [...cartData].sort((x,y)=>{
      if(x.title > y.title) return -1;
      if(x.title < y.title) return 1;
      else return 0;
    });
    dispatcher(sortCart(sort));
  };
  

  console.log(userName);
  console.log(productStock);
  console.log(cartData);

  // 스토어에 있는 변경함수 호출하는 택배기사를 생성
  let loggindUser = useSelector((state) => {
    return state.loggindUser;
  });
  console.log('userName = ' ,loggindUser);

  let imsiData = useSelector((state)=>{
    return state.imsiData;
  })
  console.log(imsiData);

  return (
    <div>
      <h3>
        {loggindUser} 님 장바구니
      </h3>
       {/* <button onClick={()=>{
        dispatcher(changeUserName());
      }}>이름변경</button>
      {imsiData.groupName} : {imsiData.name}
      <button onClick={()=>{
        dispatcher(changeGroup());
      }}>소속사</button>
      <span onClick={()=>{
        dispatcher(addAge(500000));
      }}>➕</span>{imsiData.age} */}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명
            <span onClick={sortUp}>▲</span><span onClick={sortDown}>▼</span></th> 
            <th>단가</th>
            <th>금액</th>
            <th>수량</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((x,index) => {
            return (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.title}</td>
                <td>{x.price}원</td>
                <td>{x.price * x.count}원</td>
                <td>{x.count} <span onClick={()=>{
                  dispatcher(addCount(x.id));
                }}>➕</span>
                <span onClick={()=>{
                  dispatcher(minusCount(x.id));
                }}>➖</span>
                </td>
                
                <td> <span onClick={()=>{
                  dispatcher(deleteCartData(x.id));
                }}>🗑️</span></td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={4}>총 금액</td>
            <td colSpan={2}>{totalPrice}원</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CartPage;
