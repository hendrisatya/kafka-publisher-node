import { publishToKafka } from '../services/kafkaService.js';

export const publishMessage = async (req, res) => {
  try {
    const { topic, payload } = req.body;

    if (!topic || !payload) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Request body must contain "topic" and "payload".'
      });
    }

    await publishToKafka(topic, payload);

    return res.status(200).json({
      success: true,
      message: `Message sent to ${topic}`,
      data: payload
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};