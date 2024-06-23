import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../elements/Header";
import CommentSection from "../elements/CommentSection";
import StarRating from "../components/StarRating";
import axios from "axios";
import Footer from "../elements/Footer";
import { format } from "date-fns";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  useEffect(() => {
    const fetchItemAndReviews = async () => {
      try {
        const [itemResponse, reviewsResponse] = await Promise.all([
          axios.get(`${apiUrl}/items/${id}/`),
          axios.get(`${apiUrl}/items/${id}/reviews/`),
        ]);
        setMovie(itemResponse.data);
        setReviews(reviewsResponse.data);

        // Fetch category title
        const categoryId = itemResponse.data.category;
        const categoryResponse = await axios.get(`${apiUrl}/category-list/${categoryId}/`);
        setCategoryTitle(categoryResponse.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItemAndReviews();
  }, [id]);

  // Calculate total number of reviews
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

  useEffect(() => {
    if (!movie) return; // Return early if movie data is not available yet

    const carousel = document.getElementById("default-carousel");
    const items = carousel?.querySelectorAll("[data-carousel-item]");
    const indicators = carousel?.querySelectorAll("[data-carousel-slide-to]");
    const prevButton = carousel?.querySelector("[data-carousel-prev]");
    const nextButton = carousel?.querySelector("[data-carousel-next]");

    let currentIndex = 0;

    const showItem = (index: number) => {
      items?.forEach((item, i) => {
        if (i === index) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });

      indicators?.forEach((indicator, i) => {
        if (i === index) {
          indicator.setAttribute("aria-current", "true");
        } else {
          indicator.setAttribute("aria-current", "false");
        }
      });
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % (items?.length || 0);
      showItem(currentIndex);
    };

    const showPrev = () => {
      currentIndex =
        (currentIndex - 1 + (items?.length || 0)) % (items?.length || 0);
      showItem(currentIndex);
    };

    showItem(currentIndex);

    prevButton?.addEventListener("click", showPrev);
    nextButton?.addEventListener("click", showNext);

    return () => {
      prevButton?.removeEventListener("click", showPrev);
      nextButton?.removeEventListener("click", showNext);
    };
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="body-text">
      <Header />

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 mt-[120px]">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {categoryTitle}
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  {movie.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="my-6">
          <h2 className="header-text text-[40px]">{movie.title}</h2>
          <p
            className="text-gray-500 text-[14px]"
            style={{
              letterSpacing: "1px",
            }}
          >
            Release Date: {movie.release_date}
          </p>
          <div className="flex items-center mt-2">
            <StarRating rating={averageRating || 0} />
            <p className="text-gray-500 text-[14px] font-semibold px-2">
              {averageRating.toFixed(1)} out of 5 ({totalReviews}{" "}
              {totalReviews === 1 ? "review" : "reviews"})
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:max-w-[800px]">
            <div
              id="default-carousel"
              className="relative w-full mb-12"
              data-carousel="slide"
            >
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <img
                    src={movie.image}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
                {/* <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <img
                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div> */}
                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <iframe
                    className="w-full h-[400px] max-w-full"
                    src={`https://www.youtube.com/embed/${movie.youtube_link}?rel=0`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="true"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 4"
                  data-carousel-slide-to="3"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 5"
                  data-carousel-slide-to="4"
                ></button>
              </div>
              <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
            <div>
              <p>{movie.description}</p>
            </div>
            <div
              className="my-12 p-12 rounded-[8px]"
              style={{ border: "1px solid #E9ECEF" }}
            >
              <div className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  out of
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5
                </p>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1,745 global ratings
              </p>
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  5 star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  70%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  4 star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: "17%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  17%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  3 star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: "8%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  2 star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: "4%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  4%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  1 star
                </a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-300 rounded"
                    style={{ width: "1%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  1%
                </span>
              </div>
            </div>
            <div className="card">
              <CommentSection movieId={movie.id} />
              <ul className="list-group list-group-flush list-group-comments mt-12">
                {reviews.map((review, index) => (
                  <li key={index} className="list-group-item py-4">
                    <article>
                      <div className="flex items-center mb-4">
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src={`http://127.0.0.1:8000/${review.profile_picture}`}
                          alt=""
                        />
                        <div className="font-medium dark:text-white">
                          <p>
                            {review.username}{" "}
                            <time
                              dateTime="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Experienced on August 3, 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 space-x-2 rtl:space-x-reverse">
                        <StarRating rating={review.rating} />
                        <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
                        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                          {formatDate(review.created_at)}
                        </h3>
                      </div>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {review.comment}
                      </p>
                      <aside>
                        <div className="flex items-center mt-3">
                          <a
                            href="#"
                            className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                    <hr className="mt-8" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full md:max-w-[400px] gap-8">
            <div className="bg-[#E9ECEF] p-6 rounded-[4px]">
              <a href="#" className="block card-body">
                <div className="flex justify-between mb-3">
                  <img
                    src="https://wingman.mediumra.re/assets/img/logo-w-gradient.svg"
                    alt="Image"
                  />
                  <span className="title-decorative">Sponsor</span>
                </div>
                <span className="text-md text-semibold">
                  A robust suite of styled elements and pages for Bootstrap 4
                </span>
              </a>
            </div>
            <div className="bg-white shadow-md rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-lg font-semibold">Contributors</span>
                </div>
                <a href="#" className="text-blue-600">
                  View all ›
                </a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="assets/img/avatar-male-1.jpg"
                    alt="Image"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="text-lg font-semibold">
                      Daniel Cameron
                    </span>
                    <span className="text-gray-500">Product Designer</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="assets/img/avatar-female-1.jpg"
                    alt="Image"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="text-lg font-semibold">Caitlyn Halsy</span>
                    <span className="text-gray-500">
                      Marketing Professional
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="assets/img/avatar-male-2.jpg"
                    alt="Image"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="text-lg font-semibold">Toby Marsh</span>
                    <span className="text-gray-500">Developer</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="assets/img/avatar-female-2.jpg"
                    alt="Image"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="text-lg font-semibold">
                      Lucille Freebody
                    </span>
                    <span className="text-gray-500">Graphic Designer</span>
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

export default Detail;
