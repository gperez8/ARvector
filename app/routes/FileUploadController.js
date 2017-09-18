const obj2gltf = require('../../lib/obj2gltf/');
const fs = require('fs');
FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {
/**
* The following takes the blob uploaded to an arbitrary location with
* a random file name and copies it to the specified file.path with the file.name.
* Note that the file.name should come from your upload request on the client side
* because when the file is selected it is paired with its name. The file.name is
* not random nor is the file.path.
*/

    console.log('req.files.file.path', req.files.file.path);

    fs.readFile(req.files.file.path, function (err, data) {
        // set the correct path for the file not the temporary one from the API:
        const file = {};
        file.path = './public/assets/model/' + req.files.file.originalFilename;

        // copy the data from the req.files.file.path and paste it to file.path
        fs.writeFile(file.path, data, function (err) {
            if (err) {
                return console.warn(err);
            }
            console.log("The file: " + file.name + " was saved to " + file.path);
            
            const modelGltfFilePath = './public/assets/model/' + req.files.file.originalFilename.replace('.obj', '.gltf');

            const options = {
                separateTextures: true,
                kmc: { doubleSided: true },
                optimize: true,
                outputUpAxis: ['X', 'Y', 'Z'],
            };

            obj2gltf(file.path, modelGltfFilePath, options)
                .then(function() {
                    
                    fs.unlink(file.path, function(error) {
                        if (error) {
                            throw error;
                        }
                        console.log('Deleted file .obj');
                    });

                    fs.readdir('./public/assets/model/', function (err, files) {
                        return res.json({ status: 200, pathFilesName: files, path: '/public/assets/model/' });
                    }); 
                    console.log('Converted model');
                })
                .catch(function(err) {
                    res.status(500);
                    res.send({
                        error: {
                            message: err.message,
                            stack: err.stack,
                        },
                    });
                    console.error(err);
                });
        });

                       
    });
}

module.exports = new FileUploadController();