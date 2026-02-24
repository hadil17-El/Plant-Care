import type { NextApiRequest, NextApiResponse} from "next"
import plantsData from "../data/plants.json"

export default function handler(req: NextApiRequest, res: NextApiResponse)
{
    res.status(200).json(plantsData)
}