const db = require("../models")
const { Names, Friends } = db;
const addFriendship = async (req, res, next) => {
    try {
        const { user_id, friend_id } = req.body;
        const nameExist= await Names.findOne({
            where:{
                id: user_id
            }
        });
        if (!nameExist) {
            return res.status(404).send("User not found");
        }
        const friendExist= await Names.findOne({
            where:{
                id: friend_id
            }
        });
        if (!friendExist) {
            return res.status(404).send("Friend not found");
        }

        const newFriendship = await Friends.create({
            user_id: user_id,
            friend_id: friend_id,
        });
        if (!newFriendship) {
            return res.status(403).send("Friendship not created");
        }
        return res.status(201).send(newFriendship);
    } catch (error) {
        return res.status(403).send(error);
    }
}

const getFriendship = async (req, res, next) => {
    try {
        const friendship = await Friends.findAll({
            include:[{
                model: Names,
                
                key: "name_id",
                as:"user",
                attributes:{
                    exclude:[
                        'id','createdAt','deletedAt','updatedAt'
                    ]
                },
            },{
                model: Names,
                key: "friend_id",
                as:"friend",
                attributes:{
                    exclude:[
                        'id','createdAt','deletedAt','updatedAt'
                    ]
                },
            }],
            attributes:{
                exclude:[
                    'id','createdAt','deletedAt','updatedAt'
                ]
            },
        })
        let Data = [];
        console.log('here');
        await friendship.map(async(data)=>{
            const rowData =await getAllFriends(data)
            
            Data.push(rowData);
        });
        const finalData =[];
        Data.forEach((element)=>{
            var checker = true;
            finalData.forEach((element1,index)=>{
                console.log(element1.name , element.name,"this");
                if(element1.name == element.name){
                    checker = index
                }
            });
            console.log(checker);
            if(checker === true){
                 finalData.push(element)
            }
            else{
                finalData[checker].friends.push(element.friends[0]);
            }
            
        })
        console.log(finalData);
        return res.status(200).send(finalData);
        // const FriendsData =await getMyFriends(friendship);
        // return res.status(200).send(FriendsData);
    } catch (error) {
        console.log(error);
        return res.status(403).send(error)
    }
}

const getMyFriendship = async (req, res, next) => {
    try {
        const friendship = await Friends.findAll({
            where:{
                user_id: req.params.id,
            },
            include:[{
                model: Names,
                key: "user_id",
                as:"user",
                attributes:{
                    exclude:[
                        'id','createdAt','deletedAt','updatedAt'
                    ]
                },
            },{
                model: Names,
                key: "friend_id",
                as:"friend",
                attributes:{
                    exclude:[
                        'id','createdAt','deletedAt','updatedAt'
                    ]
                },
            }],
            attributes:{
                exclude:[
                    'id','createdAt','deletedAt','updatedAt'
                ]
            },
        });
        const myFriends =await getMyFriends(friendship);
        return res.status(200).send(myFriends);
    } catch (error) {
        return res.status(403).send(error)
    }
}

const getMyFriends = async (friends) =>{
    
    let myFriends = {
        name: friends[0].user.name,
        friends: []
    };
    Promise.all([
        friends.map((frnd)=>{
            myFriends.friends.push(frnd.friend.name)
        })
    ])
    console.log(myFriends);
    return myFriends
}


const getAllFriends = async (friends) =>{
    let myFriends = {
        name: friends.user.name,
            friends: []
        };
        // Promise.all([
        //     friends.map((frnd)=>{
                myFriends.friends.push(friends.friend.name)
        //     })
        // ])
        return myFriends
}

// const getAllFriends = async (friends) =>{
//     // let Friends = []
//     // friends.map( (OneFriend)=>{
//     //     // console.log(OneFriend.friend.dataValues.name,"this");
//     //     let myFriends = {
//     //         name: OneFriend.user.dataValues.name,
//     //         friends: []
//     //     };
//     //     let friendname = OneFriend.friend.dataValues.name;
//     //     myFriends.friends.push(friendname)
        
//     //     Friends.push(myFriends)
//     // })
//     // console.log(Friends);
//     const x = await friends
//     const y = await x
//     console.log(x);
//     return Friends
// }

module.exports = { addFriendship, getFriendship, getMyFriendship }