import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import data from "../../data/shoes-data";
import { Navigate, useNavigate } from "react-router-dom";

function RecentPage() {
  let [recentView, setRecentView] = useState([]);
  let [product, setProduct] = useState(data);
  let navigate = useNavigate();

  useEffect(() => {
    let recent = JSON.parse(localStorage.getItem("recent"));
    setRecentView([...recent.sort()]);
  }, []);

  console.log("product : " + product[0].title);
  return (
    <div>
      <h4>최근본 상품리스트</h4>
      <Container fluid="md">
        <Row>
          {recentView.map((x, index) => {
            return (
              <Col key={index}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`/images/shoes${x + 1}.jpg`}
                    width={"80%"}
                  />
                  <Card.Body>
                    <Card.Title>{product[x].title}</Card.Title>
                    <Card.Text>
                      {product[x].content}
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{
                      navigate(`/main/${x}`)
                    }}>보러가기</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
export default RecentPage;