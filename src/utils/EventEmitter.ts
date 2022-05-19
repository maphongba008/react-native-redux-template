export type CallBack = (data: any) => void;

export enum EventTypes {
  REFRESH_TOKEN,
  SHOW_ALERT,
  SHOW_ACTION_SHEET,
  CHANGE_THEME,
  SHOW_HUD,
  HIDE_HUD,
}

interface Event {
  type: EventTypes;
  callback: CallBack;
}
let _registerEvents: Event[] = [];

const EventEmitter = {
  notify: (type: EventTypes, data?: any) => {
    _registerEvents
      .filter((event) => event.type === type)
      .forEach((event) => {
        event.callback(data);
      });
  },
  register: (type: EventTypes, callback: CallBack) => {
    _registerEvents.push({
      type,
      callback,
    });
  },
  unregister: (callback: CallBack) => {
    _registerEvents = _registerEvents.filter((c) => c.callback !== callback);
  },
};

export default EventEmitter;
