import supabase from '../../config/supabaseClient.js';
import prisma from '../../prisma/queries.js';
import fs from 'fs';
import path from 'path';

const uploadFileController = async(req, res) => {
    try {
        const { path } = req.file;
        const bucketname = 'files';
        const fileBuffer = fs.readFileSync(path);
        
        console.log('path, fileBuffer', path, fileBuffer);
        let result;
        try {
            result = await supabase.storage
                .from(bucketname)
                .upload(path, fileBuffer, {
                    contentType: req.file.mimetype,
                });
        } catch (uploadError) {
            console.error('Upload threw exception:', uploadError);
            return res.status(500).json({error: 'Upload Error uploading to Supabase.'});
        }

        const { data, error } = result;

        console.log('result', result);
        
        if (error) {
            return res.status(500).send({error: 'Error uploading to Supabase.'});
        }

        console.log('data', data);

        const { data: publicUrlData } = supabase.storage 
            .from('files')
            .getPublicUrl(path);

        const publicUrl = publicUrlData.publicUrl;

        console.log('publicUrl', publicUrl);

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
