import { FaEnvelope, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";

export default function ContactSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-center max-w-6xl mx-auto px-4 space-y-6 md:space-y-0">
      <div className="flex flex-col justify-center items-center space-y-3">
        <a
          href="https://instagram.com/dapahardan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-gray-300 transition-all"
        >
          <FaInstagram size={24} />
          <span className="font-medium font-mono text-sm sm:text-base">Instagram</span>
        </a>

        <a
          href="https://wa.me/62815216042495"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-gray-300 transition-all"
        >
          <FaWhatsapp size={24} />
          <span className="font-medium font-mono text-sm sm:text-base">WhatsApp</span>
        </a>

        <a
          href="mailto:dapahardan@gmail.com"
          className="flex items-center space-x-2 hover:text-gray-300 transition-all"
        >
          <FaEnvelope size={20} />
          <span className="font-medium font-mono text-sm sm:text-base">Email: </span>
          <span className="font-medium font-mono text-sm sm:text-base">dapahardan@gmail.com</span>
        </a>

        <a
          href="tel:+6285216042495"
          className="flex items-center space-x-2 hover:text-gray-300 transition-all mt-2"
        >
          <FaPhone size={18} />
          <span className="font-medium font-mono text-sm sm:text-base">Phone: </span>
          <span className="font-medium font-mono text-sm sm:text-base">+62 852 1604 2495</span>
        </a>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-center md:items-end space-y-3 w-full max-w-sm mt-6 md:mt-0">
        <h2 className="text-lg sm:text-xl font-bold font-mono text-gray-100">Contact Us</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="block w-full rounded-sm p-2 border-2 border-black h-10 text-black"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="block w-full rounded-sm p-2 border-2 border-black h-10 text-black"
            required
          />
          <textarea
            id="message"
            rows={3}
            placeholder="Your Message"
            className="block w-full rounded-sm p-2 border-2 border-black h-20 text-black col-span-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#1a1919] text-white py-2 rounded-md hover:bg-black transition-all col-span-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
