#!/bin/bash
cp -r dj_pro/dj_pro/media .
rm -r  dj_pro/dj_pro/media
git add dj_pro
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
cp -r media dj_pro/dj_pro/
