const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const path = require("path");

const { loginValidation } = require("./helpers/validations/login");
const { registerValidation, profileValidation } = require("./helpers/validations/register");
const { bookmarkValidation } = require("./helpers/validations/bookmark");
const { addNewsValidation } = require("./helpers/validations/news");
const { registerUser, findUserByEmail, findUserById, updateUserDetails } = require("./controllers/user");
const { saveBookMark, getAllBookMark, removeBookMarkById } = require("./controllers/bookmark");
const { saveNews, getAllNews } = require("./controllers/news");
const { comparePassword } = require("./helpers/encryptPassword");
const { verifyToken, createToken } = require("./helpers/token");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

app.post("/api/login", async (req, res) => {
    const { isInValid, messages } = loginValidation(req.body);
    if (isInValid) {
        res.status(400).json({ message: "Login Failed", errors: messages });
        return;
    }
    try {
        const user = await findUserByEmail(req?.body?.email);
        if (!user) {
            res.status(404).json({ message: "Login Failed", errors: "Invalid user" });
            return;
        }
        const comaprePassWord = await comparePassword(req?.body?.password, user.password);
        if (!comaprePassWord) {
            res.status(404).json({ message: "Login Failed", errors: "Invalid user" });
            return;
        }
        const tokenData = {
            _id: user._id
        }
        const token = createToken(tokenData);
        res.status(200).json({ message: "Login success", data: { _id: user._id, email: user.email, token } });
        return;
    } catch (e) {
        console.log(e, "error in login");
        res.status(500).json({ messages: "Login Failed", errors: "Something went wrong" });
        return;
    }
});

app.post("/api/register", async (req, res) => {
    const { isInValid, messages } = registerValidation(req.body);
    if (isInValid) {
        res.status(400).json({ message: "Registration Failed", errors: messages });
        return;
    }
    try {
        const isUserExist = await findUserByEmail(req?.body?.email);
        if (isUserExist) {
            res.status(409).json({ message: "Registration Failed", errors: "Email already registered" });
            return;
        }
        const savedUser = await registerUser(req.body);
        res.status(200).json({ data: { _id: savedUser._id }, messages: "Register success" });
        return;
    } catch (e) {
        console.log(e, "error in registration");
        res.status(500).json({ messages: "Registration Failed", errors: "Something went wrong" });
        return;
    }
});

app.get("/api/profile", verifyToken, async (req, res) => {
    const user = req.user;
    try {
        const userData = await findUserById(user);
        if (!user) {
            res.status(404).json({ message: "Fetch profile failed", errors: "No user details found" });
            return;
        }
        res.status(200).json({ data: userData, messages: "Fetch profile success" });
        return;
    } catch (e) {
        console.log(e, "error in get profile");
        res.status(500).json({ messages: "Fetch profile Failed", errors: "Something went wrong" });
        return;
    }
});


app.put("/api/profile", verifyToken, async (req, res) => {
    const user = req.user;
    const { isInValid, messages } = profileValidation(req.body);
    if (isInValid) {
        res.status(400).json({ message: "Profile update Failed", errors: messages });
        return;
    }
    try {
        const userData = await findUserById(user);
        if (!userData) {
            res.status(404).json({ message: "Profile update Failed", errors: "No user details found" });
            return;
        }
        const savedData = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
        }
        const updateData = {
            ...savedData,
            ...req.body
        }
        await updateUserDetails(user, updateData);
        res.status(200).json({ data: { _id: user, ...updateData }, messages: "Profile update success" });
        return;
    } catch (e) {
        console.log(e, "Error in get profile");
        res.status(500).json({ messages: "profile Failed", errors: "Something went wrong" });
        return;
    }

});

app.post("/api/bookmark", verifyToken, async (req, res) => {
    const user = req.user;
    req.body.user = user;
    const { isInValid, messages } = bookmarkValidation(req.body);
    if (isInValid) {
        res.status(400).json({ message: "Bookmark add Failed", errors: messages });
        return;
    }
    try {
        const savedBookMark = await saveBookMark(req.body);
        res.status(200).json({ message: "Bookmark add success", data: savedBookMark });
        return;
    } catch (e) {
        console.log(e, "Error in save bookmark")
        res.status(500).json({ message: "Bookmark add Failed", errors: "something went wrong" });
        return;
    }
});


app.post("/api/news", verifyToken, async (req, res) => {
    const user = req.user;
    req.body.user = user;
    const { isInValid, messages } = addNewsValidation(req.body);
    if (isInValid) {
        res.status(400).json({ message: "News add Failed", errors: messages });
        return;
    }
    try {
        const savedNews = await saveNews(req.body);
        res.status(200).json({ message: "News add success", data: savedNews });
        return;
    } catch (e) {
        console.log(e, "Error in save News")
        res.status(500).json({ message: "News add Failed", errors: "something went wrong" });
        return;
    }
});

app.delete("/api/bookmark/:id", verifyToken, async (req, res, next) => {
    try {
        const user = req.user;
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: "Bookmark delete failed", errors: "Please provide a bookmark id" });
            return;
        }
        const removeBookmark = await removeBookMarkById(id);
        if (removeBookmark) {
            res.status(201).json({ message: "Bookmark delete success", data: removeBookmark._id });
            return;
        } else {
            res.status(404).json({ message: "Bookmark delete failed", errors: "no bookmark found with the given id" });
            return;
        }
    } catch (e) {
        console.log(e, "Error in deleting bookmark")
        res.status(500).json({ message: "Bookmark delete Failed", errors: "something went wrong" });
        return;
    }
})

app.get("/api/bookmark", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        const bookmarks = await getAllBookMark(user);
        res.status(200).json({ message: "Bookmark retreive success", data: bookmarks });
        return;
    } catch (e) {
        console.log(e, "Error in get bookmark")
        res.status(500).json({ message: "Bookmark retreive Failed", errors: "something went wrong" });
        return;
    }
});

app.get("/api/news", verifyToken, async (req, res) => {
    try {
        const user = req.user;
        const news = await getAllNews(user);
        res.status(200).json({ message: "News retreive success", data: news });
        return;
    } catch (e) {
        console.log(e, "Error in get news")
        res.status(500).json({ message: "News retreive Failed", errors: "something went wrong" });
        return;
    }
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.use((req, res) => {
    res.status(404).json({
        message: "No match found"
    })
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    });
})

