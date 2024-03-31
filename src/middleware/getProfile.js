const logger = require("../utils/logger");
const getProfile = async (req, res, next) => {
  try {
    const { Profile } = req.app.get("models");

    const profileId = parseInt(req.headers.profile_id || 0); // parse profile_id from headers

    const profile = await Profile.findOne({
      where: { id: profileId || 0 },
    });

    if (!profile) {
      logger.warn(`Profile with id ${profileId} not found`);
      return res.status(401).json({ error: "Profile not found" }).end();
    }

    req.profile = profile;
    next();
  } catch (error) {
    logger.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getProfile };
