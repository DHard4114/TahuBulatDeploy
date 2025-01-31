
import Button from "../shared/Button";
import HorizontalLines from "../shared/HorizontalLines";

const Hero = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/TahuBulat2.jpg')" }}
    >
      <div className="h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-cookie text-4xl md:text-6xl lg:text-7xl text-[#fffffe]">
          The
        </h2>
        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          <HorizontalLines />
          <h1 className="font-anton font-extrabold text-6xl md:text-8xl lg:text-9xl text-[#fffffe]">
            TOFU CRAZE
          </h1>
          <HorizontalLines />
        </div>

        <h2 className="font-montserrat font-bold text-lg md:text-xl text-[#fffffe] mt-2">
          TAKEOUT & DELIVERY
        </h2>
        <div className="flex flex-col justify-center items-center space-y-2 mt-5 shadow-md">
          <Button href="/order" variants="primary">
            Get Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
