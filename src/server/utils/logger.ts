import * as winston from "winston";

const level = process.env.LOG_LEVEL || "debug";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console({
      level,
    }),
  ],
});

export default logger;
