const createReadStream = require("fs").createReadStream;
const fs = require("fs/promises");
const { DateTime, Interval } = require("luxon");
const { parse } = require("csv-parse");

const {
  LOGS_DIR_PATH,
  DATE_IN_LOG_FILE_NAME_END,
  DATE_IN_LOG_FILE_NAME_START,
} = require("../config.js");
const { days } = require("../utils/date.js");

const getStats = async (to, from) => {
  from = DateTime.fromISO(from);
  to = DateTime.fromISO(to);
  const interval = Interval.fromDateTimes(from, to.plus({ days: 1 }));
  const result = [];
  generateEmptyStatsObjects(interval, result);

  const filenames = await fs.readdir(LOGS_DIR_PATH);
  for (const day of result) {
    const { date } = day;

    for (const filename of filenames) {
      const logDate = filename.substring(
        DATE_IN_LOG_FILE_NAME_START,
        DATE_IN_LOG_FILE_NAME_END,
      );
      if (logDate === date) {
        const dayStats = await processLogFile(filename);
        day.clicks += dayStats.clicks;
        day.views += dayStats.views;
        day.uniqueSessions += dayStats.uniqueSessions;
      }
    }

    return result;
  }
};

const generateEmptyStatsObjects = (interval, result) => {
  for (const day of days(interval)) {
    result.push({
      date: day.toISODate(),
      clicks: 0,
      views: 0,
      uniqueSessions: 0,
    });
  }
};

const processLogFile = async (filepath) => {
  const result = {
    clicks: 0,
    views: 0,
    uniqueSessions: new Set(),
  };

  const parser = createReadStream(`${LOGS_DIR_PATH}/${filepath}`).pipe(
    parse({
      from: 2,
      skip_empty_lines: true,
    }),
  );

  for await (const record of parser) {
    result.clicks += Number(record[5]);
    result.views += Number(record[3]);
    result.uniqueSessions.add(record[2]);
  }
  result.uniqueSessions = result.uniqueSessions.size;

  return result;
};

module.exports = {
  getStats,
};
