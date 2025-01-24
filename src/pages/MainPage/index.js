import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Product from "../../component/Product"
import { Outlet } from "react-router-dom";

function MainPage(props){
  let product = props.product;
  return (
  <Container>
    <Outlet></Outlet>
    <Row className="justify-content-md-center">
      {product.map((p, index) => {
        return (
          <Col>
            <Product product={product} index={index} />
          </Col>
        );
      })}
    </Row>
  </Container>
  )
}
export default MainPage;