import ScrollableSection from '../components/ScrollableSection/ScrollableSection';

import dynamic from 'next/dynamic';


export const metadata = {
  title: "Tom & Dips Coffee - Home",
  description: "Tom & Dips Coffee, TND Coffee Homepage, T&D Coffee Homepage",
};


const Map = dynamic(() => import('../components/Map/Map'), { ssr: false });

export default function HomePage() {
  return (
    <div className="home-page">
      <ScrollableSection />
      <Map  />
    </div>
  );
}

