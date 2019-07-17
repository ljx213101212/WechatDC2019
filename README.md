# WechatDC2019


## Util
### API
Please use utils/tih_api to get activity data.


## UI Tips
### About icon
#### Source 
https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=2706
#### Reference
https://blog.bihe0832.com/svg.html  (choosed )
https://github.com/Tencent/omi/tree/master/packages/cax (investigating, I personally don't like embed inline-svg into html)

## Docker command
ssh ubuntu@[Your Server IP adress]
1. docker ps
2. docker kill
3. docker build -t xxx/xxx:0.0.3 .
4. docker run -d -p 8000:8000 -p 443:8000 --restart=always xxx/xxx:0.0.3


docker pull xxx/xxx:0.0.3
docker push xxx/xxx:0.0.3
