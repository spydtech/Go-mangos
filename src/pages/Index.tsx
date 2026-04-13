// import { Link } from "react-router-dom";
// import { ArrowRight, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import ProductCard from "@/components/ProductCard";
// import { products } from "@/data/products";
// import heroImage from "@/assets/hero-mangoes.jpg";
// import name from "../assets/mainimage.png";

// const Index = () => {
//   const featured = products.slice(0, 3);

//   return (
//     <div className="bg-[#fdf8f2]">

//       {/* 🔥 HERO (Poster Style) */}
//       <section className="relative min-h-[90vh] flex items-center justify- text-center">
//         <img
//           src={heroImage}
//           alt="Mangoes"
//           className="absolute  inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/70"></div>

//         <div className="relative z-10 px-4 max-w-3xl">
//           <div className="flex justify-center ">
//             <img src={name} alt="logo" className="h-16 md:h-44 object-contain" />
//           </div>

//           <h1 className="text-4xl md:text-6xl font-extrabold text-[#c95410]">
//             Farm Fresh Mangoes
//             <br />
//             <span className="text-[#c95410]">
//               Delivered To Your Doorstep!
//             </span>
//           </h1>

//           <p className="mt-4 text-lg text-white/90">
//             100% Natural, Sweet & Juicy Mangoes Direct From Farms
//           </p>

//           <div className="flex justify-center gap-4 mt-4 text-white">
//             <span><span className="text-green-500">✔</span> No Chemicals</span>
//             <span><span className="text-green-500">✔</span> No Middlemen</span>
//           </div>

//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//            <button className="text-white p-4 text-center rounded-xl shadow-lg font-bold text-lg hover:bg-green-600 transition-colors"
//                 style={{
//                  background: "linear-gradient(to bottom, #c3d656 0%, #6e9c14 20%, #24451a 100%)"
//                       }}
//                 >
//                 <p>Order now </p>
//                 </button>

//             {/* <Button asChild size="lg" className="bg-yellow-500 text-black">
//               <Link to="/products">
//                 Shop Now <ArrowRight className="ml-2" />
//               </Link>
//             </Button> */}
//           </div>

//           <p className="mt-4 text-sm text-white/80">
//             High Demand – Limited Stock!
//           </p>
//         </div>
//       </section>

//       {/* 🥭 BEST SELLERS */}
//       <section className="py-16 text-center">
//         <h2 className="text-3xl font-bold text-green-800">
//           Our Best Seller Mangoes
//         </h2>
//         <p className="mt-2 text-gray-600">
//           100% natural, luscious mangoes harvested fresh from our farms!
//         </p>

//         <div className="grid gap-6 mt-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
//           {featured.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       </section>

//       {/* 📲 WHATSAPP ORDER SECTION */}
//       <section className="py-16 bg-[#f6efe6]">
//         <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

//           {/* Left Image */}
//           <img
//             src={heroImage}
//             alt="mango box"
//             className="rounded-xl shadow-lg"
//           />

//           {/* Steps */}
//           <div>
//             <h2 className="text-3xl font-bold text-[#24451a]">
//               Order Now 
//             </h2>

//           <ul className="mt-6 space-y-4 text-lg">
//   <li className="flex items-center gap-3">
//     <span
//       className="flex items-center justify-center w-8 h-8 text-white rounded-full font-semibold"
//       style={{
//         background: "linear-gradient(to bottom, #c3d656 0%, #6e9c14 20%, #24451a 100%)"
//       }}
//     >
//       1
//     </span>
//     Share Name & Address
//   </li>

//   <li className="flex items-center gap-3">
//     <span
//       className="flex items-center justify-center w-8 h-8 text-white rounded-full font-semibold"
//       style={{
//         background: "linear-gradient(to bottom, #c3d656 0%, #6e9c14 20%, #24451a 100%)"
//       }}
//     >
//       2
//     </span>
//     Choose Quantity
//   </li>

//   <li className="flex items-center gap-3">
//     <span
//       className="flex items-center justify-center w-8 h-8 text-white rounded-full font-semibold"
//       style={{
//         background: "linear-gradient(to bottom, #c3d656 0%, #6e9c14 20%, #24451a 100%)"
//       }}
//     >
//       3
//     </span>
//     Get Same/Next Day Delivery!
//   </li>
// </ul>

           
//           </div>
//         </div>
//       </section>

//       {/* ⭐ REVIEWS */}
//       <section className="py-16 text-center">
//         <h2 className="text-3xl font-bold text-green-800">
//           Customer Reviews
//         </h2>

//         <div className="flex justify-center mt-2 text-yellow-500">
//           {[...Array(5)].map((_, i) => (
//             <Star key={i} fill="currentColor" />
//           ))}
//         </div>

//         <div className="grid gap-6 mt-10 px-4 md:grid-cols-3">
          
//           {/* Review 1 */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>
//               “Absolutely delicious mangoes! so fresh, juicy, and naturally sweet.”
//             </p>
//             <h4 className="mt-4 font-semibold">Rahul K.</h4>
//           </div>

