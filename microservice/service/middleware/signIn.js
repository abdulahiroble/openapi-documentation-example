import jwt from 'jsonwebtoken'

const generateToken = (id, body) => {
    const token = jwt.sign({id: id}, body.key, {
        expiresIn: 86400
    });

    return token;
}

export default generateToken