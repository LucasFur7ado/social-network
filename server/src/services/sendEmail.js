import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    secure: false,
    service: "gmail",
    tls: { rejectUnauthorized: false },
    auth: { user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS }
})

export const sendEmail = async (email, code) => {
    let result = { error: null, result: null }
    console.log("Sending email...")
    try {
        result.result = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification",
            text: "Verify your account",
            html: `
            <div>   
            <h2>Your verification code is: &nbsp;</h2>
            <h1>${code}</h1>
            </div>`
        })
    } catch (err) {
        result.error = err 
        console.log(err)
    }
    return result 
}