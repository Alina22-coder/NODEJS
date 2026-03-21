const express = require('express') ;
const {userService} = require("./services/user.service");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/users', (req, res) => {
//     res.end('GET');
// });
//
// app.post('/users', (req, res) => {
//     console.log(req.body);
//     res.end('POST');
// });
//
// app.put('/users', (req, res) => {
//      res.end('PUT');
// });
//
// app.patch('/users', (req, res) => {
//      res.end('PATCH');
// });
//
// app.delete('/users', (req, res) => {
//      res.end('DELETE');
// });

app.get('/users', async (req, res) => {
    const data = await userService.getAll();
    res.json(data);
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data);
})


app.post('/users', async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data);
});

app.put('/users/:id', async (req, res) => {
    const user = req.body;
    const {id} = req.params;
    const data = await userService.updateById(user.id, user);
    res.json(data);
})


app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    const data = await userService.deleteById(id);
    res.end();
})


app.listen(8888, () => {
    console.log('Listening on port 8888');
});

