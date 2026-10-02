// Pricing.jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto py-10">
  
  {/* Starter */}
  <div className="border rounded-2xl p-6">
    <h3 className="font-bold text-xl">Starter</h3>
    <p className="text-3xl font-black mt-3">Rs 25,000</p>
    <p className="text-sm text-gray-500">Small shops ke liye</p>
    <ul className="mt-4 text-sm space-y-2">
      <li>✓ 1 Page Website</li>
      <li>✓ Mobile Friendly</li>
      <li>✓ WhatsApp Button</li>
    </ul>
    <button className="w-full mt-6 bg-black text-white py-2 rounded-xl">Start Now</button>
  </div>

  {/* Pro - Most Popular */}
  <div className="border-2 border-black rounded-2xl p-6 relative scale-105">
    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
    <h3 className="font-bold text-xl">Pro Business</h3>
    <p className="text-3xl font-black mt-3">Rs 45,000</p>
    <p className="text-sm text-gray-500">DHA / Gulberg businesses</p>
    <ul className="mt-4 text-sm space-y-2">
      <li>✓ 5 Pages Website</li>
      <li>✓ Booking + WhatsApp System</li>
      <li>✓ Google pe Listing</li>
      <li>✓ 1 Month Support</li>
    </ul>
    <button className="w-full mt-6 bg-black text-white py-2 rounded-xl">Get Pro</button>
  </div>

  {/* Premium */}
  <div className="border rounded-2xl p-6">
    <h3 className="font-bold text-xl">Premium</h3>
    <p className="text-3xl font-black mt-3">Rs 75,000</p>
    <p className="text-sm text-gray-500">Full Business Solution</p>
    <ul className="mt-4 text-sm space-y-2">
      <li>✓ Everything in Pro</li>
      <li>✓ Admin Panel - khud edit karo</li>
      <li>✓ Payment / Ordering System</li>
    </ul>
    <button className="w-full mt-6 bg-black text-white py-2 rounded-xl">Go Premium</button>
  </div>

</div>
