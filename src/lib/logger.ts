type LogLevel = "info" | "success" | "warn" | "error";

interface LogData {
  [key: string]: any;
}

const EMOJIS = {
  info: "🔵",
  success: "✅",
  warn: "⚠️",
  error: "❌",
};

export const logger = {
  log: (
    level: LogLevel,
    event: string,
    functionName: string,
    data?: LogData
  ) => {
    const timestamp = new Date().toISOString();
    const emoji = EMOJIS[level];
    const logMessage = `${emoji} [${level.toUpperCase()}] [${timestamp}] ${event} - ${functionName}`;

    let formattedData = "";
    if (data) {
      try {
        formattedData = JSON.stringify(data, null, 2);
      } catch (err) {
        formattedData = `[Unserializable data: ${err}]`;
      }
    }

    switch (level) {
      case "info":
      case "success":
        console.log(logMessage, formattedData);
        break;
      case "warn":
        console.warn(logMessage, formattedData);
        break;
      case "error":
        console.error(logMessage, formattedData);
        break;
    }
  },

  info: (event: string, functionName: string, data?: LogData) => {
    logger.log("info", event, functionName, data);
  },

  success: (event: string, functionName: string, data?: LogData) => {
    logger.log("success", event, functionName, data);
  },

  warn: (event: string, functionName: string, data?: LogData) => {
    logger.log("warn", event, functionName, data);
  },

  error: (event: string, functionName: string, data?: LogData) => {
    logger.log("error", event, functionName, data);
  },
};
