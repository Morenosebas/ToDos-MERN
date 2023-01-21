const express = require('express');
const router = express.Router();
const Task = require('../model/task');


router.get('/', async (req, res) => {

    const tasks = await Task.find();
    res.json({
        status: 'GET',
        data: tasks
    })
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.json({ status: 'Tarea encontrada' })
});

router.post('/', async (req, res) => {

    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json({
        status: 'POST',
        data: task,
    })
});

router.put('/:id', async (req, res) => {

    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    // console.log(req.params.id)
    res.json({ status: 'UPDATE' })

});

router.delete('/:id', async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);
    res.json({ status: 'DELETE' })

})

module.exports = router;