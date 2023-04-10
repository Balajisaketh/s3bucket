"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basic_ftp_1 = require("basic-ftp");
example();
function example() {
    let queue = [];
    const batch = 5;
    const newarray = [];
    const done = [];
    const client = new basic_ftp_1.Client();
    client.ftp.verbose = true;
    client.access({
        host: "ftp.dlptest.com",
        user: "dlpuser",
        password: "rNrKYTX9g7z3RgJRmxWuGHbeu",
        secure: false
    }).then(() => {
        client.list().then(res => {
            res.map((daata) => {
                queue.push(daata);
            });
            while (queue.length > 0) {
                console.log(queue, "i m bfore");
                newarray.push(queue.splice(0, batch));
                console.log(queue, "i m after");
                newarray[0].map((e, index) => {
                    const filename = e.name;
                    console.log(filename, "filename");
                    const client1 = new basic_ftp_1.Client();
                    client1.downloadTo('newone.txt', "/" + filename).then((response) => {
                        console.log(response, "i ma response");
                        try {
                            if (response.status == 226) {
                                const del = newarray[0].pop(index);
                                console.log(del, "i m deletion");
                                done.push(del);
                            }
                        }
                        catch (e) {
                            console.log(e, "error");
                        }
                    });
                });
            }
        }).catch((err) => {
            console.log(err, 'i m er');
        });
        // client.downloadTo("C:\Users\Saketh\s3bucket\UsersSakethDownloadsabc.txt", "README_FTP.md")
    });
}
