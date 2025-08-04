import React, { useState } from 'react';
import { ShoppingCart, Gift, Sparkles, Star } from 'lucide-react';
import actionCarLogo from '../assets/images/action car logo.png';
import Footer from '../components/Footer';

const GiftCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const amounts = [25, 50, 100, 200, 500];

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      type: 'gift_card',
      amount: selectedAmount,
      quantity: quantity,
      total: selectedAmount * quantity
    };
    console.log('Added to cart:', cartItem);
    // Here you would typically dispatch to your cart state or call an API
    alert(`Added ${quantity}x $${selectedAmount} Gift Card(s) to cart!`);
  };

  const totalPrice = selectedAmount * quantity;

  return (
    <div className="min-h-screen bg-snow">
      {/* Main Content Container */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 lg:py-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          {/* Main Gift Card Container */}
          <div 
            className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 ${
              isHovered ? 'scale-102 sm:scale-105 shadow-2xl' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 opacity-5"></div>
            <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-bl from-sky-200 to-transparent rounded-full -translate-y-16 sm:-translate-y-24 md:-translate-y-32 translate-x-16 sm:translate-x-24 md:translate-x-32 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-gradient-to-tr from-sky-100 to-transparent rounded-full translate-y-12 sm:translate-y-18 md:translate-y-24 -translate-x-12 sm:-translate-x-18 md:-translate-x-24 opacity-30"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Left Side - Gift Card Visual - Hidden on mobile, shown on larger screens */}
              <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
                {/* Floating Sparkles */}
                <div className="relative">
                  <Sparkles className="absolute -top-4 -left-4 text-sky-400 w-6 h-6 animate-pulse" />
                  <Sparkles className="absolute -bottom-2 -right-2 text-sky-300 w-4 h-4 animate-pulse delay-300" />
                  
                  {/* Gift Card Design */}
                  <div className="relative w-56 h-36 bg-white rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-sky-200">
                    <div className="absolute inset-2 bg-white rounded-xl border border-gray-100">
                      <div className="p-3 h-full flex flex-col justify-between">
                        {/* Logo */}
                        <div className="flex justify-center">
                          <img 
                            src={actionCarLogo} 
                            alt="Action Car Logo" 
                            className="h-8 w-auto"
                          />
                        </div>
                        
                        {/* Gift Card Text */}
                        <div className="text-center">
                          <h3 className="text-sky-400 text-lg font-bold mb-1">GIFT CARD</h3>
                          <div className="text-sky-500 text-base font-semibold">
                            ${selectedAmount}.00
                          </div>
                        </div>
                        
                        {/* Decorative Pattern */}
                        <div className="flex justify-center space-x-1">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-2 h-2 text-sky-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gift Icon */}
                <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-3 rounded-full">
                  <Gift className="w-6 h-6 text-sky-600" />
                </div>
              </div>

              {/* Right Side - Controls (Full width on mobile, half width on desktop) */}
              <div className="space-y-6 sm:space-y-8 lg:space-y-6 w-full">
                {/* Mobile Gift Card Visual - Only shown on mobile/tablet */}
                <div className="flex lg:hidden flex-col items-center justify-center space-y-2 mb-3">
                  <div className="relative">
                    <Sparkles className="absolute -top-2 -left-2 text-sky-400 w-3 h-3 animate-pulse" />
                    <Sparkles className="absolute -bottom-1 -right-1 text-sky-300 w-2 h-2 animate-pulse delay-300" />
                    
                    {/* Mobile Gift Card Design */}
                    <div className="relative w-28 sm:w-32 h-18 sm:h-20 bg-white rounded-md sm:rounded-lg shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-sky-200">
                      <div className="absolute inset-1 bg-white rounded-sm sm:rounded-md border border-gray-100">
                        <div className="p-1 sm:p-1.5 h-full flex flex-col justify-between">
                          {/* Logo */}
                          <div className="flex justify-center">
                            <img 
                              src={actionCarLogo} 
                              alt="Action Car Logo" 
                              className="h-2.5 sm:h-3 w-auto"
                            />
                          </div>
                          
                          {/* Gift Card Text */}
                          <div className="text-center">
                            <h3 className="text-sky-400 text-[10px] sm:text-xs font-bold mb-0.5">GIFT CARD</h3>
                            <div className="text-sky-500 text-[10px] sm:text-xs font-semibold">
                              ${selectedAmount}.00
                            </div>
                          </div>
                          
                          {/* Decorative Pattern */}
                          <div className="flex justify-center space-x-0.5">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-0.5 sm:w-1 h-0.5 sm:h-1 text-sky-500 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Gift Icon */}
                  <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-1.5 rounded-full">
                    <Gift className="w-3 sm:w-4 h-3 sm:h-4 text-sky-600" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                    Perfect Gift Card
                  </h1>
                  <p className="text-sky-500 text-base sm:text-lg md:text-xl lg:text-base xl:text-lg leading-relaxed">
                    Give the gift of choice with our premium gift cards. Perfect for any occasion and redeemable across all our services.
                  </p>
                </div>

                {/* Amount Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-sky-500">Select Amount</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`relative p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                          selectedAmount === amount
                            ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-sky-500 hover:bg-sky-50 hover:scale-105'
                        }`}
                      >
                        ${amount}
                        {selectedAmount === amount && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <Star className="w-2 h-2 text-sky-600 fill-current" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-semibold text-sky-500">Quantity</h3>
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      disabled={quantity <= 1}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 hover:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl transition-colors duration-200"
                    >
                      -
                    </button>
                    <div className="bg-sky-50 px-6 py-3 sm:px-8 sm:py-4 rounded-xl">
                      <span className="text-xl sm:text-2xl font-semibold text-sky-600">
                        {quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 hover:bg-sky-100 flex items-center justify-center font-bold text-xl transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gradient-to-r from-sky-50 to-white p-4 sm:p-6 rounded-2xl border border-sky-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl text-sky-500">Total Price:</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                      ${totalPrice}.00
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-4 sm:py-5 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6" />
                  <span className="text-lg sm:text-xl">Add to Cart</span>
                </button>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                  <div className="flex items-center space-x-3 text-sky-500 text-sm sm:text-base">
                    <div className="w-3 h-3 bg-sky-500 rounded-full flex-shrink-0"></div>
                    <span>No Expiration Date</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sky-500 text-sm sm:text-base">
                    <div className="w-3 h-3 bg-sky-400 rounded-full flex-shrink-0"></div>
                    <span>Instant Delivery</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sky-500 text-sm sm:text-base">
                    <div className="w-3 h-3 bg-sky-600 rounded-full flex-shrink-0"></div>
                    <span>Easy to Redeem</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sky-500 text-sm sm:text-base">
                    <div className="w-3 h-3 bg-sky-300 rounded-full flex-shrink-0"></div>
                    <span>Perfect for Gifting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GiftCard;