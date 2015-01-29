#!/bin/bash
mv dj_pro/dj_pro/media /root/
mv build /root/ 
mv include /root/
mv local   /root/ 
mv lib   /root/
git add .
if [ -z "$1" ]; then
    echo 'usage: git commit ....'
    exit 1
fi
git commit -m "$1"
deletefile=`git ls-files --deleted`
if [ "$deletefile" != "" ]; then 
    git rm $deletefile  
fi 
git push origin master
mv /root/media dj_pro/dj_pro/
mv /root/build .
mv /root/include . 
mv /root/local .
mv /root/lib .
