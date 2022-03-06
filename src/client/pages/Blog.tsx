import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { default as ScrollNav } from "../components/ScrollNav";
import { default as Banner } from "../components/Banner";
import "../styles/Blog.scss";

function Blog() {
  const [browserWidth, setBrowserWidth] = useState<number>(
    window.innerHeight ? window.innerWidth : document.body.clientWidth,
  );
  const sectionRefArray = Array(4)
    .fill(null)
    .map((v) => useRef<HTMLElement>(null));
  const [sectionRef, setSectionRef] =
    useState<React.RefObject<HTMLElement>[]>(sectionRefArray);

  const [sectionHeight, setSectionHeight] = useState<number[]>([]);

  useEffect(() => {
    setSectionHeight(
      sectionRef.map((ref) => {
        if (ref.current) {
          return ref.current.offsetTop;
        }

        return 0;
      }),
    );
  }, [sectionRef]);

  useEffect(() => {
    setSectionRef(sectionRefArray);
  }, [browserWidth]);

  let resizeTimer = setTimeout(() => {
    return 0;
  }, 0);

  const handleResize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      setBrowserWidth(
        window.innerHeight ? window.innerWidth : document.body.clientWidth,
      );
    }, 100);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="main">
      {/* <Banner></Banner> */}
      <ScrollNav sectionHeight={sectionHeight}></ScrollNav>
      <div className="content">
        <section ref={sectionRef[0]}>
          <span>section1</span>
        </section>
        <section ref={sectionRef[1]}>
          <span>section2</span>
        </section>
        <section ref={sectionRef[2]}>
          <span>section3</span>
        </section>
        <section ref={sectionRef[3]}>
          <span>section4</span>
        </section>
      </div>
    </div>
  );
}

export default Blog;
