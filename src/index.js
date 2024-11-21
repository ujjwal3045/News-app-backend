import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World');
}); 
app.post('/news', async (req, res) => {
    try {
        const { country, category, page, pageSize } = req.body;
        const url = `https://newsapi.org/v2/top-headlines${country?("?country="+country):""}${category?("&category="+category):""}&apiKey=${process.env.NEWS_API}${page?("&page="+page):""}${pageSize?("&pageSize="+pageSize):""}`;
        console.log("url = ",url);
        console.log("params" , req.body); 
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }
});
app.listen(3003, () => {
  console.log('Server is running on port 3003');
}); 
