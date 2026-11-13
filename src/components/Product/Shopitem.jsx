import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/shop.css";
import pic from "../../assets/Images/background.jpg";
import adidas from "../../assets/Images/Adidas.webp";
import allen from "../../assets/Images/allen.png";
import calvin from "../../assets/Images/calvinklein.jpg";
import puma from "../../assets/Images/puma.jpeg";
import biba from "../../assets/Images/biba.avif";
import fab from "../../assets/Images/fab.jpeg";
import levis from "../../assets/Images/Levis.jpg";
import louis from "../../assets/Images/louis.jpg";
import peter from "../../assets/Images/peter.webp";
import skecher from "../../assets/Images/Skechers.png";
import sparx from "../../assets/Images/sparx.jpg";
import wet from "../../assets/Images/wetside.webp";
import { AddToCart } from "./Cartslice";

const Shopitem = () => {
  const item = useSelector((state) => state.posts.items);
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredItems = (item || []).filter((post) => {
    const id = parseInt(post.id, 10);
    if (selectedCat === "men") return id >= 1 && id <= 6;
    if (selectedCat === "women") return id >= 7 && id <= 12;
    if (selectedCat === "shoe") return id >= 13 && id <= 15;
    return true;
  });

  return (
    <>
      <div className="back">
        <img className="back-img" src={pic} alt="pic" />
      </div>
      <p className="parag">Hot Summer Sale upto 25%</p>
      
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <h3>Trending Brands</h3>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={adidas} className="slide" alt="Adidas" />
          </div>
          <div className="carousel-item">
            <img src={allen} className="slide" alt="Allen Solly" />
          </div>
          <div className="carousel-item">
            <img src={calvin} className="slide" alt="Calvin Klein" />
          </div>
          <div className="carousel-item">
            <img src={puma} className="slide" alt="Puma" />
          </div>
          <div className="carousel-item">
            <img src={biba} className="slide" alt="Biba" />
          </div>
          <div className="carousel-item">
            <img src={fab} className="slide" alt="FabAlley" />
          </div>
          <div className="carousel-item">
            <img src={levis} className="slide" alt="Levis" />
          </div>
          <div className="carousel-item">
            <img src={louis} className="slide" alt="Louis Vuitton" />
          </div>
          <div className="carousel-item">
            <img src={skecher} className="slide" alt="Skechers" />
          </div>
          <div className="carousel-item">
            <img src={peter} className="slide" alt="Peter England" />
          </div>
          <div className="carousel-item">
            <img src={sparx} className="slide" alt="Sparx" />
          </div>
          <div className="carousel-item">
            <img src={wet} className="slide" alt="Westside" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="cont">
        <h3 style={{ textAlign: "center" }}>Categories</h3>
        <div className="cat">
          <button
            type="button"
            className={`cat-btn ${selectedCat === "all" ? "active" : ""}`}
            onClick={() => setSelectedCat("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`cat-btn ${selectedCat === "men" ? "active" : ""}`}
            onClick={() => setSelectedCat("men")}
          >
            Mens
          </button>
          <button
            type="button"
            className={`cat-btn ${selectedCat === "women" ? "active" : ""}`}
            onClick={() => setSelectedCat("women")}
          >
            Womens
          </button>
          <button
            type="button"
            className={`cat-btn ${selectedCat === "shoe" ? "active" : ""}`}
            onClick={() => setSelectedCat("shoe")}
          >
            Shoes
          </button>
        </div>

        <div className="products-container">
          {filteredItems.map((post) => (
            <div className="cards" key={post.id}>
              <div className="view">
                <img className="pics" src={post.img} alt={post.title} />
                <h5>{post.title}</h5>
                <p>{post.price}</p>
                <button
                  className="shop-btn"
                  type="button"
                  onClick={() => dispatch(AddToCart(post))}
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Shopitem;
