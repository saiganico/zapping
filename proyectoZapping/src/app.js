const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');
const express = require('express')

//Controladores
app.get('/player', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/views/client.html`);
});

app.get('/login', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/views/login.html`);
})

app.get('/', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/views/login.html`);
})

app.get('/register', (req, res) => {
    return res.status(200).sendFile(`${__dirname}/views/register.html`);
})

//server configuration
app.use(express.static(__dirname));
const server = app.listen(3000);

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});

//Simulador de Livestreaming

function resolveAfter10Seconds(i) {
    return new Promise(resolve => {
      setTimeout(() => {
        let archivoInicial = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:`+i+`
#EXTINF:10.000000,
segment`+i+`.ts
#EXTINF:10.000000,
segment`+(i+1)+`.ts
#EXTINF:10.000000,
segment`+(i+2)+`.ts`
        if(i==0){
            fs.readFile('/src/assets/segment.m3u8', 'utf-8', function (err, contents) {
                if (err) {
                  console.log(err);
                  return;
                }
                fs.writeFileSync('/src/assets/segment.m3u8', archivoInicial.toString() ,{encoding:'utf8',flag:'w'})
              })
            resolve('Secuencia ' + i  + ' Cargada');
        } else {
            if(i < 61){
                fs.readFile('/src/assets/segment.m3u8', 'utf-8', function (err, contents) {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    fs.writeFileSync('/src/assets/segment.m3u8', archivoInicial.toString(),{encoding:'utf8',flag:'w'})
                  })
                resolve('Secuencia ' + i  + ' Cargada');
            }
            else {
                fs.readFile('/src/assets/segment.m3u8', 'utf-8', function (err, contents) {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    archivoFinal = archivoInicial+`
#EXT-X-ENDLIST`
                    fs.writeFileSync('/src/assets/segment.m3u8', archivoFinal.toString(),{encoding:'utf8',flag:'w'})
                    resolve('Segmento final Cargado');
                  })
            }
        }
        
      }, 10000);
    });
  }
async function asyncCall() {
    console.log('Iniciando Streaming');
    inicializaStraaming();
    for (let index = 0; index < 62; index++) {
        const result = await resolveAfter10Seconds(index);
        console.log(result);
    }
  }
  
asyncCall();

function inicializaStraaming(){
    let archivoInicial = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.000000,
segment0.ts
#EXTINF:10.000000,
segment1.ts
#EXTINF:10.000000,
segment2.ts`
    fs.readFile('/src/assets/segment.m3u8', 'utf-8', function (err, contents) {
        if (err) {
          console.log(err);
          return;
        }
        fs.writeFileSync('/src/assets/segment.m3u8', archivoInicial.toString() ,{encoding:'utf8',flag:'w'})
      })
}