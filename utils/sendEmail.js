import transporter from "../mail/smtpConfig"

const sendEmail =  (email) => {
    const mailOptions = {
        from: `Jaydeep Dey - ${process.env.SMTP_USER}`,
        to: email,
        subject: 'Your Invoice',
        html: `<h1>Your Invoice</h1>`,
    }
    transporter.sendMail(mailOptions, (err, res)=>{
        if(err){
            console.error(err)
        }
        else if(res)console.log(res)
    })
}


export default sendEmail    