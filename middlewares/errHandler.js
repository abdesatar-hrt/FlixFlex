// not Found

const notFound = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};


// error Handler

const errorHandler = (req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statuscode
    res.statusCode = statuscode;
    res.json({ 
        message : err?.message,
        stack : err?.stack
    })
}

module.exports = {notFound, errorHandler}