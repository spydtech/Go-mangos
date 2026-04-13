// import { useState, useMemo } from "react";
// import ProductCard from "@/components/ProductCard";
// import { products, varieties, origins } from "@/data/products";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const Products = () => {
//   const [variety, setVariety] = useState("all");
//   const [origin, setOrigin] = useState("all");
//   const [sort, setSort] = useState("popular");

//   const filtered = useMemo(() => {
//     let list = [...products];
//     if (variety !== "all") list = list.filter((p) => p.variety === variety);
//     if (origin !== "all") list = list.filter((p) => p.origin === origin);
//     switch (sort) {
//       case "price-asc": list.sort((a, b) => a.price - b.price); break;
//       case "price-desc": list.sort((a, b) => b.price - a.price); break;
//       case "rating": list.sort((a, b) => b.rating - a.rating); break;
//       default: list.sort((a, b) => b.reviewCount - a.reviewCount);
//     }
//     return list;
//   }, [variety, origin, sort]);

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Shop Mangoes</h1>
//       <p className="mb-8 text-muted-foreground">Browse our premium collection of farm-fresh mangoes</p>

//       <div className="mb-8 flex flex-wrap gap-3">
//         <Select value={variety} onValueChange={setVariety}>
//           <SelectTrigger className="w-40"><SelectValue placeholder="Variety" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Varieties</SelectItem>
//             {varieties.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
//           </SelectContent>
//         </Select>
//         <Select value={origin} onValueChange={setOrigin}>
//           <SelectTrigger className="w-44"><SelectValue placeholder="Origin" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Origins</SelectItem>
//             {origins.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
//           </SelectContent>
//         </Select>
//         <Select value={sort} onValueChange={setSort}>
//           <SelectTrigger className="w-44"><SelectValue placeholder="Sort by" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="popular">Most Popular</SelectItem>
//             <SelectItem value="price-asc">Price: Low to High</SelectItem>
//             <SelectItem value="price-desc">Price: High to Low</SelectItem>
//             <SelectItem value="rating">Highest Rated</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {filtered.length === 0 ? (
//         <p className="py-20 text-center text-muted-foreground">No products match your filters.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;



// import { useState, useMemo } from "react";
// import ProductCard from "@/components/ProductCard";
// import { products, varieties, origins } from "@/data/products";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const Products = () => {
//   const [variety, setVariety] = useState("all");
//   const [origin, setOrigin] = useState("all");
//   const [sort, setSort] = useState("popular");

//   const filtered = useMemo(() => {
//     let list = [...products];
//     if (variety !== "all") list = list.filter((p) => p.variety === variety);
//     if (origin !== "all") list = list.filter((p) => p.origin === origin);
//     switch (sort) {
//       case "price-asc": list.sort((a, b) => a.price - b.price); break;
//       case "price-desc": list.sort((a, b) => b.price - a.price); break;
//       case "rating": list.sort((a, b) => b.rating - a.rating); break;
//       default: list.sort((a, b) => b.reviewCount - a.reviewCount);
//     }
//     return list;
//   }, [variety, origin, sort]);

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Shop Mangoes</h1>
//       <p className="mb-8 text-muted-foreground">Browse our premium collection of farm-fresh mangoes</p>

//       <div className="mb-8 flex flex-wrap gap-3">
//         <Select value={variety} onValueChange={setVariety}>
//           <SelectTrigger className="w-40"><SelectValue placeholder="Variety" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Varieties</SelectItem>
//             {varieties.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
//           </SelectContent>
//         </Select>
//         <Select value={origin} onValueChange={setOrigin}>
//           <SelectTrigger className="w-44"><SelectValue placeholder="Origin" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Origins</SelectItem>
//             {origins.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
//           </SelectContent>
//         </Select>
//         <Select value={sort} onValueChange={setSort}>
//           <SelectTrigger className="w-44"><SelectValue placeholder="Sort by" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="popular">Most Popular</SelectItem>
//             <SelectItem value="price-asc">Price: Low to High</SelectItem>
//             <SelectItem value="price-desc">Price: High to Low</SelectItem>
//             <SelectItem value="rating">Highest Rated</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {filtered.length === 0 ? (
//         <p className="py-20 text-center text-muted-foreground">No products match your filters.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;




import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products, varieties, origins } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Products = () => {
  const [variety, setVariety] = useState("all");
  const [origin, setOrigin] = useState("all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = [...products];
    if (variety !== "all") list = list.filter((p) => p.variety === variety);
    if (origin !== "all") list = list.filter((p) => p.origin === origin);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [variety, origin, sort]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
        Shop Mangoes
      </h1>
      <p className="mb-8 text-muted-foreground">
        Browse our premium collection of farm-fresh mangoes
      </p>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Select value={variety} onValueChange={setVariety}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Variety" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Varieties</SelectItem>
            {varieties.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={origin} onValueChange={setOrigin}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Origin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Origins</SelectItem>
            {origins.map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No products match your filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;