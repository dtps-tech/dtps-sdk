import { DTPSClient } from "./src/dtpsclient"
require("dotenv").config()

const main = async () => {
  const url = process.env.API_URL ? process.env.API_URL : ""
  const apiKey = process.env.API_KEY ? process.env.API_KEY : ""
  const apiSecret = process.env.API_SECRET ? process.env.API_SECRET : ""
  const dtpsClient = new DTPSClient().init({
    url,
    apiKey,
    apiSecret,
  })

  let resp = await dtpsClient.card.getAvailableCards()
  console.log(resp)
}

main()
