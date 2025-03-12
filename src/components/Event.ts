// Resources
import { Events } from "discord.js";

// Interfaces
interface EventProps {
  event: Events;
  once: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (...args: any[]) => void | Promise<void>;
}

/**
 * Creates an event instance.
 */
export default class Event {
  public readonly event: Events;
  public readonly once: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly execute: (...args: any[]) => void | Promise<void>;

  /**
   * @param props The properties of the event.
   */
  constructor(props: EventProps) {
    this.event = props.event;
    this.once = props.once;
    this.execute = props.execute;
  }
}
