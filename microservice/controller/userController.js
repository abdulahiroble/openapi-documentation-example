import generateToken from '../service/middleware/signIn.js'
import userCollection from '../repository/userRepository.js'
import { DATE } from 'sequelize';


const createUser = async function (req, res) {
    let body = req.body;
    console.log("hallo??")
    if (!("userRole" in req.body)) {
        body.userRole = 'customer';
    }
    if(!("isActive" in req.body)) {
        body.isActive = false;
    }
    const mailServiceUrl = process.env.ENVIRONMENT == "prod" ? "http://127.0.0.1:7071/api/HttpExample?requesttype=validate" : "http://127.0.0.1:7071/api/HttpExample?requesttype=validate";
    console.log(body)

    let userCreated = await userCollection.createUser(body)

    // Send validation email
    if(userCreated.success){
        const header = {
            "method" : "POST",
            "body" : JSON.stringify({
                websiteUrl : process.env.ENVIRONMENT == "prod" ? "asdasd" : "http://localhost:3000/activate/",
                firstname : userCreated.object.firstname,
                lastname : userCreated.object.lastname,
                mail : userCreated.object.email,
                uuid : userCreated.object.token
            })
        }

        try{
            await fetch(mailServiceUrl, header);
        }catch(e){
            // 406 - Not Acceptable
            userCreated = {
                success : false,
                msg: "OOPS, something went wrong trying to send verification email", e,
                status : 406
            }
        }

    }

    res.status(200).json(userCreated);

};

const verifyAccount = async function (req,res) {
    const token = req.params.token    
    console.log(token)
    res.status(200).json(await userCollection.verifyUser(token))

}

const getAllUsers = async function (req, res) {
    const body = req.body;
    console.log(body)
    res.status(200).json(await userCollection.getAllUsers());
};

const createRole = async function (req, res) {
    const body = req.body;
    console.log(body)
    res.status(200).json(await userCollection.createRole(body));
};

const updateUser = async function (req, res) {
    const id = req.params.id
    const body = req.body
    console.log(body)
    res.status(200).json(await userCollection.updateUser(body, id));
}

const getUserById = async function (req, res) {
    const id = req.params.id
    res.status(200).json(await userCollection.getUserById(id));
}

const deleteUser = async function (req, res) {
    const id = req.params.id
    console.log(id)
    res.status(200).json(await userCollection.deleteUser(id));
}

const login = async function (req, res) {
    const body = req.body;
    const validated = await userCollection.validateUser(body);
    // console.log(validated)

    validated.success && validated.validPassword ?
        res.status(202).json({
            userId: validated?.userId, 
            validPassword: validated?.validPassword, 
            generatedToken: generateToken(validated.id, body), 
            msg: validated?.msg, 
            userRole: validated?.userRole,
            isActive : validated?.isActive,
            envTOken: process.env.JWT_PRIVATE_KEY,
            recievedToken: validated.recievedToken
        })
        :
        res.status(401).json({
            validPassword: validated?.validPassword, 
            msg: "Login error" + validated?.msg
        })

}

const verifyedUser = async function (req, res) {
    const result = await userCollection.getUserById(req.body.userId);
    
    let isAdmin = result.object?.userRoles[0].role == 'admin' ? true : false;

    res.status(200).json({veryfied: true, isAdmin});
}

export default {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    login,
    createRole,
    verifyedUser,
    verifyAccount
}