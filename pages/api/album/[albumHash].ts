import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";




export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { albumHash } = req.query
  const url = process.env.IMGUR_BASE_URL + `/album/${albumHash}/images`
  const headers = {
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_KEY}`
    }
  }
  await axios
          .get(url, headers)
          .then(({ data }) => {
            const response = data.data.map((item:any) => item.link)
            res.status(200).json({ response })
          })
          .catch(({err}) => {
            res.status(400).json({ err })
          })
}
