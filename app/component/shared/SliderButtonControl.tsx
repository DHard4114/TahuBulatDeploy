interface CarouselControlsProps {
    onPrev: () => void;
    onNext: () => void;
  }
  
  const SliderButtonControl: React.FC<CarouselControlsProps> = ({ onPrev, onNext }) => {
    return (
      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={onPrev}
          className="text-3xl text-gray-600 hover:text-black transition cursor-pointer"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="text-3xl text-gray-600 hover:text-black transition cursor-pointer"
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default SliderButtonControl;
  