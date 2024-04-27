import React, { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  title: string;
  image: string;
}

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/category-list/"
        );
        // Assuming the response data is an array of category objects with 'name' and 'background_image' fields
        const fetchedCategories = response.data.map((category: any) => ({
          title: category.name,
          image: category.background_image,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 mt-6">
      <div className="flex flex-col justify-between items-center mb-12">
        <h2 className="text-[44px] font-semibold tracking-[-2px] header-text">
          Explore Categories
        </h2>
        <p className="text-lg text-center body-text">
          We are out to provide convenience and general body well being.
        </p>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 header-text">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <div
              className="bg-cover bg-center rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${category.image})`,
                height: "180px",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition duration-300 rounded-[8px] h-[180px]">
              <h2 className="text-white text-xl font-semibold tracking-[1px]">
                {category.title}
              </h2>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center items-center mt-6">
        <button
          type="button"
          className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View All
          <svg
            className="w-4 h-4 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
