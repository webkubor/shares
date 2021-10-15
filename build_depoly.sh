###
 # @Date: 2021-10-15 16:18:09
 # @LastEditTime: 2021-10-15 16:26:39
### 
# 发生任何错误时终止
set -e

#部署项目

#echo "----------pull project...----------"
git pull

#echo "----------building project...----------"
yarn build

git add -A
git commit -m $1

#echo "----------building project...----------"
git push -f https://gitee.com/web-kubor/webkubor-shares ${2:-master}


cd -