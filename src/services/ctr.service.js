const createReadStream = require("fs").createReadStream;
const fs = require("fs/promises");
const { parse } = require("csv-parse");

const {
  LOGS_DIR_PATH,
  DATE_IN_LOG_FILE_NAME_END,
  DATE_IN_LOG_FILE_NAME_START,
} = require("../config.js");

const getCTR = async (date) => {
  const filenames = await fs.readdir(LOGS_DIR_PATH);
  let logs = [];
  for await (const filename of filenames) {
    const logDate = filename.substring(
      DATE_IN_LOG_FILE_NAME_START,
      DATE_IN_LOG_FILE_NAME_END,
    );
    if (logDate === date) {
      logs = [...logs, ...(await processLogFile(filename))];
    }
  }

  const logsByCampaign = logs.reduce((result, log) => {
    (result[log.campaign] = result[log.campaign] || []).push(log);

    return result;
  }, {});

  for (let [campaign, logs] of Object.entries(logsByCampaign)) {
    logs = logs.reduce((sessions, log) => {
      if (!sessions[log.session]) {
        sessions[log.session] = {
          views: Number(log.view),
          clicks: Number(log.ad_click),
        };
      } else if (!sessions[log.session].clicks) {
        sessions[log.session].clicks = Number(log.ad_click);
      } else if (!sessions[log.session].views) {
        sessions[log.session].views = Number(log.view);
      }

      return sessions;
    }, {});

    const campaignStats = {
      views: 0,
      clicks: 0,
    };
    for (let [_session, stats] of Object.entries(logs)) {
      campaignStats.views += stats.views;
      campaignStats.clicks += stats.clicks;
    }

    logsByCampaign[campaign] = campaignStats;
  }

  const result = [];
  for (const [campaign, log] of Object.entries(logsByCampaign)) {
    const ctr =
      log.views && log.clicks ? Number((log.clicks / log.views).toFixed(3)) : 0;
    result.push({
      campaign,
      ctr,
    });
  }

  return result;
};

const processLogFile = async (filepath) => {
  const result = [];

  const parser = createReadStream(`${LOGS_DIR_PATH}/${filepath}`).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    }),
  );

  for await (const record of parser) {
    result.push(record);
  }

  return result;
};

module.exports = {
  getCTR,
};
