const obj2gltf = require('../../lib/obj2gltf/');
const fs = require('fs');
FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {
    fs.readFile(req.files.file.path, function (err, data) {
        // set the correct path for the file not the temporary one from the API:
        const file = {};
        file.path = './public/assets/model/' + req.files.file.originalFilename;

        // copy the data from the req.files.file.path and paste it to file.path
        const originalName = './public/assets/model/' + req.files.file.originalFilename.replace('.obj','.gltf')

        fs.stat(originalName, (err, success) => {
            if (err === null) {
                return res.status(500).json({ status: 500, error: 'archivo existente' });
            } else if (err.code === 'ENOENT') {
                fs.writeFile(file.path, data, (err) => {
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
                        .then(() => {
                            fs.unlink(file.path, (error) => {
                                if (error) {
                                    throw error;
                                }
                                console.log('Deleted file .obj');
                            });

                            return res.status(200).json({
                                pathFilesName: req.files.file.originalFilename.replace('.obj', '.gltf'),
                                pathClient: 'src/model/',
                                pathServer: './public/assets/model/',
                            });
                        })
                        .catch((err) => {
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
            }
        });
    });
};

module.exports = new FileUploadController();