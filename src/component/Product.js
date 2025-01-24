import React from "react";
import { useNavigate } from "react-router-dom";

function Product(props) {
  let navigate = useNavigate();
  let i = props.index;
  let p = props.product;
  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/images/shoes${p[i].id + 1}.jpg`} width={"80%"}
        onClick={()=>{
        navigate(`/main/${i}`)
      }}/>
      <h4>{p[i].title}</h4>
      <p>{p[i].content}</p>
    </div>
  );
}
export default Product;