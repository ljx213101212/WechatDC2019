var fs = wx.getFileSystemManager()
module.exports = {
    writeTempFile:function(folderPath,filename, data){

      // if (fs.access(path))
      // fs.writeFileSync(`${wx.env.USER_DATA_PATH}/hello.txt`, 'hello, world', 'utf8')
      fs.access({
        path: folderPath,
        success:function(){
          console.log("tempFolder is ok");
          fs.writeFileSync(`${folderPath}/${filename}`, JSON.stringify(data), 'utf8');
        },
        fail: function (errmsg) {
          console.log(errmsg);

        }
      })
    
    },

    readTempFile:function (folderPath, filename){

      fs.access({
        path: folderPath,
        success:function(){
          console.log("tempFolder is ok");
          try{
          var filecontent = fs.readFileSync(`${folderPath}/${filename}`, 'utf8');
         
            var json = JSON.parse(filecontent);
            console.log("file content is", json);
          }catch(err){
            console.log(err);
          }
      
        },
        fail: function (errmsg) {
          console.log(errmsg);

        }
      })
    }

}