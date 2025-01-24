/* eslint no-restricted-globals: ["off"] */
import { useParams } from "react-router-dom";
import Discount from "./Discount";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../../component/Product"
import { addCartData } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";


function Detail(props) {
  let [alert, setAlert] = useState(true);
  const [key, setKey] = useState("home");
  const [detail, setDetail] = useState([]);
  let imsi = [];
  let dispatcher = useDispatch();
  let navigate = useNavigate();

  

  // 2초 후에 alert state -> false
  useEffect(() => {
    let myTimer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(myTimer);
    };
  }, []);

  useEffect(()=>{
    axios
    .get('https://zzzmini.github.io/js/shoesReview.json')
    .then((result)=>{
      // 요청 성공시 처리할 곳
      // console.log(result.data)
      
      imsi = [...result.data]; 
      console.log('imsi ', imsi)
      setDetail([... imsi]);
    })
    .catch(()=>{
      // 요청 실패시 처리할 곳
      console.log("실패함.")
    });
  },[ ])


  let { id } = useParams();

  let findProduct = props.product.find(function (x) {
    return x.id == id;
  });

  if (findProduct == null) {
    alert("찾는 상품이 없습니다.");
    history.back();
    return;
  } else {
    
    let shoes = props.product[id];
    
    let i = parseInt(id) + 1;
    
    
    let searchArr = [];
    detail.forEach((x)=>{
      if(x.productId == i){
        searchArr.push(x);
      }
    })

    // setDetail([... searchArr]);

    console.log("=deta==", searchArr)
    console.log("=i==", i)

    let strPrice = shoes.price.toLocaleString("ko-KR");
    
    // setProductId(id);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${process.env.PUBLIC_URL}/images/shoes${i}.jpg`}
              width={"100%"}
            />
          </div>
          {alert == true ? <Discount /> : null}
          <div className="col-md-6">
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{strPrice}원</p>

            <button className="btn btn-danger" onClick={()=>
              {dispatcher(addCartData(shoes));
                navigate("/cart");
              }
              
            }>주문하기</button>
          </div>

          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="무료 배송 및 반품">
              <div>
                <p>
                무료 배송 및 반품

                일반 배송 

                • 배송지역: 전국 (일부 지역 제외)
                • 배송비: 무료배송
                • 제품 수령일로부터 14일 이내 제품에 대해서만 무료 반품 서비스가 가능합니다.
                • 본사는 교환 서비스를 제공하지 않습니다.

                일반 배송 자세히 알아보기
                반품 자세히 알아보기

                오늘도착 서비스

                • 이용시간: 오전 10시 30분까지 결제 시, 당일 도착 (일요일, 공휴일 제외)
                • 서비스지역: 서울∙과천∙의왕∙군포∙수원∙성남∙안양시 전체, 용인시 수지구∙기흥구, 부천시 중동∙상동∙심곡동
                • 서비스비용: 5,000원

                자세히 알아보기
                </p>
              </div>
            </Tab>
            <Tab eventKey="profile" title="리뷰(4.5 ★★★★☆)" >
              <div>
                { searchArr.map((x)=>{
                  return(
                  <div key={x.reviewId}>
                    {x.title} <br></br>
                    {x.review}
                    <hr></hr>
                  </div>
                  )
                })
              }
              
              </div>
            </Tab>
            <Tab eventKey="contact" title="추가 정보">
              <div>
                <p>
                  상품정보제공고시

                  ● 제조연월: 수입제품으로 각 제품별 입고 시기에 따라 상이하여 정확한 제조연월 제공이 어렵습니다. 제조연월을 확인하시려면 고객센터에 문의하시기 바라며, 정확한 제조연월은 배송받으신 제품의 라벨을 참고하시기 바랍니다.
                  ● A/S 책임자와 전화번호: (유)나이키코리아 온라인 스토어 고객센터 / 080-022-0182 
                  ● 세탁방법 및 취급시 주의사항: 자세한 내용은 '자세히 보기'를 클릭하여 확인 부탁드립니다. 
                  ● 미성년자 권리 보호 안내: 자세한 내용은 '자세히 보기' 를 클릭하여 확인 부탁드립니다. 
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
        {/* <Row className="justify-content-md-center">
          {props.product.map((p, index) => {
            return (
              <Col>
                <Product product={product} index={index} />
              </Col>
            );
        })}
        </Row> */}
      </div>
    );
  }
}
export default Detail;
