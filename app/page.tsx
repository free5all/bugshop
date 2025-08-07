import SignInButton from "@/lib/components/SignInButton";
import { Bug, User, Heart, ShoppingCart, Search, Home, Leaf, Droplets, Thermometer, Package, ChevronRight, Shield, Truck, Users, Award, BadgeCheck, Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import UserButton from "@/lib/components/UserButton";
import Header from "@/lib/components/Header";
import { auth } from "@/auth";

const SiteName = "ArthropodShop"

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-green-50">
      <Header>
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm pl-10 pr-2 py-2 w-full border-green-200 focus:border-green-400 focus:ring-green-400" type="search" placeholder="Search for bugs, supplies, and more..." />
            {/* <button className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md font-medium transition-all outline-none text-primary-foreground shadow-xs h-9 py-2 absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-sm px-3 cursor-pointer">
              Search
            </button> */}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {!session && <SignInButton />}
          <button className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-green-700 hidden sm:flex hover:text-green-800 hover:bg-accent cursor-pointer">
            <Heart className="h-4 w-4 mr-1" />
            <span className="hidden lg:inline">Wishlist</span>
          </button>
          <Link href="/cart" className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-8 rounded-md gap-1.5 px-3 text-primary-foreground hidden sm:flex hover:bg-green-700 bg-green-600 cursor-pointer">
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span className="hidden lg:inline">Cart (0)</span>
          </Link>
          {session && session.user && (
            <UserButton user={session.user} />
          )}
        </div>
      </Header>

      <nav className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4 sm:space-x-8 overflow-x-auto flex-1">
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Bug className="h-4 w-4" />
                <span className="text-sm font-medium">Live Insects</span>
              </Link>
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Enclosures</span>
              </Link  >
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-medium">Substrate &amp; Décor</span>
              </Link >
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Droplets className="h-4 w-4" />
                <span className="text-sm font-medium">Food &amp; Nutrition</span>
              </Link >
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Thermometer className="h-4 w-4" />
                <span className="text-sm font-medium">Climate Control</span>
              </Link >
              <Link href="" className="flex items-center space-x-1 hover:text-green-200 transition-colors whitespace-nowrap">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Supplies</span>
              </Link >
            </div>
            <Link href="/storefronts/create" className="items-center justify-center text-sm font-medium transition-all shrink-0 outline-none h-8 rounded-md gap-1 5 px-3 text-green-200 hover:text-white hover:bg-green-600 ml-4 whitespace-nowrap hidden sm:flex cursor-pointer">
              Become a Seller
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
                Connect with Expert Breeders &amp; Suppliers
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Discover rare arthropods, custom enclosures, and premium supplies from trusted community members who share your passion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-10 rounded-md gap-2 px-4 text-green-800 hidden sm:flex hover:bg-green-50 bg-white cursor-pointer">
                  <span className="hidden lg:inline">Start Shopping</span>
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
                <button className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all h-10 rounded-md gap-2 px-6 text-primary-foreground hover:text-green-800 hidden sm:flex hover:bg-green-50 bg-transparent cursor-pointer">
                  <span className="hidden lg:inline">Join Our Community</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <img alt="Beautiful terrarium setup" loading="lazy" width="600" height="400" decoding="async" data-nimg="1" className="rounded-lg shadow-2xl" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/exotic-terrarium-EeosPcntH8ULiYbUl3srwPOjqR4XWy.png" style={{ color: 'transparent' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Verified Sellers</h3>
              <p className="text-sm text-gray-600">All breeders are vetted and verified</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Safe Shipping</h3>
              <p className="text-sm text-gray-600">Live arrival guarantee on all orders</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Expert Community</h3>
              <p className="text-sm text-gray-600">Connect with experienced keepers</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">Premium products and livestock</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Sellers</h2>
            <p className="text-lg text-gray-600">Discover trusted breeders and suppliers in our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="grid auto-rows-min items-start gap-1 5 px-6 text-center grid-rows-[auto_auto]">
                <div className="relative mx-auto mb-4">
                  <img alt="Seller profile" loading="lazy" width="80" height="80" decoding="async" data-nimg="1" className="rounded-full" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/breeder-profile-2ScfQbN47YmePRMG5MQR8291slLVDS.png" style={{ color: 'transparent' }} />
                  <BadgeCheck className="absolute -bottom-1 -right-1 h-6 w-6 text-green-600 bg-white rounded-full p-1" />
                </div>
                <div className="font-bold text-lg">Arachnid Artisans</div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">(247 reviews)</span>
                </div>
              </div>
              <div className="px-6 flex-grow">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Specializing in rare tarantulas and custom acrylic enclosures. 15+ years of breeding experience.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>California, USA</span>
                </div>
              </div>
              <div className="flex items-center px-6">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">Visit Store</button>
              </div>
            </div>
            <div className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="grid auto-rows-min items-start gap-1 5 px-6 text-center grid-rows-[auto_auto]">
                <div className="relative mx-auto mb-4">
                  <img alt="Seller profile" loading="lazy" width="80" height="80" decoding="async" data-nimg="1" className="rounded-full" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/breeder-profile-2ScfQbN47YmePRMG5MQR8291slLVDS.png" style={{ color: 'transparent' }} />
                  <BadgeCheck className="absolute -bottom-1 -right-1 h-6 w-6 text-green-600 bg-white rounded-full p-1" />
                </div>
                <div className="font-bold text-lg">Mantis Manor</div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">(189 reviews)</span>
                </div>
              </div>
              <div className="px-6 flex-grow">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Premium mantis species and handcrafted naturalistic habitats. Sustainable breeding practices.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Florida, USA</span>
                </div>
              </div>
              <div className="flex items-center px-6">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">Visit Store</button>
              </div>
            </div>
            <div className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="grid auto-rows-min items-start gap-1 5 px-6 text-center grid-rows-[auto_auto]">
                <div className="relative mx-auto mb-4">
                  <img alt="Seller profile" loading="lazy" width="80" height="80" decoding="async" data-nimg="1" className="rounded-full" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/breeder-profile-2ScfQbN47YmePRMG5MQR8291slLVDS.png" style={{ color: 'transparent' }} />
                  <BadgeCheck className="absolute -bottom-1 -right-1 h-6 w-6 text-green-600 bg-white rounded-full p-1" />
                </div>
                <div className="font-bold text-lg">Beetle Boutique</div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-gray-300" />
                  <span className="text-sm text-gray-600 ml-1">(156 reviews)</span>
                </div>
              </div>
              <div className="px-6 flex-grow">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Exotic beetles and premium substrate mixes. Organic leaf litter and natural décor specialists.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Oregon, USA</span>
                </div>
              </div>
              <div className="flex items-center px-6">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">Visit Store</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Enclosures ,_ amber
Handcrafted terrariums and display cases

1,934 listings
Natural Substrate ,_green agian
Premium leaf litter, moss, and soil mixes

892 listings
Feeder Insects ,_ blue
Live and frozen food options

567 listings */}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
            <p className="text-lg text-gray-600">Everything you need for your arthropod companions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-50/50 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group hover:shadow-lg transition-all cursor-pointer border-green-100 hover:border-green-300">
              <div className="p-6 text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Bug className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Arthropods</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">Rare and common species from trusted breeders</p>
                <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-green-100 text-green-800">2,847 listings</span>
              </div>
            </div>
            <div className="bg-amber-50/50 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group hover:shadow-lg transition-all cursor-pointer border-amber-100 hover:border-amber-300">
              <div className="p-6 text-center">
                <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <Home className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Custom Enclosures</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">Handcrafted terrariums and display cases</p>
                <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-amber-100 text-amber-800">1,934 listings</span>
              </div>
            </div>
            <div className="bg-green-50/50 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group hover:shadow-lg transition-all cursor-pointer border-green-100 hover:border-green-300">
              <div className="p-6 text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Natural Substrate</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">Premium leaf litter, moss, and soil mixes</p>
                <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-green-100 text-green-800">892 listings</span>
              </div>
            </div>
            <div className="bg-blue-50/50 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm group hover:shadow-lg transition-all cursor-pointer border-blue-100 hover:border-blue-300">
              <div className="p-6 text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Feeder Insects</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">Live and frozen food options</p>
                <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 bg-blue-100 text-blue-800">567 listings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 flex-col md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Listed</h2>
              <p className="text-lg text-gray-600">Fresh arrivals from our community</p>
            </div>
            <button className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors bg-white border border-green-200 rounded-md px-4 py-2 flex items-center hover:bg-green-50 mt-4 md:mt-0">
              View All Listings
              <ChevronRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card text-card-foreground rounded-xl border shadow-sm group flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="relative">
                <img alt="Custom Acrylic Terrarium 20x12x12" loading="lazy" width="300" height="200" decoding="async" data-nimg="1" className="w-full h-48 object-cover rounded-t-lg" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-geometric-shapes-sUE5R8SURiS0JAVLKZSgt58oSNZSJI.png" style={{ color: 'transparent' }} />
                <button className="absolute top-4 right-4 bg-white opacity-65 text-primary rounded-lg p-2.5 shadow hover:bg-green-50 transition-all hover:opacity-100 cursor-pointer">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-grow p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-green-700">Custom Acrylic Terrarium 20x12x12</h3>
                <p className="text-2xl font-extrabold text-green-600 mb-2">$189.99</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>by Habitat Crafters</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
              </div>
              <div className="flex items-center p-4 pt-8">
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-xl border shadow-sm group flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="relative">
                <img alt="Chilean Rose Hair Tarantula" loading="lazy" width="300" height="200" decoding="async" data-nimg="1" className="w-full h-48 object-cover rounded-t-lg" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-geometric-shapes-sUE5R8SURiS0JAVLKZSgt58oSNZSJI.png" style={{ color: 'transparent' }} />
                <button className="absolute top-4 right-4 bg-white opacity-65 text-primary rounded-lg p-2.5 shadow hover:bg-green-50 transition-all hover:opacity-100 cursor-pointer">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-grow p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-green-700">Chilean Rose Hair Tarantula</h3>
                <p className="text-2xl font-extrabold text-green-600 mb-2">$45.00</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>by Arachnid Artisans</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
              </div>
              <div className="flex items-center p-4 pt-8">
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="bg-card text-card-foreground rounded-xl border shadow-sm group flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="relative">
                <img alt="Premium Oak Leaf Litter (5lbs)" loading="lazy" width="300" height="200" decoding="async" data-nimg="1" className="w-full h-48 object-cover rounded-t-lg" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-geometric-shapes-sUE5R8SURiS0JAVLKZSgt58oSNZSJI.png" style={{ color: 'transparent' }} />
                <button className="absolute top-4 right-4 bg-white opacity-65 text-primary rounded-lg p-2.5 shadow hover:bg-green-50 transition-all hover:opacity-100 cursor-pointer">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-grow p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-green-700">Premium Oak Leaf Litter (5lbs)</h3>
                <p className="text-2xl font-extrabold text-green-600 mb-2">$24.99</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>by Beetle Boutique</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
              </div>
              <div className="flex items-center p-4 pt-8">
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="bg-card text-card-foreground rounded-xl border shadow-sm group flex flex-col h-full hover:shadow-lg transition-shadow border-green-100">
              <div className="relative">
                <img alt="Premium Oak Leaf Litter (5lbs)" loading="lazy" width="300" height="200" decoding="async" data-nimg="1" className="w-full h-48 object-cover rounded-t-lg" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-geometric-shapes-sUE5R8SURiS0JAVLKZSgt58oSNZSJI.png" style={{ color: 'transparent' }} />
                <button className="absolute top-4 right-4 bg-white opacity-65 text-primary rounded-lg p-2.5 shadow hover:bg-green-50 transition-all hover:opacity-100 cursor-pointer">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-grow p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-green-700">Ghost Mantis Nymph L3</h3>
                <p className="text-2xl font-extrabold text-green-600 mb-2">$32.00</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>by Mantis Manor</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-gray-300" />
                  <span className="text-xs text-gray-500 ml-1">(24)</span>
                </div>
              </div>
              <div className="flex items-center p-4 pt-8">
                <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-9 px-4 py-2 w-full bg-green-600 hover:bg-green-700 outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Join Our Community</h2>
            <p className="text-lg">Connect with fellow enthusiasts, share knowledge, and grow together</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-700 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Forums</h3>
              <p className="text-green-100">Get advice from experienced keepers and breeders</p>
            </div>
            <div className="text-center">
              <div className="bg-green-700 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Care Guides</h3>
              <p className="text-green-100">Comprehensive guides for every species and setup</p>
            </div>
            <div className="text-center">
              <div className="bg-green-700 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Breeder Network</h3>
              <p className="text-green-100">Connect directly with verified breeders worldwide</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs h-10 px-6 py-2 bg-green-600 hover:bg-green-700 cursor-pointer">
              Join Community
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link className="flex items-center space-x-2 mb-4" href="/">
                <div className="bg-green-600 p-2 rounded-lg">
                  <span className="text-white font-semibold">
                    <Bug className="h-6 w-6 text-white" />
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-bold">{SiteName}</span>
              </Link >
              <p className="text-gray-400">
                Connecting arthropod enthusiasts with trusted breeders and suppliers worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="" className="hover:text-white transition-colors">Live Insects</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Enclosures</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Supplies</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Food</Link >
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="" className="hover:text-white transition-colors">Help Center</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Shipping Info</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Returns</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Contact Us</Link >
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="" className="hover:text-white transition-colors">Forums</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Care Guides</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Seller Program</Link >
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">Blog</Link >
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} {SiteName}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="" className="text-gray-400 hover:text-white transition-colors">Privacy</Link >
              <Link href="" className="text-gray-400 hover:text-white transition-colors">Terms</Link >
              <Link href="" className="text-gray-400 hover:text-white transition-colors">Cookies</Link >
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
