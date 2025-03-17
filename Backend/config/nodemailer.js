import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host:"smtp-relay.brevo.com",
    port: 587,
    secure: false,
    
    auth: {
        user: "881b33003@smtp-brevo.com",
        pass:"Rr7NSm6CByjGOq3v"
    }
})


export default transporter