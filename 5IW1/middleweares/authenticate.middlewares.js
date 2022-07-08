const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
    const Token = req.header('Authorization');
    if (!Token) {
        res.status(401).send({
            status: 401,
            message: 'invalid token, please log in or sign up',
            success: false
        })
    }
    try {
        const user = jwt.verify(parseAuthToken(Token), process.env.ACCESS_TOKEN);
        // TODO: check if user is active in database
    } catch (e) {
        res.status(401).send({
            status: 401,
            message: 'invalid token, please log in or sign const jwt = require(\'jsonwebtoken\')\n' +
                '\n' +
                'exports.authenticate = (req, res, next) => {\n' +
                '    const Token = req.header(\'Authorization\');\n' +
                '    if (!Token) {\n' +
                '        res.status(401).send({\n' +
                '            status: 401,\n' +
                '            message: \'invalid token, please log in or sign up\',\n' +
                '            success: false\n' +
                '        })\n' +
                '    }\n' +
                '    try {\n' +
                '        const user = jwt.verify(parseAuthToken(Token), process.env.ACCESS_TOKEN);\n' +
                '        // TODO: check if user is active in database\n' +
                '    } catch (e) {\n' +
                '        res.status(401).send({\n' +
                '            status: 401,\n' +
                '            message: \'invalid token, please log in or sign up\',\n' +
                '            success: false\n' +
                '        })\n' +
                '    }\n' +
                '}\n' +
                '\n' +
                'function parseAuthToken(authorization) {\n' +
                '    if (authorization.startsWith(\'Bearer \')) {\n' +
                '        return authorization.slice(7, authorization.length);\n' +
                '    }\n' +
                '    return null;\n' +
                '}up',
            success: false
        })
    }
}

function parseAuthToken(authorization) {
    if (authorization.startsWith('Bearer ')) {
        return authorization.slice(7, authorization.length);
    }
    return null;
}
