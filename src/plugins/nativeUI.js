/*
 * @Date: 2021-07-20 16:07:16
 * @LastEditTime: 2021-07-31 19:18:50
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
} from "naive-ui";

const naive = create({
  components: [NButton, NCard, NDialog, NGrid,
    NGridItem, NDivider, NIcon, NTag, NEllipsis, NLayout,NSkeleton],
});

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

export default function (app) {
  app.use(naive);
}
