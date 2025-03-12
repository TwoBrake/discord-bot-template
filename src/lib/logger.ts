// Resources
import chalk from "chalk";

class log {
  /**
   * Logs a message to the console for information purposes.
   * @param msg The message to log.
   */
  info(msg: string): void {
    console.log(`[INFO]: ${chalk.blue(msg)}`);
  }

  /**
   * Logs a message to the console for when a warning needs to be logged.
   * @param msg The message to log.
   */
  warn(msg: string): void {
    console.warn(`[WARN]: ${chalk.yellow(msg)}`);
  }

  /**
   * Logs a message to the console for when an error may occur.
   * @param msg The message to log.
   */
  error(msg: string): void {
    console.error(`[ERROR]: ${chalk.red(msg)}`);
  }
}

export const logger = new log();
