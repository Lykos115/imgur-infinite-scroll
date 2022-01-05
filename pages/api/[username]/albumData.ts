import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

type Data = {
  albumIds: any[];
  success: boolean;
  status: number;
}

export default async (req: NextApiRequest, res:NextApiResponse<Data>) => {
  const { username, page } = req.query;
  const pageNum = Number(page) - 1;
  const url = process.env.IMGUR_BASE_URL + `/account/${username}/submissions/${pageNum}`;
  const headers = {
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_KEY}`
    }
  };
  console.log(url)
  await axios
    .get(url, headers)
    .then(({ data }) => {
      console.log(data)
      const  response = data.data.map(item => item.id)
      res.status(200).json({response});
    })
    .catch(({ err }) =>{
      res.status(400).json({ err });
    })
}
