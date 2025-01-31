

const OurStory = () => {
  return (
    <div className="w-full pb-16 h-auto flex flex-col justify-start items-center bg-[#FDEBD0]">
      <div className="w-full h-1 bg-[#161616]"></div>
      <div className="w-48 md:w-64 h-12 md:h-16 rounded-b-sm shadow-sm bg-[#161616] text-white text-center text-xl md:text-2xl font-lato font-light flex items-center justify-center">
        Our Story
      </div>
      <div className="flex flex-col justify-center items-center pt-16 px-4">
        <div className="text-center w-full max-w-4xl">
          <h1 className="font-anton font-bold text-4xl md:text-6xl tracking-[0.15em]">
            THE ESSENCE OF TOFU CRAZE
          </h1>

          <div className="w-full max-w-[600px] mx-auto">
            <div
              className="w-full h-64 md:h-96 bg-white mt-4 rounded-sm"
              style={{
                backgroundImage: "url('/TahuMurni.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <p className="mt-4 font-lato font-normal text-sm md:text-md text-center">
              Di balik setiap bola tahu yang lembut dan renyah dari Tofu
              Craze, terdapat dedikasi dan cinta dalam setiap langkah
              pembuatannya. Kami percaya bahwa tahu bukan sekadar makanan—ia
              adalah seni, tradisi, dan kenangan berharga yang terus
              berkembang. Mulai dari pemilihan bahan berkualitas tinggi hingga
              teknik pengolahan unik, kami menghadirkan cita rasa otentik yang
              memanjakan indera. Setiap gigitan menghadirkan kehangatan,
              setiap aroma membangkitkan nostalgia, dan setiap sajian adalah
              bukti komitmen kami dalam memberikan pengalaman kuliner yang tak
              terlupakan. Nikmati kelezatan Tofu Craze dengan rasa khas dan
              tekstur sempurna yang akan membuat Anda ketagihan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
