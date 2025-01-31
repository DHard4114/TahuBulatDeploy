import Button from "../shared/Button";

const PrivateEvents = () => {
  return (
    <div className="w-full pb-16 h-auto flex flex-col justify-start items-center bg-[#FDEBD0]">
      <div className="w-full h-1 bg-[#161616]"></div>
      <div className="w-48 md:w-64 h-12 md:h-16 rounded-b-sm shadow-md bg-[#161616] text-white text-center text-xl md:text-2xl font-lato font-light flex items-center justify-center">
        Private Events
      </div>
      <div className="flex flex-col justify-center items-center pt-16 px-4">
        <div className="text-center w-full mx-auto">
          <h1 className="font-anton font-bold text-4xl md:text-6xl tracking-[0.15em] mb-10 px-4">
            WANT A SPECIAL EVENT?
          </h1>
          <p className="font-lato font-normal max-w-[50ch] mx-auto">
            Mencari camilan unik untuk acara keluarga, ulang tahun, atau
            pertemuan kantor? Tofu Craze siap menyajikan tahu bulat yang
            baru digoreng, langsung diantar ke tempat Anda!
          </p>
        </div>
      </div>
      <Button href="#contact" variants="primary">
        Contact Us
      </Button>
    </div>
  );
};

export default PrivateEvents;
