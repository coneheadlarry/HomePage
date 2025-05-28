// src/app/HomePage/widgets/index.ts
import ClientSysInfoWidget from "./sysInfo/page";
import WeatherWidget from "./weather/page";
export const widgetMap = {
  sysInfo: ClientSysInfoWidget,
  weather: WeatherWidget,
};
