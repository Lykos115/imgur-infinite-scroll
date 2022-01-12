import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';

type Info = {
  id: string
  coverId: string
  title: string
  coverlink: string
  coverWidth: number
  coverHeight: number
}

type Data = {
  albumIds: Info[];
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
  await axios
    .get(url, headers)
    .then(({ data }) => {
      const  response = data.data.map((item:any) =>{
        return {
          id:item.id,
          coverId: item.cover,
          title: item.title,
          coverLink: item.images[0].link,
          coverWidth: item.images[0].width,
          coverHeight: item.images[0].height
        }
      })
      res.status(200).json({response} as any);
    })
    .catch(({ err }) =>{
      res.status(400).json({ err } as any);
    })
}
