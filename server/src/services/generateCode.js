export const generateCode = async () => {
    let code = ''
    for (let i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 9)
    }
    return code
}