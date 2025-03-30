import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SectionCard from '../components/SectionCard';

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <Hero />

      {/* Live Music */}
      <SectionCard
        image="/images/events.jpg"
        title="Events"
        description="From beach beats to retro rock to contemporary country, see our live music lineup!"
        buttonLabel="See the Lineup"
        buttonLink="/music"
        bgColor="#fff"
      />

      {/* Food & Drink */}
      <SectionCard
        image="/images/food_drink.jpg"
        title="Food & Drink"
        description="From pulled pork sandwiches to buffalo chicken fries, our mouth-watering menu has something for everyone."
        buttonLabel="Our Menus"
        buttonLink="/menu"
        bgColor="#f5f5f5"
        reverse
      />

      {/* Seacost Vibes */}
      <SectionCard
        image="/images/seacoast_vibes.jpeg"
        title="Seacost Vibes"
        description="Sip, relax, and enjoy the seacoast. Check out our gallery of past events and good times."
        buttonLabel="View Gallery"
        buttonLink="/gallery"
        bgColor="#fca5a5"
      />

      {/* Location */}
      <SectionCard
        image="/images/overview.jpeg"
        title="935 Ocean BeachSide Inn"
        description="Surf | Play | Stay"
        buttonLabel="Contact Us"
        buttonLink="/contact"
        bgColor="#fca5a5"
        reverse
      />
    </Layout>
  );
}
