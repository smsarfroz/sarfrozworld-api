const api1 = process.env.API_KEY;

const getGifs = async(req, res) => {
    try {
        const q = req.query.searchText;
        const gifUrl2 = `https://api.giphy.com/v1/gifs/trending?api_key=${api1}&limit=27&offset=0&rating=g&bundle=messaging_non_clips`;
        const gifUrl1 = `https://api.giphy.com/v1/gifs/search?api_key=${api1}&q=${q}&limit=27&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        const response = await fetch((q == "" ? gifUrl2 : gifUrl1), {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Giphy API error: ${response.statusText}`
            });
        }

        const data1 = await response.json();

        res.json(data1.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default getGifs;