/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-10-14 15:49:39
 */
import {
  create,
  NButton,
  NDialog,
  NDivider,
  NIcon,
  NTag,
  NEllipsis,
  NCard,
  NLayout,
  NSkeleton,
  NGrid,
  NGridItem,
  NTimeline,
  NImage,
  NSpace,
  NImageGroup,
  NCarousel,
  NTimelineItem
} from "naive-ui";

const naive = create({
  components: [NButton, NCard, NDialog, NGrid, NTimeline, NImage,NSpace,
    NImageGroup,
    NTimelineItem,
    NCarousel,
    NGridItem, NDivider, NIcon, NTag, NEllipsis, NLayout,NSkeleton],
});

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

export default function (app) {
  app.use(naive);
}
