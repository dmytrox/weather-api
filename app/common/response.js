module.exports = {
    SUCCESS: {
        code: 200,
        body: { 
            status: "success"
        }
    },
    BAD_REQUEST: {
        code: 400,
        body: {
            status: 'error',  
        }
    },
    SERVER_ERROR: {
        code: 500,
        body: { 
            status: 'error', 
            message: "Server error" 
        }
    }
}