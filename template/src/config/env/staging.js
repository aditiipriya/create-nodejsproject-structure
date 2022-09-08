module.exports = {
	environment: 'staging',
	ip: '',
	port: 5002,
	protocol: 'http',
	TAG: 'staging',
	isStag: true,
	    mongo: {
            dbName: process.env.DB_NAME,
            dbUrl: process.env.DB_URL,
            options: {
                    user: process.env.DB_USER,
                    pass: process.env.DB_PASS,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    // useCreateIndex: true
            }
    },
    sendgridKey: process.env.SENDGRID_KEY,
    forgotEmailImage: process.env.EMAIL_FORGOT_IMAGE

}