import supabase from '../../config/supabaseClient.js';
import prisma from '../../prisma/queries.js';
import fs from 'fs';
import path from 'path';

const uploadFileController = async(req, res) => {
    try {
        const { path } = req.file;
        const bucketname = 'files';
        const fileBuffer = fs.readFileSync(path);
        
        const fileExt = req.file.filename.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let result;
        try {
            result = await supabase.storage
                .from(bucketname)
                .upload(filePath, fileBuffer, {
                    contentType: req.file.mimetype,
                    cacheControl: '3600', 
                    upsert: false
                });

             if (result.error) {
                console.error('Upload error details:', {
                    message: result.error.message,
                    name: result.error.name,
                    status: result.error.status
                });
            }
        } catch (uploadError) {
            console.error('Upload threw exception:', {
                message: uploadError.message,
                stack: uploadError.stack
            });
            return res.status(500).json({error: 'Upload Error uploading to Supabase.'});
        }

        const { data, error } = result;

        if (error) {
            return res.status(500).send({error: 'Error uploading to Supabase.'});
        }

        const { data: publicUrlData } = supabase.storage 
            .from('files')
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        res.json(publicUrl);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    } finally {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
    }
};

export default uploadFileController;
