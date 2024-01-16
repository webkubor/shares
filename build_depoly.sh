###
 # @Date: 2021-10-15 16:18:09
 # @LastEditTime: 2024-01-16 09:43:12
### 
# 发生任何错误时终止
set -e

#部署项目

#echo "----------pull project...----------"
git pull

#echo "----------building project...----------"
pnpm run  build

git add -A
git commit -m "core/build 构建生产环境打包"

#echo "----------deploy project...----------"
git push origin HEAD
#echo "----------depolying success----------"