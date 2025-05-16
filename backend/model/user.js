const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone_no: {
            type: String,
            required: true,
            unique: true,
        },
        permanent_address: {
            type: String,
            required: true,
        },
        password: { type: String }, 
        isOAuth: { type: Boolean, default: false },
        resetPasswordToken: String, 
        resetPasswordExpires: Date,
        role: { 
            type: String, 
            enum: ['user', 'admin'], 
            default: 'user' 
        }, // Add the role field
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
