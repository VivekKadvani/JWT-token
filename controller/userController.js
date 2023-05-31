const jwt = require('jsonwebtoken')
const secretKey = 'secretKey'

const homePage = async (req, res) => {
    const token = req.cookies.refKey
    const data = await jwt.verify(token, secretKey)
    if (data) {
        const { user } = data
        const accsessToken = await jwt.sign({ user }, secretKey, { expiresIn: "10s" });
        res.cookie("accKey", accsessToken)
        console.log(data);
        res.send("This is home page");
    }
    else {
        res.send("Token not found")
    }
}

const login = async (req, res) => {
    const user = {
        id: req.body.id,
        username: req.body.name,
        email: req.body.email
    }
    const accsessToken = await jwt.sign({ user }, secretKey, { expiresIn: '10s' });
    const refreshToken = await jwt.sign({ user }, secretKey, { expiresIn: '1000s' });
    res.cookie("accKey", accsessToken);
    res.cookie("refKey", refreshToken);
    res.json({ accsessToken: accsessToken, refreshToken: refreshToken })
    // jwt.sign({ user }, secretKey, { expiresIn: '100000' }, (err, token) => {
    //     res.cookie("key", token)
    //     res.json({
    //         token
    //     })
    // })
}

module.exports = {
    homePage,
    login
}