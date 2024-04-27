import React, { useEffect, useState } from "react";
import Header from "../elements/Header";
import Hero from "../components/HeroSection/Hero";
import GodCalling from "../assets/God-Calling.jpeg";
import TheGhost from "../assets/The-Ghost.jpg";
import KOB from "../assets/KOB.jpg";
import CategorySection from "../components/CategorySection";
import MovieCard from "../components/MovieCard";
import Footer from "../elements/Footer";
import Testimonial from "../components/Testimonial";
import Gallery from "../components/Gallery";
// import CategoryList from "./CategoryList";

const LandingPage: React.FC = () => {
  const [heroContent, setHeroContent] = useState<{
    title: string;
    subtitle: string;
    backgroundImg: string;
  }>();

  useEffect(() => {
    // Shuffle the array of hero content
    const shuffledContents = shuffle([
      {
        title: "Story of redemption that looks at the life of Sade",
        subtitle: "God Calling",
        backgroundImg: GodCalling,
      },
      {
        title: "Isila's life changes when she meets a ghost",
        subtitle: "The Ghost and the tout too",
        backgroundImg: TheGhost,
      },
      {
        title: "Insatiable appetite for power into politics",
        subtitle: "King of Boys",
        backgroundImg: KOB,
      },
    ]);
    // Set the first item of the shuffled array as the hero content
    setHeroContent(shuffledContents[0]);
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffle = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  return (
    <div className="body-text">
      <Header />
      <div>
        {heroContent && (
          <Hero
            title={heroContent.title}
            subtitle={heroContent.subtitle}
            backgroundImg={heroContent.backgroundImg}
          />
        )}
      </div>
      <CategorySection />
      <MovieCard />
      <Testimonial />
      <Gallery />
      <Footer />
    </div>
  );
};

export default LandingPage;
