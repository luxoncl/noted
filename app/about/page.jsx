"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Spline from "@splinetool/react-spline";

const About = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="title">Welcome to our Application</h1>
        <p className="subtitle">
          Revolutionizing the way students engage with learning materials.
        </p>
        {/* <Image
          src="/assets/images/about-hero-image.png"
          alt="About Hero Image"
          width={800}
          height={400}
          layout="responsive"
        /> */}
        <Spline
          className="w-full h-[20vh] flex items-center justify-center md:justify-start"
          scene="https://prod.spline.design/lBE2WQAxXGkfTI0s/scene.splinecode"
        />
      </div>
      <div className="content">
        <h2 className="section-title">About Us</h2>
        <p>
          Our platform aims to revolutionize the way students engage with
          learning materials and interact with their peers.
        </p>
        <p>
          With our application, faculty members can record audio sessions of
          their classes, which are then made available to students for review
          and revision.
        </p>
        <p>
          Additionally, students can benefit from features such as summarization
          of class content, scribble pad for rough work, community rooms for
          chatting with friends, and sticky notes for reminders.
        </p>
      </div>
      <div className="features">
        <h2 className="section-title">Key Features</h2>
        <ul>
          <li>Audio recordings of class sessions</li>
          <li>Summarized class content in speech or text format</li>
          <li>Scribble pad for rough work</li>
          <li>Community rooms for chatting with friends</li>
          <li>Sticky notes for reminders</li>
        </ul>
      </div>
      <div className="cta">
        <Link href="/contact" passHref>
          Contact Us
        </Link>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .hero {
          text-align: center;
          margin-bottom: 40px;
        }
        .title {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 40px;
        }
        .section-title {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .cta {
          text-align: center;
        }
        .cta a {
          padding: 12px 24px;
          background-color: #000000;
          color: white;
          border-radius: 5px;
          text-decoration: none;
          transition: background-color 0.3s;
          font-size: 1.2rem;
        }
        .cta a:hover {
          background-color: #0056b3;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default About;
