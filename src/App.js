import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CategoryList from "./pages/categoryList/CategoryList";
import Category from "./pages/category/Category";
import AboutUs from "./pages/aboutUs/AboutUs";
import NewCategory from "./pages/newCategory/NewCategory";
import NewSlider from "./pages/newSlider/NewSlider";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/order";
import SliderList from "./pages/sliderList/SliderList";
import Slider from "./pages/slider/Slider";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />

          <Route path="/users" element={<UserList />} />

          <Route path="/user/:userId" element={<User />} />

          <Route path="/newUser" element={<NewUser />} />

          <Route path="/newCategory" element={<NewCategory />} />
          <Route path="/newSlider" element={<NewSlider />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/sliders" element={<SliderList />} />
          <Route path="/aboutUs/:id" element={<AboutUs />} />

          <Route path="/product/:productId" element={<Product />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/slider/:sliderId" element={<Slider />} />

          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
