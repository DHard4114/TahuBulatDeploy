import Hero from "./component/home/Hero";
import OurStory from "./component/home/OurStory";
import SoftlyRounds from "./component/home/SoftlyRounds";
import Reservations from "./component/home/Reservation";
import PrivateEvents from "./component/home/PrivateEvents";
import ImageGrid from "./component/home/ImageGrid";
import ReviewCard from "./component/shared/ReviewCard";

export default function Home() {
  return (
    <div className="w-full h-auto flex flex-col">
      <Hero />
      <OurStory />
      <SoftlyRounds />
      <Reservations />
      <ImageGrid />
      <PrivateEvents />
      <ReviewCard />
    </div>
  );
}
