// Resources
import { Event } from "../../lib/interfaces";
import { logger } from "../../lib/logger";
import { fetchFiles } from "../../lib/utils";
import { client } from "../..";

export default class Events {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  public load(): void {
    fetchFiles(this.path).then((events) => {
      logger.info(`Began refreshing ${events.length} event(s).`);
      events = events as Event[];
      events.forEach((event) => {
        if (event.once) {
          client.once(event.event, (...args) => event.execute(...args));
        } else {
          client.on(event.event, (...args) => event.execute(...args));
        }
      });
      logger.info(`Finished refreshing ${events.length} event(s).`);
    });
  }
}
