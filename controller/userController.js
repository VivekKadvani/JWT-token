const jwt = require('jsonwebtoken')
const secretKey = 'secretKey'
const refKey = 'refKey'

const generateNewAccessToken = (req, res) => {
    const refreshToken = req.cookies.refKey;
    if (!refreshToken) {
        return res.sendStatus(404)
    }

    jwt.verify(refreshToken, refKey, (err, decode) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accsessToken = jwt.sign({ decode }, secretKey, { expiresIn: '60s' })
        res.cookie("accKey", accsessToken)
        res.send("This is home page : by generating new token")
    })

}

const homePage = async (req, res) => {
    const token = req.cookies.accKey
    if (!token) {
        return res.sendStatus(404)
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            if (err.name == "TokenExpiredError") {
                console.log("Token Expired... Now Generating new accsess token by verifying refresh token.");
                return generateNewAccessToken(req, res)
            }
            else {
                return res.sendStatus(403);
            }
        }
        else {
            console.log(decode);
            return res.send("this is home page")
        }
    })


    // if (data) {
    //     const { user } = data
    //     const accsessToken = await jwt.sign({ user }, refKey, { expiresIn: "10s" });
    //     res.cookie("accKey", accsessToken)
    //     console.log(data);
    //     res.send("This is home page");
    // }
    // else {
    //     res.send("Token not found")
    // }
}

const login = async (req, res) => {
    const user = {
        id: req.body.id,
        username: req.body.name,
        email: req.body.email
    }
    const accsessToken = await jwt.sign({ user }, secretKey, { expiresIn: '30s' });
    const refreshToken = await jwt.sign({ user }, refKey, { expiresIn: '1000s' });
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