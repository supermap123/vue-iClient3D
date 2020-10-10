#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
 echo 'support.supermap.com.cn/vue' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:supermap123/vuepress-dome.git master:gh-pages

#打包css出现版问题说明：
#guip版本过低，node太高，找到根目录下npm-shrinkwrap.json
#复制以下代码，覆盖原来的json，然后npm i，再打包css即可

    {
      "dependencies": {
        "graceful-fs": {
            "version": "4.2.2"
         }
      }
    }

cd -
