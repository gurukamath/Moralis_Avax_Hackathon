import Moralis from "moralis";

export const getTokenList = async () : Promise<any[]> => {

    const TOKEN = Moralis.Object.extend("Token")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol");
    const results = await query.find();
    const tokenList = results.map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol")}
    });
    console.log("Got results: ", tokenList);
    return tokenList;
}


export const getTokenPrice = async (address : string, chain: string) => {
    const options : any = {
        address: address,
        chain: chain?chain:"avalanche",
    };

    const tokenPrice = await Moralis.Web3API.token.getTokenPrice(options);
    console.log(`Price for token with address ${address} is ${tokenPrice}`);
    return tokenPrice;
}
