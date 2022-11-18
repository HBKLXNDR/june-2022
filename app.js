const express = require('express');

const {fileService} = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await fileService.reader();

    res.json(users);
});

app.post("/users", async (req, res) => {
    const {name, age} = req.body;

    if (!name||name.length < 2) {
        res.status(400).json("Wrong name or it does not exist")
    }
    if (!age || age < 2 || isNaN(age)) {
        res.status(400).json("Wrong age or it does not exist")
    }
    const users = await fileService.reader();
    const newUser = {id: users[users.length - 1].id + 1, name, age};

    users.push(newUser);
    await fileService.writer(users);
    res.status(201).json(newUser);
})

//user with id 77 is not found

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();
    const user = users.find((el) => el.id === +userId);

    if (!user) {
        return res.status(404).json(`user with id ${userId} is not found`)
    }
    res.status(201).json(user)

});


app.put('/users/:userId', async (req, res) => {
    const newUserInfo = req.body;
    const {userId} = req.params;
    const users = await fileService.reader();
    const index = users.findIndex((el) => el.id === +userId);

    if (index === -1) {
        return res.status(404).json(`user with id ${userId} is not found`)
    }

    users[index] = {...users[index], ...newUserInfo}
    await fileService.writer(users)
    res.status(201).json(users[index])
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();
    const index = users.findIndex((el) => el.id === +userId);

    if (index === -1) {
        return res.status(404).json(`user with id ${userId} is not found`)
    }

    users.splice(index, 1);
    await fileService.writer(users)
    res.sendStatus(204);
});


// app.get('/', (req, res) => {
//     res.json('WELOCME')
// })

app.listen(3000, () => {
    console.log('Server listen 3000');
});
