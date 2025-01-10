import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

const all_product = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Dress",
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
    filters: {
      colors: ["red", "blue", "white"],
      sizes: ["S", "M", "L"],
    },
    likes: [5, 4, 4, 3, 5],
    comments: [
      { user: "John", comment: "Great product!" },
      { user: "Alice", comment: "Love the design!" }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."
    },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["black", "pink", "yellow"],
      sizes: ["XS", "S", "M", "L"],
    },
    likes: [3, 4, 2, 5],
    comments: [
      { user: "Eve", comment: "Nice colors!" },
      { user: "Bob", comment: "A bit pricey, but looks good." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
    filters: {
      colors: ["blue", "green", "white"],
      sizes: ["M", "L", "XL"],
    },
    likes: [4, 4, 5, 5],
    comments: [
      { user: "Sarah", comment: "Great for summer!" },
      { user: "Tom", comment: "Comfortable fit." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
    filters: {
      colors: ["purple", "white", "yellow"],
      sizes: ["S", "M", "L", "XL"],
    },
    likes: [5, 5, 5, 4],
    comments: [
      { user: "Jessie", comment: "Perfect for a casual outing." },
      { user: "Liam", comment: "Soft fabric!" }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 5,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p5_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["red", "pink", "gray"],
      sizes: ["XS", "S", "M"],
    },
    likes: [4, 4, 3, 4],
    comments: [
      { user: "Mary", comment: "I love the red one!" },
      { user: "David", comment: "Good quality!" }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p6_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["green", "blue", "black"],
      sizes: ["M", "L", "XL"],
    },
    likes: [5, 5, 5],
    comments: [
      { user: "Olivia", comment: "Stylish and comfortable." },
      { user: "Sophia", comment: "I wear this all the time!" }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 7,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p7_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["yellow", "white", "blue"],
      sizes: ["XS", "S", "M", "L"],
    },
    likes: [4, 3, 5, 4],
    comments: [
      { user: "Mia", comment: "Comfortable fit!" },
      { user: "James", comment: "Love the colors." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 8,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p8_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["pink", "red", "black"],
      sizes: ["S", "M", "L"],
    },
    likes: [5, 5, 4, 4],
    comments: [
      { user: "Lily", comment: "Cute blouse!" },
      { user: "Ethan", comment: "A bit too tight for me." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 9,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p9_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["green", "purple", "white"],
      sizes: ["M", "L", "XL"],
    },
    likes: [3, 4, 4, 5],
    comments: [
      { user: "Isla", comment: "Beautiful color combination." },
      { user: "Jack", comment: "Good quality but too big for me." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 10,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p10_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["gray", "blue", "yellow"],
      sizes: ["XS", "S", "M", "L"],
    },
    likes: [5, 5, 5, 4],
    comments: [
      { user: "Charlotte", comment: "Great blouse for work!" },
      { user: "Oliver", comment: "Stylish and trendy." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 11,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p11_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["red", "black", "white"],
      sizes: ["S", "M", "L", "XL"],
    },
    likes: [4, 4, 3, 5],
    comments: [
      { user: "Henry", comment: "Nice blouse but pricey." },
      { user: "Sophia", comment: "Perfect fit!" }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 12,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    category: "women",
    type: "Blouse",
    image: p12_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["yellow", "green", "blue"],
      sizes: ["XS", "S", "M"],
    },
    likes: [4, 3, 4, 4],
    comments: [
      { user: "Rachel", comment: "Love the vibrant colors!" },
      { user: "James", comment: "Nice design, but too tight." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 13,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p13_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["green", "gray", "black"],
      sizes: ["M", "L", "XL"],
    },
    likes: [5, 4, 5],
    comments: [
      { user: "Mike", comment: "Fits perfectly!" },
      { user: "Adam", comment: "Good quality jacket." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 14,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p14_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["blue", "white", "red"],
      sizes: ["S", "M", "XL"],
    },
    likes: [3, 4, 3, 5],
    comments: [
      { user: "Chris", comment: "Great jacket, but runs a bit small." },
      { user: "Nash", comment: "Good for the winter season." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 15,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p15_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["gray", "red", "blue"],
      sizes: ["M", "L", "XL"],
    },
    likes: [4, 4, 5, 3],
    comments: [
      { user: "Matt", comment: "Comfortable and stylish." },
      { user: "John", comment: "Perfect for cold weather." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 16,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p16_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["green", "yellow", "black"],
      sizes: ["S", "M", "L"],
    },
    likes: [4, 5, 4],
    comments: [
      { user: "James", comment: "Very good quality!" },
      { user: "Ethan", comment: "Exactly what I was looking for." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 17,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p17_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["blue", "black", "yellow"],
      sizes: ["M", "L"],
    },
    likes: [5, 4, 5],
    comments: [
      { user: "Robert", comment: "Perfect jacket!" },
      { user: "Mike", comment: "Fits like a glove." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 18,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p18_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["gray", "black", "red"],
      sizes: ["S", "M", "L"],
    },
    likes: [4, 5, 3],
    comments: [
      { user: "Andrew", comment: "Nice jacket, good for layering." },
      { user: "David", comment: "A bit snug, but works well." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 19,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p19_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["red", "black", "blue"],
      sizes: ["M", "L", "XL"],
    },
    likes: [5, 4, 4],
    comments: [
      { user: "Tom", comment: "Great quality and color." },
      { user: "Lucas", comment: "Perfect for fall weather." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 20,
    name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p20_img,
    new_price: 85.0,
    old_price: 120.5,
    filters: {
      colors: ["blue", "black", "gray"],
      sizes: ["M", "L"],
    },
    likes: [5, 5, 3, 5],
    comments: [
      { user: "Oliver", comment: "Love the fit and style." },
      { user: "John", comment: "Great for layering." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 21,
    name: "Men Black Solid Zippered Full-Zip Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p21_img,
    new_price: 95.0,
    old_price: 140.0,
    filters: {
      colors: ["black", "green", "red"],
      sizes: ["S", "M", "L", "XL"],
    },
    likes: [4, 4, 5, 3],
    comments: [
      { user: "Ethan", comment: "Very comfortable." },
      { user: "David", comment: "Great for colder weather." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 22,
    name: "Men Black Solid Zippered Full-Zip Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p22_img,
    new_price: 100.0,
    old_price: 130.0,
    filters: {
      colors: ["black", "blue", "green"],
      sizes: ["M", "L", "XL"],
    },
    likes: [5, 5, 4, 4],
    comments: [
      { user: "Tom", comment: "Fits well and looks sleek." },
      { user: "Alex", comment: "Perfect for casual outings." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 23,
    name: "Men Black Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p23_img,
    new_price: 75.0,
    old_price: 110.0,
    filters: {
      colors: ["black", "gray", "blue"],
      sizes: ["M", "L", "XL"],
    },
    likes: [3, 4, 5],
    comments: [
      { user: "Jake", comment: "Great jacket, but fits a little snug." },
      { user: "Ryan", comment: "Good quality and looks great." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 24,
    name: "Men Black Solid Zippered Full-Zip Slim Fit Bomber Jacket",
    category: "men",
    type: "Jacket",
    image: p24_img,
    new_price: 85.0,
    old_price: 120.0,
    filters: {
      colors: ["black", "gray", "red"],
      sizes: ["S", "M", "L"],
    },
    likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
     {   id: 25,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p25_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["orange", "red", "white"],
        sizes: ["S", "M", "L"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 26,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p26_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["yellow", "blue", "black"],
        sizes: ["XS", "S", "M"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 27,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p27_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["orange", "green", "gray"],
        sizes: ["M", "L", "XL"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 28,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p28_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["red", "blue", "yellow"],
        sizes: ["S", "M", "L"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 29,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p29_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["black", "white", "orange"],
        sizes: ["XS", "S", "M"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 30,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweetshirt",
      image: p30_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["blue", "yellow", "green"],
        sizes: ["M", "L", "XL"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 31,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweatshirt",
      image: p31_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["orange", "red", "gray"],
        sizes: ["XS", "S", "M"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 32,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweatshirt",
      image: p32_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["yellow", "blue", "black"],
        sizes: ["S", "M", "L"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
    {
      id: 33,
      name: "Boys Orange Colourblocked Hooded Sweatshirt",
      category: "kid",
      type: "Sweatshirt",
      image: p33_img,
      new_price: 85.0,
      old_price: 120.5,
      filters: {
        colors: ["red", "white", "green"],
        sizes: ["M", "L", "XL"],
      },
      likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

    },
      {
    id: 34,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    type: "Sweatshirt",
    image: p34_img,
    new_price: 85.0,
    old_price: 120.5,
    colors: ["orange", "red", "gray"],
    sizes: ["XS", "S", "M"],
    likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 35,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    type: "Sweatshirt",
    image: p35_img,
    new_price: 85.0,
    old_price: 120.5,
    colors: ["red", "blue", "yellow"],
    sizes: ["S", "M", "L"],
    likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
  {
    id: 36,
    name: "Boys Orange Colourblocked Hooded Sweatshirt",
    category: "kid",
    type: "Sweatshirt",
    image: p36_img,
    new_price: 85.0,
    old_price: 120.5,
    colors: ["yellow", "blue", "black"],
    sizes: ["XS", "S", "M"],
    likes: [4, 5, 4],
    comments: [
      { user: "Chris", comment: "Awesome jacket!" },
      { user: "Jack", comment: "Comfortable and stylish." }
    ],
    description: "Stylish and comfortable apparel that combines modern design with high-quality materials. This item is crafted with both comfort and elegance in mind, perfect for everyday wear or special occasions. Thanks to carefully selected fabrics, the garment offers not only comfort but also durability and resistance to everyday use. Choose this product to feel confident and fashionable, no matter the occasion."

  },
];

//   const all_product = [
//     {
//       id: 1,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p1_img,
//       new_price: 50.0,
//       old_price: 80.5,
//       filters: {
//         colors: ["red", "blue", "white"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 2,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p2_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["black", "pink", "yellow"],
//         sizes: ["XS", "S", "M", "L"],
//       },
//     },
//     {
//       id: 3,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p3_img,
//       new_price: 60.0,
//       old_price: 100.5,
//       filters: {
//         colors: ["blue", "green", "white"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 4,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p4_img,
//       new_price: 100.0,
//       old_price: 150.0,
//       filters: {
//         colors: ["purple", "white", "yellow"],
//         sizes: ["S", "M", "L", "XL"],
//       },
//     },
//     {
//       id: 5,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p5_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "pink", "gray"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 6,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p6_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["green", "blue", "black"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 7,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p7_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["yellow", "white", "blue"],
//         sizes: ["XS", "S", "M", "L"],
//       },
//     },
//     {
//       id: 8,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p8_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["pink", "red", "black"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 9,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p9_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["green", "purple", "white"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 10,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p10_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["gray", "blue", "yellow"],
//         sizes: ["XS", "S", "M", "L"],
//       },
//     },
//     {
//       id: 11,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p11_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "black", "white"],
//         sizes: ["S", "M", "L", "XL"],
//       },
//     },
//     {
//       id: 12,
//       name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//       category: "women",
//       image: p12_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["yellow", "green", "blue"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 13,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p13_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["green", "gray", "black"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 14,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p14_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["blue", "white", "red"],
//         sizes: ["S", "M", "XL"],
//       },
//     },
//     {
//       id: 15,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p15_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["gray", "red", "blue"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 16,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p16_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["green", "yellow", "black"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 17,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p17_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "blue", "white"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 18,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p18_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["black", "gray", "blue"],
//         sizes: ["S", "M", "XL"],
//       },
//     },
//     {
//       id: 19,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p19_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["green", "yellow", "black"],
//         sizes: ["XS", "S", "M", "L"],
//       },
//     },
//     {
//       id: 20,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p20_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "blue", "gray"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 21,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p21_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["yellow", "green", "blue"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 22,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p22_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["pink", "white", "black"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 23,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p23_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "blue", "yellow"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 24,
//       name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//       category: "men",
//       image: p24_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["gray", "green", "black"],
//         sizes: ["S", "M", "L", "XL"],
//       },
//     },
//     {
//       id: 25,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p25_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["orange", "red", "white"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 26,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p26_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["yellow", "blue", "black"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 27,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p27_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["orange", "green", "gray"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 28,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p28_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "blue", "yellow"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 29,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p29_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["black", "white", "orange"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 30,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p30_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["blue", "yellow", "green"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//     {
//       id: 31,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p31_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["orange", "red", "gray"],
//         sizes: ["XS", "S", "M"],
//       },
//     },
//     {
//       id: 32,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p32_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["yellow", "blue", "black"],
//         sizes: ["S", "M", "L"],
//       },
//     },
//     {
//       id: 33,
//       name: "Boys Orange Colourblocked Hooded Sweatshirt",
//       category: "kid",
//       image: p33_img,
//       new_price: 85.0,
//       old_price: 120.5,
//       filters: {
//         colors: ["red", "white", "green"],
//         sizes: ["M", "L", "XL"],
//       },
//     },
//       {
//     id: 34,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p34_img,
//     new_price: 85.0,
//     old_price: 120.5,
//     colors: ["orange", "red", "gray"],
//     sizes: ["XS", "S", "M"],
//   },
//   {
//     id: 35,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p35_img,
//     new_price: 85.0,
//     old_price: 120.5,
//     colors: ["red", "blue", "yellow"],
//     sizes: ["S", "M", "L"],
//   },
//   {
//     id: 36,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p36_img,
//     new_price: 85.0,
//     old_price: 120.5,
//     colors: ["yellow", "blue", "black"],
//     sizes: ["XS", "S", "M"],
//   },
// ];
  
//   {
//     id: 1,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p1_img,
//     new_price: 50.0,
//     old_price: 80.5,
//   },
//   {
//     id: 2,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p2_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 3,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p3_img,
//     new_price: 60.0,
//     old_price: 100.5,
//   },
//   {
//     id: 4,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p4_img,
//     new_price: 100.0,
//     old_price: 150.0,
//   },
//   {
//     id: 5,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p5_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 6,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p6_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 7,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p7_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 8,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p8_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 9,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p9_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 10,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p10_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 11,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p11_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 12,
//     name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
//     category: "women",
//     image: p12_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 13,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p13_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 14,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p14_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 15,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p15_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 16,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p16_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 17,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p17_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 18,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p18_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 19,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p19_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 20,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p20_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 21,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p21_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 22,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p22_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 23,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p23_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 24,
//     name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
//     category: "men",
//     image: p24_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 25,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p25_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 26,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p26_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 27,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p27_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 28,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p28_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 29,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p29_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 30,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p30_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 31,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p31_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 32,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p32_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 33,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p33_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 34,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p34_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 35,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p35_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
//   {
//     id: 36,
//     name: "Boys Orange Colourblocked Hooded Sweatshirt",
//     category: "kid",
//     image: p36_img,
//     new_price: 85.0,
//     old_price: 120.5,
//   },
// ];

export default all_product;