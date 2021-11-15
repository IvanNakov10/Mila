const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

const nodemailer = require('nodemailer');

app.get('/', async function (req, res) {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  });
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));



app.post('/', (req, res)=>{
  console.log(req.body);

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'testemail123123432@gmail.com',
          pass: 'Ivan123ivan123'
      }
  });

  const mailOpp = {
      from: req.body.email,
      to: 'testemail123123432@gmail.com',
      subject: `message from ${req.body.name}, tel: ${req.body.tel}`,
      text: `Message: ${req.body.message}, Email: ${req.body.email}`
  
  };

  transporter.sendMail(mailOpp, (error, info)=>{
      if(error){
          console.log(error);
          res.send('error');
      }

      else{
          console.log('email send');

          res.send('success');
      }
  });
});

app.use('/articles', articleRouter);



app.listen(5000);