//           {/* Review 2 */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>
//               “Ordered Alphonso mangoes. Received them super fresh next day!”
//             </p>
//             <h4 className="mt-4 font-semibold">Divya M.</h4>
//           </div>

//           {/* Review 3 */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>
//               “High quality mangoes delivered as promised. Fantastic taste!”
//             </p>
//             <h4 className="mt-4 font-semibold">Amit S.</h4>
//           </div>

//         </div>
//       </section>

//       {/* 📞 FINAL CTA */}
//       <section className="py-10 text-center bg-orange-400 text-white">
//         <h2 className="text-xl font-bold">
//           Call to Order 📞 +91 87645 32409
//         </h2>
//       </section>

//     </div>
//   );
// };

// export default Index;




import { Link } from "react-router-dom";
import { Star, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-mangoes.jpg";
import name from "../assets/mainimage.png";

const Index = () => {
  const featured = products.slice(0, 3);

  // Products data matching the image
  const productsList = [
    {
      id: 1,
      name: "Banganapalli",
      description: "Irsint & juicy. Fiberless texture.",
      price: "₹399/kg",
      image: heroImage
    },
    {
      id: 2,
      name: "Alphonso",
      description: "Premium, rich and aromatic.",
      price: "₹599/kg",
      image: heroImage
    },
    {
      id: 3,
      name: "Kesar",
      description: "Sweet, saffron-like flavor.",
      price: "₹449/kg",
      image: heroImage
    }
  ];

  const reviews = [
    {
      name: "Gomango.",
      phone: "+91 8764 532 409",
      text: "Absolutely delicious mangoes! So fresh, juicy, and naturally sweet.",
      rating: 5
    },
    {
      name: "Divyaa M..",
      phone: "+86 764 532 409",
      text: "Ordered Alphonso mangoes. Received them super feel! the very next day? Great!",
      rating: 5
    },
    {
      name: "Rahul K.",
      phone: "+86 764 532 409",
      text: "High quality mangoes delivered as promised. Fantastic taste! Highly recommended.",
      rating: 5
    }
  ];

  return (
    <div className="bg-[#fdf8f2] min-h-screen">

      {/* Hero Section - Exact match to image */}
      <section className="relative min-h-screen flex items-center justify-center text-center">
        <img
          src={heroImage}
          alt="Fresh Mangoes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={name} 
              alt="Farm Fresh Mangoes" 
              className="h-24 md:h-32 object-contain"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Farm Fresh Mangoes
            <br />
            <span className="text-[#ffa500]">
              Delivered To Your Doorstep!
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg md:text-xl text-white/90">
            100% Natural, Sweet & Juicy Mangoes Direct From Farms
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-white">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✖</span>
              <span>No Chemicals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✖</span>
              <span>No Middlemen</span>
            </div>
          </div>

          {/* Order Now Button */}
          <div className="mt-8">
            <a
              href="https://wa.me/918764532409"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white text-lg transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c3d656 0%, #6e9c14 50%, #24451a 100%)"
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Order Now on WhatsApp
            </a>
          </div>

          {/* Limited Stock Notice */}
          <p className="mt-6 text-sm font-semibold text-yellow-300 bg-black/40 inline-block px-4 py-1 rounded-full">
            High Demand - Limited Stock!
          </p>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d5a27]">
            Our Best Seller Mangoes
          </h2>
          <p className="text-center text-gray-600 mt-2 mb-12">
            100% natural, luscious mangoes harvested fresh from our farms!
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {productsList.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#2d5a27] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <a
                    href="https://wa.me/918764532409"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 bg-[#ffa500] text-white font-semibold rounded-lg hover:bg-[#ff8c00] transition-colors"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Order Section */}
      <section className="py-16 px-4 bg-[#f5efe8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div>
              <img 
                src={heroImage}
                alt="Fresh Mangoes"
                className="w-full rounded-xl shadow-lg"
              />
            </div>

            {/* Right Side - Order Steps */}
            <div>
              <h2 className="text-3xl font-bold text-[#2d5a27] mb-6">
                Order Now on WhatsApp!
              </h2>
              
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: "linear-gradient(135deg, #c3d656 0%, #6e9c14 50%, #24451a 100%)"
                    }}
                  >
                    1
                  </div>
                  <span className="text-lg">Share Name & Address</span>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: "linear-gradient(135deg, #c3d656 0%, #6e9c14 50%, #24451a 100%)"
                    }}
                  >
                    2
                  </div>
                  <span className="text-lg">Choose Quantity</span>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: "linear-gradient(135deg, #c3d656 0%, #6e9c14 50%, #24451a 100%)"
                    }}
                  >
                    3
                  </div>
                  <span className="text-lg">Get Same/Next Day Delivery!</span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/918764532409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20b859] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2d5a27] mb-2">
            Customer Reviews
          </h2>
          <div className="flex justify-center mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  "{review.text}"
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-[#2d5a27]">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white">
            Call to Order 📞 +91 87645 32409
          </h2>
        </div>
      </section>

    </div>
  );
};

export default Index;