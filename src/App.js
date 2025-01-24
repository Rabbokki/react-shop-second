import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import data from "./data/shoes-data";
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import AboutPage from "./pages/AboutPage";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";

function App() {
  const [product, setProduct] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              {/* <Link to={"/"}>Home</Link> */}
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              {/* <Link to={"/cart"}>Cart</Link> */}
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              {/* <Link to={"/cart"}>Cart</Link> */}
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        className="main-bg"
        onClick={() => {
          navigate("/detail");
        }}
      ></div>

      {/* 라우터 처리 */}
      <Routes>
        <Route
          index
          element={
            <div>
              <MainPage product={product} />
            </div>
          }
        />
        <Route path="/main" element={<MainPage product={product} />}>
          <Route path=":id" element={<DetailPage product={product} />}/>
        </Route>
        
        <Route
          path="/cart"
          element={
            <div>
              <CartPage />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <AboutPage />
            </div>
          }
        >
          <Route path="member" element={<div>직원소개 페이지</div>}></Route>
          <Route path="location" element={<div>길안내 페이지</div>}></Route>
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h4>404. That’s an error.</h4>
              <p>
                The requested URL /fdjsalflsadjfldsa was not found on this
                server. That’s all we know.
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
