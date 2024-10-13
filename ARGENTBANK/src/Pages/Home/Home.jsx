import { useEffect, useState } from "react";
import Main from "../../Layout/Main/Main";
import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import bannerImage from '../../assets/img/bank-tree-compressed.webp';
import "./Home.css";
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const [featuresData, setFeaturesData] = useState([]);

  useEffect(() => {
    fetch("/features.json")
      .then((response) => response.json())
      .then((data) => {
        setFeaturesData(data); 
      })
      .catch((error) => {
        console.error("Error loading features data:", error);
      });
  }, []);

  return (
    <Main>
      <Banner image={bannerImage} />
      <div className="section-features">
        {featuresData.map((feature) => (
          <Features 
            key={uuidv4()}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </Main>
  );
}

export default Home;