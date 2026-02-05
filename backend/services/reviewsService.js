const Review = require("../models/Review");

module.exports = {
  async createReview(payload) {},

  async getReviews(params) {},

  async getReviewById(id) {},

  async updateReview(id, payload) {
    
  },

  async deleteReview(id) {
    return await Review.findByIdAndDelete();
  },
};
