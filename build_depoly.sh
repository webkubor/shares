###
 # @Date: 2021-10-15 16:18:09
 # @LastEditTime: 2021-10-15 16:34:38
### 
# 发生任何错误时终止
set -e

#部署项目

#echo "----------pull project...----------"
git pull

#echo "----------building project...----------"
yarn build

git add -A
git commit -m "构建生产环境打包"

#echo "----------deploy project...----------"
git push origin HEAD
#echo "----------depolying success----------"