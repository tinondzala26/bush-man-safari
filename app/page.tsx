"use client";

import { useMemo, useState } from "react";

type Gender = "Men" | "Women" | "Unisex";
type Category = "Shirts" | "Bottoms" | "Outerwear" | "Headwear" | "Footwear" | "Accessories" | "Sun & Body";
type Product = {
  id: number;
  name: string;
  gender: Gender;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  imageAlt: string;
  position?: string;
  colours: { name: string; hex: string }[];
  sizes: string[];
  materials?: string[];
  badge?: string;
  rating: string;
  description: string;
};

const fieldColours = [{name:"Khaki",hex:"#b8a276"},{name:"Army Green",hex:"#596044"}];
const earthColours = [{name:"Brown",hex:"#76563a"},{name:"Black",hex:"#171914"}];
const towelColours = [{name:"Khaki",hex:"#b8a276"},{name:"Brown",hex:"#76563a"},{name:"White",hex:"#f7f5ef"},{name:"Army Green",hex:"#596044"}];
const products: Product[] = [
  {id:1,name:"Men's Karoo Short-Sleeve Safari Shirt",gender:"Men",category:"Shirts",price:990,image:"/bushman-apparel.jpg",position:"8% 18%",imageAlt:"Bush Man khaki short sleeve safari shirt",colours:fieldColours,sizes:["S","M","L","XL","2XL"],badge:"NEW",rating:"4.9 (126)",description:"Breathable cotton twill, reinforced seams and twin field pockets in a clean city-ready cut."},
  {id:2,name:"Men's Mopane Long-Sleeve Safari Shirt",gender:"Men",category:"Shirts",price:1290,image:"/bushman-apparel.jpg",position:"36% 18%",imageAlt:"Bush Man army green long sleeve safari shirt",colours:fieldColours,sizes:["S","M","L","XL","2XL"],rating:"4.8 (74)",description:"A durable long-sleeve field shirt with roll-up tabs and low-profile utility pockets."},
  {id:3,name:"Women's Acacia Short-Sleeve Safari Shirt",gender:"Women",category:"Shirts",price:1090,image:"/bushman-apparel.jpg",position:"66% 18%",imageAlt:"Bush Man women's khaki safari shirt",colours:fieldColours,sizes:["XS","S","M","L","XL"],badge:"NEW",rating:"4.9 (97)",description:"A shaped warm-weather safari shirt with breathable construction and polished utility detailing."},
  {id:4,name:"Women's Marula Long-Sleeve Safari Shirt",gender:"Women",category:"Shirts",price:1290,image:"/bushman-apparel.jpg",position:"91% 18%",imageAlt:"Bush Man women's army green long sleeve shirt",colours:fieldColours,sizes:["XS","S","M","L","XL"],rating:"4.8 (84)",description:"Soft cotton twill with a flattering fit and sleeves made for cool mornings and warm afternoons."},
  {id:5,name:"Men's Savanna Utility Shorts",gender:"Men",category:"Bottoms",price:890,image:"/bushman-apparel.jpg",position:"10% 84%",imageAlt:"Bush Man men's khaki utility shorts",colours:fieldColours,sizes:["30","32","34","36","38","40"],badge:"BESTSELLER",rating:"4.9 (203)",description:"Tailored safari shorts with a stretch waistband and secure travel pockets."},
  {id:6,name:"Men's Lowveld Long Safari Pants",gender:"Men",category:"Bottoms",price:1390,image:"/bushman-apparel.jpg",position:"39% 82%",imageAlt:"Bush Man men's army green long safari pants",colours:fieldColours,sizes:["30","32","34","36","38","40"],rating:"4.7 (89)",description:"Hard-wearing long trousers with articulated knees and low-profile cargo pockets."},
  {id:7,name:"Women's Karoo Safari Shorts",gender:"Women",category:"Bottoms",price:890,image:"/bushman-apparel.jpg",position:"67% 83%",imageAlt:"Bush Man women's khaki safari shorts",colours:fieldColours,sizes:["XS","S","M","L","XL"],rating:"4.7 (62)",description:"Easy tailored shorts with a comfortable high waist, belt loops and practical pockets."},
  {id:8,name:"Women's Serengeti Long Safari Pants",gender:"Women",category:"Bottoms",price:1390,image:"/bushman-apparel.jpg",position:"91% 82%",imageAlt:"Bush Man women's army green safari pants",colours:fieldColours,sizes:["XS","S","M","L","XL"],badge:"BESTSELLER",rating:"4.9 (178)",description:"High-rise cargo trousers with a clean tapered leg and functional field pockets."},
  {id:9,name:"Stormveld Rain Jacket",gender:"Unisex",category:"Outerwear",price:1690,image:"/bushman-outerwear.jpg",position:"24% 20%",imageAlt:"Bush Man army green rain jacket",colours:fieldColours,sizes:["XS","S","M","L","XL","2XL"],badge:"NEW",rating:"4.8 (58)",description:"A lightweight waterproof shell with sealed zips, practical pockets and an adjustable hood."},
  {id:10,name:"Table Bay Long Raincoat",gender:"Unisex",category:"Outerwear",price:2090,image:"/bushman-outerwear.jpg",position:"77% 20%",imageAlt:"Bush Man khaki long raincoat",colours:fieldColours,sizes:["XS","S","M","L","XL","2XL"],rating:"4.8 (51)",description:"Long waterproof coverage with a modern safari silhouette and quiet-touch technical fabric."},
  {id:11,name:"Dawn Drive Puffer Jacket",gender:"Unisex",category:"Outerwear",price:2290,image:"/bushman-outerwear.jpg",position:"24% 81%",imageAlt:"Bush Man army green puffer jacket",colours:fieldColours,sizes:["XS","S","M","L","XL","2XL"],badge:"NEW",rating:"4.9 (88)",description:"Warm, lightweight quilted insulation for cold game drives and winter city days."},
  {id:12,name:"Kalahari Field Jacket",gender:"Unisex",category:"Outerwear",price:2190,image:"/bushman-outerwear.jpg",position:"78% 81%",imageAlt:"Bush Man khaki field jacket",colours:fieldColours,sizes:["XS","S","M","L","XL","2XL"],rating:"4.8 (71)",description:"A four-pocket field jacket with a weather-resistant finish and understated black hardware."},
  {id:13,name:"Mopane Rib-Knit Beanie",gender:"Unisex",category:"Headwear",price:390,oldPrice:490,image:"/bushman-headwear.jpg",position:"18% 17%",imageAlt:"Bush Man army green beanie",colours:[...fieldColours,{name:"Brown",hex:"#76563a"}],sizes:["ONE SIZE"],badge:"SALE",rating:"4.8 (42)",description:"Soft rib-knit warmth in Bush Man's signature field colours."},
  {id:14,name:"Kudu Trail Cap",gender:"Unisex",category:"Headwear",price:490,oldPrice:590,image:"/bushman-headwear.jpg",position:"50% 55%",imageAlt:"Bush Man army green safari cap",colours:[...fieldColours,{name:"Brown",hex:"#76563a"}],sizes:["ONE SIZE"],badge:"SALE",rating:"4.8 (79)",description:"A washed cotton cap with embroidered Bush Man kudu and mountain branding."},
  {id:15,name:"Wide-Brim Safari Sun Hat",gender:"Unisex",category:"Headwear",price:790,oldPrice:890,image:"/bushman-headwear.jpg",position:"81% 82%",imageAlt:"Bush Man wide brim brown safari hat",colours:[...fieldColours,{name:"Brown",hex:"#76563a"}],sizes:["S/M","L/XL"],badge:"SALE",rating:"4.9 (144)",description:"Structured UPF 50+ shade with a packable brim and field-ready finish."},
  {id:16,name:"Ranger High-Cut Safari Boot",gender:"Unisex",category:"Footwear",price:2490,image:"/bushman-footwear.jpg",position:"18% 18%",imageAlt:"Bush Man high cut brown safari boot",colours:earthColours,materials:["Full-grain leather","Suede"],sizes:["UK 4","UK 5","UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"],badge:"BESTSELLER",rating:"4.9 (311)",description:"High-cut protection, cushioned support and deep-grip tread for long days in the field."},
  {id:17,name:"Ranger Low-Cut Safari Boot",gender:"Unisex",category:"Footwear",price:1990,image:"/bushman-footwear.jpg",position:"78% 18%",imageAlt:"Bush Man low cut brown safari shoe",colours:earthColours,materials:["Full-grain leather","Suede"],sizes:["UK 4","UK 5","UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"],rating:"4.8 (167)",description:"A lighter low-cut safari shoe with reliable grip and all-day cushioning."},
  {id:18,name:"Bushveld Grasshopper",gender:"Unisex",category:"Footwear",price:1590,image:"/bushman-footwear.jpg",position:"21% 57%",imageAlt:"Bush Man black grasshopper shoe",colours:earthColours,materials:["Leather","Suede"],sizes:["UK 4","UK 5","UK 6","UK 7","UK 8","UK 9","UK 10"],badge:"NEW",rating:"4.8 (93)",description:"A classic crepe-soled field shoe redesigned with a clean Bush Man profile."},
  {id:19,name:"Karoo Cross-Strap Sandal",gender:"Unisex",category:"Footwear",price:1290,image:"/bushman-footwear.jpg",position:"22% 87%",imageAlt:"Bush Man brown leather safari sandal",colours:earthColours,materials:["Leather","Suede"],sizes:["UK 4","UK 5","UK 6","UK 7","UK 8","UK 9","UK 10"],rating:"4.9 (67)",description:"Hand-finished straps, a padded footbed and a rugged outdoor sole."},
  {id:20,name:"Nguni Hide Safari Slide",gender:"Unisex",category:"Footwear",price:1395,image:"/bushman-footwear.jpg",position:"78% 86%",imageAlt:"Bush Man brown hide and fur slide",colours:earthColours,materials:["Leather","Suede","Natural fur / hide"],sizes:["UK 4","UK 5","UK 6","UK 7","UK 8","UK 9","UK 10"],badge:"CRAFTED IN SA",rating:"4.9 (81)",description:"A comfortable statement slide available in leather, suede or natural hair-on-hide."},
  {id:21,name:"Ridge Polarised Sunglasses",gender:"Unisex",category:"Accessories",price:990,oldPrice:1190,image:"/bushman-accessories.jpg",position:"35% 20%",imageAlt:"Bush Man branded sunglasses",colours:earthColours,sizes:["ONE SIZE"],badge:"SALE",rating:"4.8 (103)",description:"UV400 polarised lenses with discreet Bush Man branding on each temple."},
  {id:22,name:"Kudu Folding Pocket Knife",gender:"Unisex",category:"Accessories",price:690,oldPrice:790,image:"/bushman-accessories.jpg",position:"45% 74%",imageAlt:"Bush Man branded folding pocket knife",colours:earthColours,materials:["Wood","Leather sheath"],sizes:["ONE SIZE"],badge:"SALE",rating:"4.9 (65)",description:"A compact folding field knife with a secure mechanism and branded leather sheath."},
  {id:23,name:"Bushfire Refillable Lighter",gender:"Unisex",category:"Accessories",price:290,oldPrice:350,image:"/bushman-accessories.jpg",position:"84% 73%",imageAlt:"Bush Man branded refillable lighters",colours:fieldColours,sizes:["ONE SIZE"],badge:"SALE",rating:"4.7 (44)",description:"A rugged refillable lighter in signature khaki or army green."},
  {id:24,name:"Bush Shield Face SPF 50",gender:"Unisex",category:"Sun & Body",price:390,oldPrice:450,image:"/bushman-lotion-variants.jpg",imageAlt:"Bush Man branded face SPF 50 sunscreen",colours:[{name:"Cream",hex:"#e8dfc9"}],sizes:["150 ML"],badge:"SALE",rating:"4.9 (224)",description:"Broad-spectrum face protection with a light, non-greasy finish for the harsh African sun."},
  {id:25,name:"Bush Shield Body SPF 50 Lotion",gender:"Unisex",category:"Sun & Body",price:490,oldPrice:550,image:"/bushman-lotion-variants.jpg",imageAlt:"Bush Man branded body SPF 50 sunscreen lotion",colours:[{name:"Cream",hex:"#e8dfc9"}],sizes:["150 ML","350 ML"],badge:"SALE",rating:"4.9 (191)",description:"Water-resistant broad-spectrum body sunscreen lotion designed for long outdoor days."},
  {id:26,name:"Marula After-Sun Lotion",gender:"Unisex",category:"Sun & Body",price:350,oldPrice:410,image:"/bushman-lotion-variants.jpg",imageAlt:"Bush Man branded after sun lotion",colours:[{name:"Cream",hex:"#e8dfc9"}],sizes:["150 ML","350 ML"],badge:"SALE",rating:"4.8 (109)",description:"Cooling marula and aloe moisture care to soothe sun-exposed skin."},
  {id:27,name:"Field Body Towel",gender:"Unisex",category:"Sun & Body",price:590,oldPrice:690,image:"/bushman-sun-body.jpg",position:"79% 25%",imageAlt:"Bush Man branded body towels",colours:towelColours,sizes:["BODY 80 × 160 CM"],badge:"SALE",rating:"4.8 (72)",description:"Plush, absorbent cotton with an embroidered Bush Man mark."},
  {id:28,name:"Field Hand Towel",gender:"Unisex",category:"Sun & Body",price:290,oldPrice:340,image:"/bushman-sun-body.jpg",position:"70% 74%",imageAlt:"Bush Man branded hand towels",colours:towelColours,sizes:["HAND 50 × 90 CM"],badge:"SALE",rating:"4.7 (53)",description:"Soft everyday cotton hand towel in all four signature field colours."},
  {id:29,name:"Field Face Cloth",gender:"Unisex",category:"Sun & Body",price:150,oldPrice:180,image:"/bushman-sun-body.jpg",position:"58% 80%",imageAlt:"Bush Man branded face cloths",colours:towelColours,sizes:["FACE 30 × 30 CM"],badge:"SALE",rating:"4.8 (61)",description:"A gentle cotton face cloth with a subtle woven Bush Man mark."},
  {id:30,name:"Safari Bath Sponge",gender:"Unisex",category:"Sun & Body",price:120,oldPrice:150,image:"/bushman-sun-body.jpg",position:"21% 78%",imageAlt:"Bush Man bathing sponge",colours:towelColours,sizes:["ONE SIZE"],badge:"SALE",rating:"4.7 (39)",description:"A soft bathing sponge offered in brown, khaki, white and army green."},
  {id:31,name:"Acacia Body Brush",gender:"Unisex",category:"Sun & Body",price:260,oldPrice:310,image:"/bushman-sun-body.jpg",position:"89% 78%",imageAlt:"Bush Man wooden body brush",colours:towelColours,sizes:["ONE SIZE"],badge:"SALE",rating:"4.9 (47)",description:"Natural bristle body brush with a responsibly sourced wooden handle."},
];

