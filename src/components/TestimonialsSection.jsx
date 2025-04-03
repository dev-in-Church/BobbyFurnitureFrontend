import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Optional for autoplay-specific styles

// Import the necessary modules from swiper
import { Pagination, Autoplay } from "swiper";

// Now you pass the modules directly in the Swiper component
const testimonials = [
  {
    text: "Great product, really satisfied!",
    name: "John Doe",
    position: "CEO",
  },
  {
    text: "Amazing service and fast delivery.",
    name: "Jane Smith",
    position: "Manager",
  },
  // Add more testimonials here...
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">What Our Customers Say</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000, // Autoplay every 5 seconds
            disableOnInteraction: false, // Allow autoplay even after interaction
          }}
          modules={[Pagination, Autoplay]} // Pass modules here directly
          breakpoints={{
            640: {
              slidesPerView: 2, // 2 testimonials on tablet screens
            },
            1024: {
              slidesPerView: 4, // 4 testimonials on large screens
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="testimonial-card">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500">{testimonial.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
