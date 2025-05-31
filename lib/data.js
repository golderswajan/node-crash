const fs = require('fs');
const path = require('path');

const lib = {};

//base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

//write data to the file
lib.create = (dir, file, data, callback) => {
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err1, fileDescriptor) => {
        if(!err1 && fileDescriptor){
            const stringData = JSON.stringify(data);

            fs.write(fileDescriptor, stringData, (err2) => {
                if(!err2){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3){
                            callback(false);
                        }else{
                            callback('Error in closing the new file');
                        }
                    })
                }else{
                    callback('Error in writing data!!');
                }

            })
        }else{
            callback('Could not create the file, it may already exist or the directory does not exist');
        }
    })
}

//read data from the file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir+dir+'/'+file+'.json','utf8', (err, data) => {
        callback(err, data);
    })
}

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir+dir}/${file}.json`, 'r+', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor){
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err2) => {
                if(!err2){
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if(!err3){
                            fs.close(fileDescriptor, (err4) => {
                                if(!err4){
                                    callback(false);
                                }else{
                                    callback('Error in closing the file');
                                }
                            })
                        }else{
                            callback('Error in writing data')
                        }
                    })
                }else{
                    callback('Error in truncating the file');
                }
            })

        }else{
            callback('Error in opening the file: file may not exist at this location')
        }
    })
}

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir+dir}/${file}.json`, (err) => {
        if(!err){
            callback(false);
        }else{
            callback('Error in deleting the file: the file may not exist or other');
        }
    })
}

module.exports = lib;