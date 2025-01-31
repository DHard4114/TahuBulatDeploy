export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface MenuData {
  [category: string]: MenuItem[];
}

export const menu: MenuData = {
  Makanan: [
    { name: "Tahu Bulat Original", description: "Tahu bulat goreng renyah dengan rasa original yang menggoda.", price: 15_000, image: "/TahuBulat7.jpg" },
    { name: "Tahu Bulat Mozarella", description: "Tahu bulat isi keju mozarella yang meleleh, memberikan sensasi lezat di setiap gigitan.", price: 20_000, image: "/TahuBulatMozarela.jpg" },
    { name: "Tahu Bulat Udang Ayam", description: "Tahu bulat dengan isian udang dan ayam gurih, paduan cita rasa yang sempurna.", price: 25_000, image: "/TahuBulatayamudang.jpg" },
    { name: "Tahu Bulat Mercon", description: "Tahu bulat pedas dengan isian sambal mercon yang menggugah selera.", price: 20_000, image: "/TahuBulat4.webp" },
    { name: "Tahu Bulat Isi Telor", description: "Tahu bulat dengan isian telur puyuh, menciptakan kenikmatan yang tak terlupakan.", price: 22_000, image: "/TahuBulatTelor.webp" },
    { name: "Tahu Bulat Isi Daging Rendang", description: "Tahu bulat dengan isian daging rendang khas Padang yang kaya rempah.", price: 30_000, image: "/TahuBulatRendang.jpg" },
    { name: "Tahu Bulat Isi Ayam/Sapi Rempah Indonesia", description: "Tahu bulat dengan isian ayam atau sapi berbumbu rempah khas Nusantara.", price: 28_000, image: "/TahuBulatRempah.webp" },
  ],
  "Makanan Lain": [
    { name: "Otak-otak Kepiting Alaska", description: "Otak-otak khas dengan campuran kepiting Alaska yang lezat dan bergizi.", price: 35_000, image: "/Otak-otakKepiting.jpeg" },
    { name: "Otak-otak Gurita", description: "Otak-otak dengan daging gurita segar, disajikan dengan bumbu yang penuh cita rasa.", price: 38_000, image: "/Otak-otakGurita.webp" },
    { name: "Otak-otak Udang", description: "Otak-otak dengan udang pilihan yang dipadu dengan rempah-rempah segar.", price: 30_000, image: "/Otak-otakUdang.jpeg" },
    { name: "Sotong", description: "Otak-otak tradisional dengan cita rasa khas yang autentik dan menggugah selera.", price: 25_000, image: "/Sotong.jpg" },
  ],
  "Minuman Segar": [
    { name: "Es Teh Tarik", description: "Teh hitam yang ditarik untuk rasa manis dengan sentuhan sedikit pahit.", price: 18_000, image: "/tehtarik.jpg" },
    { name: "Jus Buah Segar", description: "Jus buah alami dari jeruk, mangga, atau jambu biji, menyegarkan dan sehat.", price: 25_000, image: "/jusbuah.jpg" },
    { name: "Mocktail", description: "Minuman non-alkohol dengan campuran buah segar dan soda yang menyegarkan.", price: 30_000, image: "/mocktail.jpg" },
    { name: "Smoothies", description: "Minuman kental dari buah-buahan segar, yogurt, dan es, lezat dan penuh gizi.", price: 35_000, image: "/smoothies.jpg" },
    { name: "Ice Coffee", description: "Kopi dingin yang menyegarkan, dengan pilihan susu atau tanpa susu.", price: 22_000, image: "/icecoffe.webp" },
  ],
  "Minuman Hangat": [
    { name: "Kopi Hitam", description: "Kopi klasik dengan rasa pahit yang khas, sempurna untuk memulai hari.", price: 15_000, image: "/kopiitem.jpg" },
    { name: "Teh Panas", description: "Teh hangat dari teh celup atau tubruk dengan variasi rasa yang menenangkan.", price: 13_000, image: "/tehanget.jpeg" },
    { name: "Cokelat Panas", description: "Minuman manis dan creamy yang menghangatkan tubuh di hari yang dingin.", price: 20_000, image: "/coklatpanas.jpg" },
    { name: "Wedang Jahe", description: "Minuman tradisional dengan jahe, serai, dan gula merah yang menyegarkan dan menyehatkan.", price: 22_000, image: "/wedangjahe.jpg" },
  ],
};

