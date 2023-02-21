const Teams=require("../models/team")

const getAllTeams= async (req,res)=>{
    const {name,location,uclwinner, sort,select}=req.query
    let queryObject={}
    let result = Teams.find(queryObject)


    if(name){
        queryObject.name={$regex:name,$options:'i'};
        //regex allows you to search base on strings and help to select document were value match search 
        //i means case insensitive
    }
    if(location){
        queryObject.location={$regex:location,$options:'i'};
        //regex allows you to search base on strings and help to select document were value match search 
        //i means case insensitive
    }
    if(uclwinner){
        queryObject.uclwinner=uclwinner==="true"?true:false;
        //regex allows you to search base on strings and help to select document were value match search 
        //i means case insensitive
    }
    //sorting deals with the fliping and arrangement
    if(sort){
        const sortList=sort.split(",").join(" ");
        result=result.sort(sortList)
    }

    if(select){
        const selectList=select.split(",").join(" ");
        result=result.select(selectList);
    }

    //limit
const limit=Number(req.query.limit);
result=result.limit(limit);

    result=result.find(queryObject).limit(10)
    const teams= await result
    res.status(200).json({noOfTeams: teams.length,teams});
}


module.exports = getAllTeams