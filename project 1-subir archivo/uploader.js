"use strict";

const http = require("http").createServer(serverUpload);
const util = require("util");
const formidable = require('formidable');
const fse = require("fs-extra");

function serverUpload(req, res) {
    console.log(req.url)

  if (req.method === "GET") {
    let form =  `<h1>Uploader de Archivos en Node.js</h1>
    <form action="/upload" enctype="multipart/form-data" method="post">
        <div><input type="file" name="upload" required></div>
        <div><input type="submit" value="Subir Archivo"></div>
    </form>`
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(form);
  }
  if (req.method === 'POST' && req.url == '/upload'){
    let form = formidable()

    form.parse(req, function(err, field, files){
        res.writeHead(200, {'Content-type': 'text/html'})
        res.write('<h1>Archivos Recibidos</h1>' + util.inspect( {files: files}))
        res.end()
    })
        .on('progress', function(bytesReceived, bytesExpected){
            let percentCompleted = (bytesReceived / bytesExpected) * 100
            console.log(percentCompleted.toFixed(2))
        })
        .on('error', function (err){
            console.log(err)
        })
        .on('file',(formName,file) =>{
            fse.copyFile(file.filepath,'upload/'+file.originalFilename,function(err){
                return err ? console.log(err) : console.log('Archivo subido con éxito.');
            })
        })

    return 
  }
}

http.listen(3000);

console.log("Servidor corriendo http://localhost:3000");
