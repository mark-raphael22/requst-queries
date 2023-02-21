require('dotenv').config();
const Teams = require('./models/team')
const jsonTeam=require('./team.json')
const mongoose = require('mongoose')

const Startserver  = async (req, res) => {

    try {
        await mongoose.connect(process.env.MON_URI)
        await Teams.deleteMany()
        await Teams.create(jsonTeam)
        process.exit(0)
    } catch (error) {
        process.exit(1)
    }

}
Startserver();