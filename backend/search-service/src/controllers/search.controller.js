const svc = require('../services/search.service');
const kafkaProducer = require('../../shared/events/kafka-producer');

const searchCourses = async (req, res, next) => {
    try {
        const { keyword, topicId, minPrice, maxPrice, minRating, minDurationSec, maxDurationSec, sortBy, page, limit } = req.query;
        const data = await svc.searchCourses({ keyword, topicId, minPrice, maxPrice, minRating, minDurationSec, maxDurationSec, sortBy, page: +page || 1, limit: +limit || 20 });
        if (keyword && keyword.trim()) {
            kafkaProducer.publishAnalyticsEvent('search_course', {
                userId: req.user?.id || null,
                metadata: { keyword: keyword.trim() },
            }).catch(() => {});
        }
        res.json({ success: true, data });
    } catch (e) { next(e); }
};
module.exports = { searchCourses };
