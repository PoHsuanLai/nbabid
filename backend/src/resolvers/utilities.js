const checkUser = (db, name, errFunc) => {
    console.log(name)
    if(!name) throw new Error('Missing user name for' + errFunc)
    return db.userModel.findOne({ name })
}


export default checkUser