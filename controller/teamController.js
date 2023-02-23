const Teams=require("../models/team")

const getAllTeams= async (req,res)=>{
    const {name,location,uclwinner, sort,select,numberFilters}=req.query
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
    //sorting deals with the fliping and arrangement of data 
    if(sort){
        const sortList=sort.split(",").join(" ");
        result=result.sort(sortList)
    }

    if(select){
        const selectList=select.split(",").join(" ");
        result=result.select(selectList);
    }
    if(numberFilters){
        const operatorMap={
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte' 
        };
        const regEx = /\b(<|>|>=|<=|=)\b/g;
        let filters = numberFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        // console.log(filters);
        const options = ['rating']
        filters = filters.split(',').forEach((items) => {
            const [search, operator, value] = items.split('-')
            if(options.includes(search)){
                queryObject[search] = {[operator]: Number(value)};
            }
        })
    }

    //limit
const limit=Number(req.query.limit);
result=result.limit(limit);

    result=result.find(queryObject)
    const teams= await result
    res.status(200).json({noOfTeams: teams.length,teams});
}


module.exports = getAllTeams