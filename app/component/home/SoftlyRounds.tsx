
import Button from "../shared/Button";

const SoftlyRounds = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/TahuBulat4.webp')" }}>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-anton tracking-[0.1em] text-center px-4">
          SOFTLY ROUNDS
        </h1>

        <div className="flex flex-col justify-center items-center mt-5 shadow-md">
          <Button href="/menu" variants="secondary">
            See Our Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SoftlyRounds;
