import React from "react";
import { communityImages } from "../data/communityAssets";
import Footer from "../components/Footer";

export default function StoriesPage() {
  const stories = [
    {
      title: "Gibbs Station Connects the Community",
      year: 1889,
      excerpt: "The Cotton Belt Railroad establishes Gibbs Station, linking area farms to regional transportation.",
      img: communityImages.history,
      link: "https://www.coppelltx.gov/610/History-of-Coppell",
    },
    {
      title: "Farmers Market Becomes a Ritual",
      year: 2003,
      excerpt: "Citizens establish a market in Old Town Coppell that grows to more than 40 vendors.",
      link: "https://coppellfarmersmarket.org/about/",
      img: communityImages.farmers,
    },
    {
      title: "NoteLove Brings Free Music",
      year: 2018,
      excerpt: "Youth volunteers turn practice rooms and living rooms into studios.",
      link: "https://www.notelove.org/about-us",
      img: communityImages.notelove,
    },
    {
      title: "Metrocrest Opens a New Home",
      year: 2023,
      excerpt: "A new facility brings food, housing, employment, and senior support together under one roof.",
      link: "https://metrocrestservices.org/grand-opening-ceremony-celebrates-new-home-with-largest-red-ribbon-in-agency-history/",
      img: communityImages.metrocrest,
    },
    {
      title: "Neighbors In Need Rallies",
      year: "ONGOING",
      excerpt: "Residents coordinate grocery drops and rides so families never feel alone.",
      link: "https://www.instagram.com/neighbors_in_need_/",
      img: communityImages.neighbors,
    },
  ];

  return (
    <div className="page stories">
      <header className="page-head fade-in">
        <h2 className="xxl skew">STORIES</h2>
        <p className="kicker">Raw narratives — bold layout — living history</p>
      </header>

      <div className="stories-list">
        {stories.map((s, i) => (
          <div
            key={`story-${i}`}
            // Added fade-in-up class here so the whole row animates in
            className={`story-row fade-in-up delay-${(i % 3) + 1}`}
          >
            <div className="story-card slab">
              <div className="eyebrow">{s.year}</div>
              <h3 className="display">{s.title}</h3>
              <p className="lead">{s.excerpt}</p>

              {s.link ? (
                <a
                  className="btn wire"
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VISIT RESOURCE →
                </a>
              ) : (
                <button className="btn wire">READ STORY →</button>
              )}
            </div>

            <div className="story-img">
              <img
                src={s.img}
                alt={s.title}
                className="story-photo"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