const categories: ("All" | Category)[] = ["All","Shirts","Bottoms","Outerwear","Headwear","Footwear","Accessories","Sun & Body"];

export default function Home() {
  const [department, setDepartment] = useState<"All" | "Men" | "Women">("All");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [sort, setSort] = useState("Featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [saleOnly, setSaleOnly] = useState(false);
  const [cart, setCart] = useState<{product: Product; colour: string; size: string; material: string}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [previewColours, setPreviewColours] = useState<Record<number,string>>({});
  const [typeFilter, setTypeFilter] = useState("All");
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const kindOf = (p:Product) => {
    const n=p.name.toLowerCase();
    if(n.includes("short-sleeve")) return "Short-Sleeve Shirts";
    if(n.includes("long-sleeve")) return "Long-Sleeve Shirts";
    if(n.includes("shorts")) return "Shorts";
    if(n.includes("pants")) return "Pants";
    if(n.includes("rain jacket")) return "Rain Jackets";
    if(n.includes("raincoat")) return "Raincoats";
    if(n.includes("puffer")) return "Puffer Jackets";
    if(n.includes("field jacket")) return "Field Jackets";
    if(n.includes("beanie")) return "Beanies";
    if(n.includes("cap")) return "Caps";
    if(n.includes("hat")) return "Sun Hats";
    if(n.includes("high-cut")) return "High Boots";
    if(n.includes("low-cut")) return "Low Boots";
    if(n.includes("grasshopper")) return "Grasshoppers";
    if(n.includes("sandal")) return "Sandals";
    if(n.includes("slide")) return "Slides";
    if(n.includes("sunglasses")) return "Sunglasses";
    if(n.includes("knife")) return "Pocket Knives";
    if(n.includes("lighter")) return "Lighters";
    if(n.includes("face spf")) return "Sunscreen";
    if(n.includes("body spf")) return "Body Lotion";
    if(n.includes("after-sun")) return "After-Sun Lotion";
    if(n.includes("towel")) return "Towels";
    if(n.includes("cloth")) return "Face Cloths";
    if(n.includes("sponge")) return "Bath Sponges";
    if(n.includes("brush")) return "Body Brushes";
    return "Other";
  };

  const visible = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = products.filter(p => (department === "All" || p.gender === department || p.gender === "Unisex") && (category === "All" || p.category === category) && (typeFilter === "All" || kindOf(p) === typeFilter) && (!saleOnly || ["Sun & Body","Accessories","Headwear"].includes(p.category)) && (!query || `${p.name} ${p.category} ${p.gender} ${p.description}`.toLowerCase().includes(query)));
    return [...filtered].sort((a,b) => sort === "Price: Low to High" ? a.price-b.price : sort === "Price: High to Low" ? b.price-a.price : a.id-b.id);
  }, [department, category, typeFilter, sort, saleOnly, searchTerm]);

  const money = (n:number) => `R${n.toLocaleString("en-ZA")}`;
  const colourHex = (product:Product, name:string) => product.colours.find(c=>c.name===name)?.hex || "transparent";
  const variantStyle = (product:Product, name:string, selectedSize="") => {
    if(product.id>=1&&product.id<=4) return {backgroundImage:`url(/variants/shirt-${product.id-1}-${name==="Army Green"?1:0}.jpg)`};
    if(product.id>=5&&product.id<=8) return {backgroundImage:`url(/variants/bottom-${product.id-5}-${name==="Army Green"?1:0}.jpg)`};
    if(product.id>=13&&product.id<=15) return {backgroundImage:"url(/bushman-headwear-variants.jpg)",backgroundSize:"300% 300%",backgroundPosition:`${name==="Army Green"?"50%":name==="Brown"?"100%":"0%"} ${["0%","50%","100%"][product.id-13]}`};
    if(product.id===24) return {backgroundImage:"url(/bushman-lotion-variants.jpg)",backgroundSize:"300% 200%",backgroundPosition:"0% 0%"};
    if(product.id===25) return {backgroundImage:"url(/bushman-lotion-variants.jpg)",backgroundSize:"300% 200%",backgroundPosition:`${selectedSize==="350 ML"?"100%":"50%"} 0%`};
    if(product.id===26) return {backgroundImage:"url(/bushman-lotion-variants.jpg)",backgroundSize:"300% 200%",backgroundPosition:`${selectedSize==="350 ML"?"50%":"0%"} 100%`};
    if(product.id>=27&&product.id<=31) return {backgroundImage:"url(/bushman-bath-variants.jpg)",backgroundSize:"400% 500%",backgroundPosition:`${name==="Khaki"?"33.33%":name==="White"?"66.67%":name==="Army Green"?"100%":"0%"} ${["0%","27%","52%","77%","100%"][product.id-27]}`};
    return null;
  };
  const openProduct = (product: Product) => { setSelected(product); setColour(previewColours[product.id] || product.colours[0].name); setMaterial(product.materials?.[0] || ""); setSize(""); };
  const addToBag = () => {
    if (!selected || !size) return;
    setCart(c => [...c, {product:selected, colour, size, material}]);
    setSelected(null); setCartOpen(true);
  };
  const chooseDepartment = (value:"All"|"Men"|"Women") => { setSaleOnly(false); setTypeFilter("All"); setDepartment(value); setCategory("All"); document.getElementById("products")?.scrollIntoView(); };
  const chooseCategory = (value:"All"|Category) => { setSaleOnly(false); setTypeFilter("All"); setCategory(value); document.getElementById("products")?.scrollIntoView(); };
  const availableTypes = category === "All" ? [] : [...new Set(products.filter(p=>p.category===category).map(kindOf))];

  return <main>
    <div className="promo">FREE SA DELIVERY OVER R1 500 <span>•</span> EASY 30-DAY RETURNS <span>•</span> DESIGNED IN CAPE TOWN</div>
    <header className="storeHeader">
      <button className="mobileMenu" aria-label="Open menu">☰</button>
      <a className="logo" href="#top"><img src="/bushman-logo.png" alt="Bush Man" /><b>BUSH MAN</b></a>
      <nav className="departments" aria-label="Departments">
        <button className={department==="Women"?"active":""} onClick={()=>chooseDepartment("Women")}>WOMEN</button>
        <button className={department==="Men"?"active":""} onClick={()=>chooseDepartment("Men")}>MEN</button>
        <button onClick={()=>chooseCategory("Footwear")}>FOOTWEAR</button>
        <button onClick={()=>chooseCategory("Sun & Body")}>SUN & BODY</button>
      </nav>
      <div className="headerTools">
        <label className="search"><span>⌕</span><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder="Search safari essentials" aria-label="Search products" /></label>
        <button aria-label="Account">♙</button><button aria-label="Wishlist">♡</button>
        <button className="bagIcon" onClick={()=>setCartOpen(true)} aria-label={`Bag with ${cart.length} items`}>BAG <b>{cart.length}</b></button>
      </div>
    </header>
    <nav className="categoryBar" aria-label="Product categories">
      {categories.slice(1).map(c=><button key={c} onClick={()=>chooseCategory(c)}>{c.toUpperCase()}</button>)}
      <button className={saleOnly?"sale active":"sale"} onClick={()=>{setSaleOnly(true);setDepartment("All");setCategory("All");document.getElementById("products")?.scrollIntoView()}}>SALE</button>
    </nav>

    <section className="retailHero" id="top">
      <img src="/real-hero.jpg" alt="Bush Man modern safari fashion" />
      <div className="heroText"><span>NEW SEASON · 2026</span><h1>Modern safari.<br/>Everyday ready.</h1><p>Khaki and army green fieldwear for women and men.</p><div><button onClick={()=>chooseDepartment("Women")}>SHOP WOMEN</button><button onClick={()=>chooseDepartment("Men")}>SHOP MEN</button></div></div>
    </section>

    <section className="quickCategories">
      {[["WOMEN'S SHIRTS","/bushman-apparel.jpg","Women","Shirts"],["MEN'S SHIRTS","/bushman-apparel.jpg","Men","Shirts"],["KHAKI BOTTOMS","/bushman-apparel.jpg","All","Bottoms"],["RAIN & PUFFER JACKETS","/bushman-outerwear.jpg","All","Outerwear"],["HATS & BEANIES","/bushman-headwear.jpg","All","Headwear"],["BOOTS & SANDALS","/bushman-footwear.jpg","All","Footwear"]].map(([label,img,dept,cat])=>
        <button key={label} onClick={()=>{setSaleOnly(false);setDepartment(dept as "All"|"Men"|"Women");setCategory(cat as Category);document.getElementById("products")?.scrollIntoView()}}>
          <img src={img} alt="" /><span>{label}</span>
        </button>
      )}
    </section>

    <section className="storeEdit">
      <article className="editLead">
        <img src="/real-apparel.jpg" alt="Bush Man safari apparel collection" />
        <div><span>THE SAFARI EDIT</span><h2>Built for the wild.<br/>Refined for the city.</h2><p>Quiet utility, breathable fabrics and signature field colours designed to travel well beyond the trail.</p><button onClick={()=>chooseCategory("Shirts")}>SHOP READY-TO-WEAR</button></div>
      </article>
      <article className="editSide">
        <img src="/real-field-kit.jpg" alt="Bush Man field essentials collection" />
        <div><span>FIELD ESSENTIALS</span><h3>The considered kit</h3><p>Hard-working accessories, sun care and travel pieces for every departure.</p><button onClick={()=>chooseCategory("Accessories")}>DISCOVER THE EDIT</button></div>
      </article>
    </section>

    <section className="merchNav" aria-label="Popular ways to shop">
      <button onClick={()=>{setSaleOnly(false);setDepartment("All");setCategory("All");setTypeFilter("All");setSort("Featured");document.getElementById("products")?.scrollIntoView()}}><b>NEW ARRIVALS</b><span>Fresh field goods for 2026</span></button>
      <button onClick={()=>chooseDepartment("Women")}><b>WOMEN’S COLLECTION</b><span>Safari tailoring with an easy fit</span></button>
      <button onClick={()=>chooseDepartment("Men")}><b>MEN’S COLLECTION</b><span>Modern utility for work and travel</span></button>
      <button onClick={()=>{setSaleOnly(true);setDepartment("All");setCategory("All");setTypeFilter("All");document.getElementById("products")?.scrollIntoView()}}><b>THE SALE EDIT</b><span>Selected pieces at exceptional value</span></button>
    </section>

    <section className="catalogue" id="products">
      <div className="catalogueTop">
        <div><p>BUSH MAN / {saleOnly ? "SALE" : department.toUpperCase()}</p><h2>{searchTerm ? `Results for “${searchTerm}”` : saleOnly ? "Sale: sun, accessories & headwear" : department === "All" ? "Shop all field goods" : `${department}'s safari clothing`}</h2></div>
        <span>{visible.length} ITEMS</span>
      </div>
      <div className="shopControls">
        <div className="filterChips">{(saleOnly ? categories.filter(c=>["All","Sun & Body","Accessories","Headwear"].includes(c)) : categories).map(c=><button key={c} className={category===c?"selected":""} onClick={()=>{setTypeFilter("All");setCategory(c)}}>{c}</button>)}</div>
        <label>SORT BY <select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select></label>
      </div>
      {availableTypes.length>0&&<div className="typeFilters"><button className={typeFilter==="All"?"selected":""} onClick={()=>setTypeFilter("All")}>ALL {category.toUpperCase()}</button>{availableTypes.map(t=><button key={t} className={typeFilter===t?"selected":""} onClick={()=>setTypeFilter(t)}>{t.toUpperCase()}</button>)}</div>}
      <div className="productGrid">
        {visible.map(p=>{const previewColour=previewColours[p.id]||p.colours[0].name;return <article className="productCard" key={p.id}>
          <button className="productPhoto" onClick={()=>openProduct(p)} aria-label={`View ${p.name}`}>{variantStyle(p,previewColour)?<span className="variantProduct" role="img" aria-label={p.imageAlt} style={variantStyle(p,previewColour)!}/>:<img src={p.image} alt={p.imageAlt} style={{objectPosition:p.position}}/>}<span className="photoBrand">BUSH MAN</span>{p.badge&&<span className="badge">{p.badge}</span>}</button>
          <button className={wishlist.includes(p.id)?"heart liked":"heart"} onClick={()=>setWishlist(w=>w.includes(p.id)?w.filter(id=>id!==p.id):[...w,p.id])} aria-label={`Save ${p.name}`}>♥</button>
          <button className="quickView" onClick={()=>openProduct(p)}>QUICK VIEW</button>
          <div className="productCopy">
            <span className="gender">{p.gender.toUpperCase()} · {p.category.toUpperCase()}</span><b>{p.name}</b>
            <span className="rating">★ {p.rating}</span>
            <span className="prices"><strong>{money(p.price)}</strong>{p.oldPrice&&<del>{money(p.oldPrice)}</del>}</span>
            <span className="swatches">{p.colours.map(c=><button key={c.name} className={previewColour===c.name?"active":""} style={{background:c.hex}} title={`Preview ${c.name}`} aria-label={`Preview ${p.name} in ${c.name}`} onClick={()=>setPreviewColours(v=>({...v,[p.id]:c.name}))}/>)}</span>
            <button className="viewProduct" onClick={()=>openProduct(p)}>VIEW OPTIONS</button>
          </div>
        </article>})}
      </div>
      {visible.length===0&&<div className="noResults"><h3>No field goods found</h3><p>Try another search or browse all collections.</p><button onClick={()=>{setSearchTerm("");setCategory("All");setTypeFilter("All");setDepartment("All")}}>VIEW ALL PRODUCTS</button></div>}
    </section>

    <section className="collectionStories">
      <article><img src="/apparel-collection.png" alt="Bush Man apparel collection" /><div><span>01 / APPAREL</span><h2>The uniform of open country</h2><p>Layerable shirts, tailored bottoms and weather-ready outerwear in a disciplined natural palette.</p><button onClick={()=>chooseCategory("Shirts")}>EXPLORE APPAREL</button></div></article>
      <article><img src="/essentials-collection.png" alt="Bush Man essentials collection" /><div><span>02 / FIELD CARE</span><h2>Made for days under African sun</h2><p>Practical protection and considered body care, made to earn a permanent place in your field bag.</p><button onClick={()=>chooseCategory("Sun & Body")}>SHOP FIELD CARE</button></div></article>
    </section>

    <section className="journal">
      <div className="journalIntro"><span>FIELD NOTES</span><h2>Stories from beyond the pavement</h2><p>Dispatches on design, travel and the rituals that make time outdoors feel like home.</p><a href="#products">READ THE JOURNAL</a></div>
      <article><img src="/real-leather-sandals.jpg" alt="Leather safari sandals" /><span>CRAFT</span><h3>Why honest materials travel better</h3><p>Inside our approach to leather, canvas and pieces that gain character with every journey.</p></article>
      <article><img src="/real-sunscreen.jpg" alt="Bush Man sunscreen in the field" /><span>FIELD GUIDE</span><h3>Prepared for the African sun</h3><p>A practical guide to protection, hydration and packing light for long days outside.</p></article>
    </section>

    <section className="serviceConcierge">
      <div><span>NEED HELP?</span><h2>Bush Man client care</h2><p>From fit advice to delivery questions, our team is here to help you choose well.</p><button>CONTACT CLIENT CARE</button></div>
      <div className="serviceLinks"><a href="#"><b>DELIVERY</b><span>Complimentary over R1 500</span></a><button onClick={()=>setReturnsOpen(true)}><b>RETURNS</b><span>Easy returns within 30 days</span></button><a href="#"><b>SIZE & FIT</b><span>Find your ideal fieldwear fit</span></a><a href="#"><b>GIFTING</b><span>Thoughtful goods, ready to give</span></a></div>
    </section>

    <section className="trustRow"><button onClick={()=>setReturnsOpen(true)}>↻<b>30-DAY RETURNS</b><span>Read our clear returns promise</span></button><div>♧<b>MADE FOR AFRICA</b><span>Purposeful fabrics and finishes</span></div><div>⌂<b>DESIGNED IN CAPE TOWN</b><span>Modern South African fieldwear</span></div><div>✦<b>SECURE CHECKOUT</b><span>Safe and protected payment</span></div></section>
    <footer><div className="footerLogo"><b>BUSH MAN</b><span>MODERN AFRICAN FIELD GOODS</span></div><div><b>SHOP</b><a href="#products">Women</a><a href="#products">Men</a><a href="#products">Footwear</a><a href="#products">Field care</a></div><div><b>HELP</b><a href="#">Delivery</a><button onClick={()=>setReturnsOpen(true)}>Returns policy</button><a href="#">Size guide</a><a href="#">Contact</a></div><div className="signup"><b>GET 10% OFF YOUR FIRST ORDER</b><p>Join for launches, field notes and member offers.</p><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Email address" aria-label="Email address"/><button>JOIN</button></form></div></footer>

    {returnsOpen&&<div className="policyLayer" role="dialog" aria-modal="true" aria-label="Bush Man 30-day returns policy"><button className="modalBlank" onClick={()=>setReturnsOpen(false)} aria-label="Close returns policy"/><article className="returnsPolicy"><button className="modalClose" onClick={()=>setReturnsOpen(false)}>×</button><span>BUSH MAN CUSTOMER PROMISE</span><h2>30-Day Returns Policy</h2><p>We want every Bush Man purchase to feel right in the field and beyond. If it does not, you may request a return within 30 calendar days of delivery.</p><h3>Change-of-mind returns</h3><ul><li>Items must be unworn, unwashed, unaltered and returned with original tags, accessories and packaging.</li><li>Footwear may be tried on indoors only. Soles must be clean and unmarked.</li><li>For hygiene and safety, opened or used sunscreen, lotion, soap, towels, face cloths, sponges and body brushes cannot be returned unless faulty.</li><li>Proof of purchase and the order number are required. Promotional sets must be returned together.</li></ul><h3>How refunds and exchanges work</h3><ul><li>Contact us before sending an item. Approved returns must use a trackable service.</li><li>Change-of-mind return delivery is paid by the customer. Bush Man covers reasonable return delivery for an incorrect, damaged or defective item.</li><li>After inspection, approved refunds are sent to the original payment method within 7–10 business days. Original delivery fees are not refunded on partial or change-of-mind returns.</li><li>Exchanges depend on stock availability; otherwise we will offer a refund or store credit.</li></ul><h3>Faulty or incorrect goods</h3><p>Your statutory rights remain fully protected. Goods that are defective, unsafe or not of acceptable quality may qualify for repair, replacement or refund under South African consumer law. The 30-day goodwill period does not limit those rights.</p><div className="policyPromise"><b>Our loyalty promise</b><p>We will keep you updated, assess every return fairly and never reject a valid statutory claim because original packaging is unavailable.</p></div><small>Draft store policy · South Africa. This policy should be reviewed by the business’s legal adviser before launch.</small></article></div>}

    {selected&&<div className="modalLayer" role="dialog" aria-modal="true" aria-label={selected.name}>
      <button className="modalBlank" onClick={()=>setSelected(null)} aria-label="Close product"/>
      <div className="productModal">
        <button className="modalClose" onClick={()=>setSelected(null)} aria-label="Close">×</button>
          <div className="modalGallery"><div className="thumbs"><button>{variantStyle(selected,colour,size)?<i className="variantProduct" style={variantStyle(selected,colour,size)!}/>:<img src={selected.image} alt="" style={{objectPosition:selected.position}}/>}</button></div><div className="mainProductImage">{variantStyle(selected,colour,size)?<i className="variantProduct" role="img" aria-label={selected.imageAlt} style={variantStyle(selected,colour,size)!}/>:<img src={selected.image} alt={selected.imageAlt} style={{objectPosition:selected.position}}/>}<span>BUSH MAN · CAPE TOWN</span></div></div>
        <div className="productDetails">
          <span className="modalDept">{selected.gender} / {selected.category}</span><h2>{selected.name}</h2><p className="modalRating">★★★★★ <u>{selected.rating}</u></p>
          <div className="modalPrice">{money(selected.price)} {selected.oldPrice&&<del>{money(selected.oldPrice)}</del>}<small>VAT INCLUDED</small></div>
          <p className="description">{selected.description}</p>
          <div className="optionHead"><b>COLOUR: {colour}</b></div>
          <div className="colourOptions">{selected.colours.map(c=><button key={c.name} className={colour===c.name?"chosen":""} onClick={()=>setColour(c.name)}><i style={{background:c.hex}}/><span>{c.name}</span></button>)}</div>
          {selected.materials&&<><div className="optionHead"><b>MATERIAL: {material}</b></div><div className="materialOptions">{selected.materials.map(m=><button key={m} className={material===m?"chosen":""} onClick={()=>setMaterial(m)}>{m}</button>)}</div></>}
          <div className="optionHead"><b>SELECT SIZE</b><button>SIZE GUIDE</button></div>
          <div className="sizeOptions">{selected.sizes.map(s=><button key={s} className={size===s?"chosen":""} onClick={()=>setSize(s)}>{s}</button>)}</div>
          {!size&&<p className="sizePrompt">Please select a size</p>}
          <button className="addButton" onClick={addToBag} disabled={!size}>ADD TO BAG · {money(selected.price)}</button>
          <div className="detailNotes"><span>✓ Free delivery over R1 500</span><span>✓ 30-day returns</span><span>✓ Secure checkout</span></div>
        </div>
      </div>
    </div>}

    <button className={cartOpen?"cartShade show":"cartShade"} onClick={()=>setCartOpen(false)} aria-label="Close bag"/>
    <aside className={cartOpen?"cartDrawer open":"cartDrawer"}>
      <div className="bagHead"><h2>MY BAG <span>({cart.length})</span></h2><button onClick={()=>setCartOpen(false)}>×</button></div>
      <div className="bagItems">{cart.length===0?<div className="emptyBag"><b>Your bag is empty</b><p>Explore the latest field goods.</p><button onClick={()=>setCartOpen(false)}>CONTINUE SHOPPING</button></div>:cart.map((item,i)=><div className="bagItem" key={`${item.product.id}-${i}`}><img src={item.product.image} alt="" style={{objectPosition:item.product.position}}/><div><b>{item.product.name}</b><span>{item.colour} / {item.material&&`${item.material} / `}{item.size}</span><strong>{money(item.product.price)}</strong></div><button onClick={()=>setCart(c=>c.filter((_,index)=>index!==i))}>×</button></div>)}</div>
      {cart.length>0&&<div className="bagBottom"><div><span>SUBTOTAL</span><b>{money(cart.reduce((sum,i)=>sum+i.product.price,0))}</b></div><p>Shipping calculated at checkout</p><button>CHECKOUT SECURELY</button></div>}
    </aside>
  </main>
}
