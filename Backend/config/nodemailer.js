import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth:{
        user: '881b33002@smtp-brevo.com',
        pass: 'UfqgpGB4AwnSQLxY' ,
    }
});

export default transporter;