/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-14 18:05:23
 */
import {
  create,
  NButton,
  NDialog,
  NDivider,
  NIcon,
  NTag,
  NEllipsis,
  NAvatar,
  NCard,
  NLayout,
  NSwitch,
  NSkeleton,
  NGrid,
  NGridItem,
  NTimeline,
  NImage,
  NSpace,
  NImageGroup,
  NCarousel,
  NBackTop,
  NTimelineItem,
  NConfigProvider,
  NGradientText,
} from "naive-ui";

const naive = create({
  components: [
    NButton,
    NBackTop,
    NCard,
    NDialog,
    NGrid,
    NTimeline,
    NImage,
    NSpace,
    NConfigProvider,
    NGradientText,
    NImageGroup,
    NTimelineItem,
    NCarousel,
    NSwitch,
    NAvatar,
    NGridItem,
    NDivider,
    NIcon,
    NTag,
    NEllipsis,
    NLayout,
    NSkeleton,
  ],
});

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

export default function (app) {
  app.use(naive);
}
