const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to Sever');
    Dishes.create({
            name: 'Uthapizza1',
            description: 'test1'
        })
        .then((dish) => {
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated Test' }
            }, { new: true }).exec();
        })
        .then((dish) => {
            console.log(dish);
            dish.comments.push({
                rating: 5,
                comment: 'I Test',
                author: 'Rahul Dravid'
            });
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});