import * as React from "react";
import { useState, useEffect } from "react";
import { default as ScrollNav } from "../components/ScrollNav";
import { default as Banner } from "../components/Banner";
import "../styles/Blog.scss";

function Blog() {
  const [browserHeight, setBrowserHeight] = useState<number>(
    window.innerWidth ? window.innerHeight : document.body.clientHeight,
  );

  let resizeTimer = setTimeout(() => {
    return 0;
  }, 0);

  const handleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      setBrowserHeight(
        window.innerWidth ? window.innerHeight : document.body.clientHeight,
      );
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sectionStyle = {
    height: browserHeight,
  };

  return (
    <div className="main">
      {/* <Banner></Banner> */}
      <ScrollNav browserHeight={browserHeight}></ScrollNav>
      <div className="content">
        <section style={sectionStyle}>
          <span>section1</span>
        </section>
        <section style={sectionStyle}>
          <span>section2</span>
        </section>
        <section style={sectionStyle}>
          <span>section3</span>
        </section>
        <section style={sectionStyle}>
          <span>section4</span>
        </section>
      </div>
    </div>
  );
}

export default Blog;
