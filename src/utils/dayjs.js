/*
 * @Date: 2021-10-13 15:09:32
 * @LastEditTime: 2021-10-13 15:14:33
 */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
// var config = {
//   thresholds: [
//     { l: "s", r: 1 },
//     { l: "m", r: 1 },
//     { l: "mm", r: 59, d: "minute" },
//     { l: "h", r: 1 },
//     { l: "hh", r: 23, d: "hour" },
//     { l: "d", r: 1 },
//     { l: "dd", r: 29, d: "day" },
//     { l: "M", r: 1 },
//     { l: "MM", r: 11, d: "month" },
//     { l: "y" },
//     { l: "yy", d: "year" }
//   ]
// };
// dayjs.extend(relativeTime, config);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years"
  }
});
export default dayjs;
