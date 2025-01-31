import Image from "next/image";

const ImageGrid = () => {
  const images = [
    "/TahuBulat3.jpg",
    "/TahuBulat7.jpg",
    "/TahuBulat4.webp",
    "/TahuBulat1.jpg",
    "/TahuBulat5.jpg",
    "/TahuBulat2.jpg",
    "/TahuBulat1.jpg",
    "/TahuBulat6.jpg",
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-0.5">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-sm"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
