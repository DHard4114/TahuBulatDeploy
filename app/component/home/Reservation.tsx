import Button from "../shared/Button";

const Reservations = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-center bg-[#FDEBD0]">
      <div className="w-full h-1 bg-[#161616]"></div>
      <div className="w-48 md:w-64 h-12 md:h-14 rounded-b-sm shadow-md bg-[#161616] text-white text-center text-xl md:text-2xl font-lato font-light flex items-center justify-center">
        Reservations
      </div>
      <div className="flex flex-col justify-center items-center pt-16 px-4">
        <div className="text-center w-full mx-auto">
          <h1 className="font-anton font-bold text-4xl md:text-6xl tracking-[0.15em] mb-10 px-4">
            MAKE A RESERVATION
          </h1>
          <div className="flex justify-center items-center mb-8 w-full max-w-4xl mx-auto px-4">
            <Button href="/reservation" variants="primary">
              Find a Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
