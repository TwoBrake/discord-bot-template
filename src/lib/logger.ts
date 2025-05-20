// Resources
import chalk from "chalk";

class Logger {
  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = `${chalk.bold(chalk.white(`[${prefix}]`))}`;
  }

  /**
   * Logs a message to the console for when a successful operation needs to be logged.
   * @param msg The message to log.
   */
  success(msg: string): void {
    console.log(`${this.prefix}: ${chalk.green(msg)}`);
  }

  /**
   * Logs a message to the console for information purposes.
   * @param msg The message to log.
   */
  info(msg: string): void {
    console.log(`${this.prefix}: ${chalk.blue(msg)}`);
  }

  /**
   * Logs a message to the console for when a warning needs to be logged.
   * @param msg The message to log.
   */
  warn(msg: string): void {
    console.warn(`${this.prefix}: ${chalk.yellow(msg)}`);
  }

  /**
   * Logs a message to the console for when an error may occur.
   * @param msg The message to log.
   */
  error(msg: string | Error): void {
    if (msg instanceof Error) {
      console.error(`${this.prefix}: ${msg.stack || msg.message}`);
    } else {
      console.error(`${this.prefix}: ${chalk.red(msg)}`);
    }
  }
}

export const logger = new Logger("BOT");
