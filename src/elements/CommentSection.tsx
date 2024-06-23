import React, { useState, useEffect } from "react";
import axios from "axios";

interface CommentSectionProps {
  movieId: number; // Define the prop type for movie ID
}

const CommentSection: React.FC<CommentSectionProps> = ({ movieId }) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserData();
    fetchCSRFToken();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Authorization token not found.");
      }

      const response = await axios.get(`${apiUrl}/user-profile/`, {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      });
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again later.");
    }
  };

  const fetchCSRFToken = async () => {
    try {
      const response = await axios.get(`${apiUrl}/csrf_token/`);
      const csrfToken = response.data.csrfToken;
      setCsrfToken(csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      setError("Failed to fetch CSRF token. Please try again later.");
    }
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handlePostReply = () => {
    setIsReplyFormVisible(!isReplyFormVisible);
  };

  const handleCancelReply = () => {
    setIsReplyFormVisible(false);
    setComment("");
    setRating(0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("Authorization token not found.");
      }

      if (!csrfToken) {
        throw new Error("CSRF token not found.");
      }

      if (!userId) {
        throw new Error("User ID not found.");
      }

      const response = await axios.post(
        `${apiUrl}/items/${movieId}/reviews/create/`,
        {
          item: movieId,
          user: userId,
          rating: rating,
          comment: comment,
          
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      console.log("Review posted successfully:", response.data);
      // Reset form
      setComment("");
      setRating(0);
      setIsReplyFormVisible(false);
    } catch (error) {
      console.error("Error posting review:", error);
      setError("Failed to post review. Please try again later.");
    }
  };

  return (
    <div className="rounded-[4px]" style={{ border: "1px solid #E9ECEF" }}>
      <div className="card-header bg-[#e9ecef] flex justify-between px-6 py-4 rounded-[2px]">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handlePostReply}
        >
          Write a review
        </button>

        <form className="flex items-center">
          <span className="mr-2 text-muted text-small whitespace-no-wrap">
            Sort by:
          </span>
          <select className="custom-select px-4 py-3 rounded-[4px]">
            <option value="alpha">Alphabetical</option>
            <option value="old-new" selected>
              Newest
            </option>
            <option value="new-old">Popular</option>
            <option value="recent">Recently Updated</option>
          </select>
        </form>
      </div>

      {isReplyFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col space-y-4 p-6">
            <textarea
              className="border border-gray-300 rounded-md p-2"
              placeholder="Write your review here..."
              value={comment}
              onChange={handleCommentChange}
              rows={4}
            ></textarea>

            <div>
              <span>Rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  } focus:outline-none`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={handleCancelReply}
              >
                Cancel
              </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
